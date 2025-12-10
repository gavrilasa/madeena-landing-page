import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";
import { Prisma } from "~/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper untuk mengekstrak public_id dari URL Cloudinary
// Format umum: https://res.cloudinary.com/cloudname/image/upload/v12345678/folder/filename.jpg
const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    // const filenameWithExtension = parts[parts.length - 1];
    // Ambil juga nama folder jika ada (biasanya index ke-2 dan ke-1 dari belakang setelah split)
    // Untuk keamanan, kita coba ambil segmen setelah 'upload/' dan hapus extension
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    // Ambil path setelah 'upload/v<version>/'
    const publicIdWithExt = parts.slice(uploadIndex + 2).join("/");
    // Hapus extension (.jpg, .png, dll)
    const publicId = publicIdWithExt?.split(".")[0];
    return publicId ?? null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

// Skema Validasi untuk Update (Semua field optional)
const UpdateStaffSchema = z.object({
  name: z.string().min(1).optional(),
  nip: z.string().min(1).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  role: z.string().min(1).optional(),
  department: z
    .enum(["leadership", "teachers", "administration", "support"])
    .optional(),
  quote: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  instagram: z.string().optional(),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

/**
 * PATCH Handler: Mengupdate data staff
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as unknown;
    const validation = UpdateStaffSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const dataToUpdate = validation.data;

    // --- Logika Validasi NIP Unik ---
    // Jika NIP sedang diubah, kita harus memastikan NIP baru belum dipakai orang lain.
    if (dataToUpdate.nip) {
      const existingStaffWithNip = await db.staff.findUnique({
        where: { nip: dataToUpdate.nip },
      });

      // Jika ditemukan staff dengan NIP tersebut, DAN ID-nya bukan ID staff yang sedang diedit
      if (existingStaffWithNip && existingStaffWithNip.id !== id) {
        return NextResponse.json(
          { error: "NIP sudah digunakan oleh staff lain." },
          { status: 409 }, // 409 Conflict
        );
      }
    }

    // --- Update Database ---
    const updatedStaff = await db.staff.update({
      where: { id },
      data: {
        ...dataToUpdate,
        // Pastikan email string kosong diubah menjadi null
        email: dataToUpdate.email === "" ? null : dataToUpdate.email,
      },
    });

    revalidatePath("/about/staff-profile");

    return NextResponse.json(updatedStaff);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Staff tidak ditemukan" },
        { status: 404 },
      );
    }
    console.error("[STAFF_PATCH]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE Handler: Menghapus data staff dan gambar terkait
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Ambil data staff dulu untuk cek imageUrl
    const staff = await db.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      return NextResponse.json(
        { error: "Staff tidak ditemukan" },
        { status: 404 },
      );
    }

    // 2. Hapus gambar dari Cloudinary jika ada
    if (staff.imageUrl) {
      const publicId = getPublicIdFromUrl(staff.imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error(
            "Gagal menghapus gambar dari Cloudinary:",
            cloudinaryError,
          );
          // Kita lanjutkan penghapusan data DB meskipun gambar gagal dihapus (soft fail)
        }
      }
    }

    // 3. Hapus data dari Database
    await db.staff.delete({
      where: { id },
    });

    revalidatePath("/about/staff-profile");

    return NextResponse.json({
      success: true,
      message: "Staff berhasil dihapus",
    });
  } catch (error) {
    console.error("[STAFF_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
