import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { z } from "zod";
import { AchievementCategory } from "~/lib/generated/prisma/client";
import { slugify } from "~/lib/utils";
import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";
import { revalidatePath } from "next/cache";

// --- Konfigurasi Cloudinary (Sama seperti module Staff) ---
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper untuk mengekstrak public_id dari URL Cloudinary
const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    const publicIdWithExt = parts.slice(uploadIndex + 2).join("/");
    const publicId = publicIdWithExt?.split(".")[0];
    return publicId ?? null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

// --- Schema Validasi Update ---
// Semua field optional karena method PATCH
const updateAchievementSchema = z.object({
  title: z.string().min(1).optional(),
  category: z.nativeEnum(AchievementCategory).optional(),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val))
    .optional(),
  studentNames: z.array(z.string()).min(1).optional(),
  studentClass: z.string().min(1).optional(),
  predicate: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().url().optional(),
});

/**
 * PATCH Handler: Mengupdate data achievement
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Autentikasi
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Body
    const body = (await request.json()) as unknown;
    const validationResult = updateAchievementSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.flatten() },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // 3. Cek Eksistensi Data Lama
    const existingAchievement = await db.achievement.findUnique({
      where: { id },
    });

    if (!existingAchievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 },
      );
    }

    // 4. Logika Update Slug (Jika Title atau Date berubah)
    let newSlug = undefined;

    // Cek apakah title atau date berubah
    const isTitleChanged =
      data.title && data.title !== existingAchievement.title;
    // Cek tanggal berubah (bandingkan timestamp)
    const isDateChanged =
      data.date && data.date.getTime() !== existingAchievement.date.getTime();

    if (isTitleChanged || isDateChanged) {
      // Gunakan data baru jika ada, jika tidak gunakan data lama
      const titleToSlug = data.title ?? existingAchievement.title;
      const dateToSlug = data.date ?? existingAchievement.date;

      const dateStr = dateToSlug.toISOString().split("T")[0];
      const baseSlug = `${slugify(titleToSlug)}-${dateStr}`;

      newSlug = baseSlug;

      // Cek duplikasi slug (kecuali punya sendiri)
      const duplicateCheck = await db.achievement.findFirst({
        where: {
          slug: newSlug,
          NOT: { id }, // Abaikan record ini sendiri
        },
      });

      if (duplicateCheck) {
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        newSlug = `${baseSlug}-${randomSuffix}`;
      }
    }

    // 5. Update Database
    const updatedAchievement = await db.achievement.update({
      where: { id },
      data: {
        ...data,
        slug: newSlug, // Akan undefined jika tidak berubah (Prisma mengabaikan undefined)
        // studentNames akan otomatis ditimpa (set) oleh Prisma jika ada di variable 'data'
      },
    });

    // 6. Revalidasi Cache Halaman Publik
    revalidatePath("/preschool/achievements");
    revalidatePath("/primary/achievements");
    // Opsional: revalidate path detail juga jika perlu
    // revalidatePath(`/preschool/achievements/${updatedAchievement.slug}`);

    return NextResponse.json(updatedAchievement);
  } catch (error) {
    console.error("[ACHIEVEMENT_PATCH]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE Handler: Menghapus data achievement dan gambar
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Autentikasi
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil data dulu untuk cek image URL
    const achievement = await db.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 },
      );
    }

    // 3. Hapus Gambar dari Cloudinary (Jika ada)
    if (achievement.image) {
      const publicId = getPublicIdFromUrl(achievement.image);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error("Gagal menghapus gambar Cloudinary:", cloudinaryError);
          // Lanjut hapus data DB meski gambar gagal dihapus
        }
      }
    }

    // 4. Hapus Record dari Database
    await db.achievement.delete({
      where: { id },
    });

    // 5. Revalidasi Cache
    revalidatePath("/preschool/achievements");
    revalidatePath("/primary/achievements");

    return NextResponse.json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error("[ACHIEVEMENT_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
