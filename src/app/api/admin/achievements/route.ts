import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import {
  AchievementCategory,
  type Prisma,
} from "~/lib/generated/prisma/client";
import { slugify } from "~/lib/utils"; // Import utility slugify yang sudah ada
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category"); // 'preschool', 'primary', atau null/'all'
    const queryParam = searchParams.get("q") ?? searchParams.get("query"); // Search query

    // 3. Construct Where Clause (Filter)
    const where: Prisma.AchievementWhereInput = {};

    // Filter Kategori (jika ada dan bukan 'all')
    if (categoryParam && categoryParam.toLowerCase() !== "all") {
      // Normalisasi input ke Enum Prisma (PRESCHOOL / PRIMARY)
      const normalizedCategory = categoryParam.toUpperCase();

      // Validasi apakah input sesuai dengan Enum yang ada
      if (
        Object.values(AchievementCategory).includes(
          normalizedCategory as AchievementCategory,
        )
      ) {
        where.category = normalizedCategory as AchievementCategory;
      }
    }

    // Filter Pencarian (Search)
    if (queryParam) {
      where.OR = [
        {
          title: {
            contains: queryParam,
            mode: "insensitive", // Case-insensitive (Huruf besar/kecil dianggap sama)
          },
        },
        // Catatan: Pencarian partial text di dalam array string PostgreSQL via Prisma
        // saat ini memiliki keterbatasan. Sesuai rencana, kita fokus di Title dulu.
        // Jika ingin exact match nama siswa, bisa gunakan:
        // { studentNames: { has: queryParam } }
      ];
    }

    // 4. Query Database
    const achievements = await db.achievement.findMany({
      where,
      orderBy: [
        { date: "desc" }, // Prioritas 1: Tanggal prestasi (Terbaru di atas)
        { createdAt: "desc" }, // Prioritas 2: Tanggal input (Fallback)
      ],
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error("[ACHIEVEMENTS_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

const achievementSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  category: z.nativeEnum(AchievementCategory),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)), // Terima string/date, ubah ke Date object
  studentNames: z.array(z.string()).min(1, "Minimal satu nama siswa"),
  studentClass: z.string().min(1, "Kelas wajib diisi"),
  predicate: z.string().min(1, "Predikat wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  image: z.string().url("URL gambar tidak valid"),
});

export async function POST(request: Request) {
  try {
    // 1. Autentikasi Admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse & Validasi Body Request
    const body = (await request.json()) as unknown;
    const validationResult = achievementSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.flatten() },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // 3. Slug Generator (Custom Logic: Title + Date)
    // Format tanggal menjadi YYYY-MM-DD
    const dateStr = data.date.toISOString().split("T")[0]; // Ambil bagian tanggal saja
    const baseSlug = `${slugify(data.title)}-${dateStr}`;

    let uniqueSlug = baseSlug;

    // 4. Pengecekan Duplikasi Slug
    const existingAchievement = await db.achievement.findUnique({
      where: { slug: uniqueSlug },
    });

    if (existingAchievement) {
      // Jika kebetulan ada judul sama persis di tanggal yang sama, tambahkan suffix acak
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      uniqueSlug = `${baseSlug}-${randomSuffix}`;
    }

    // 5. Simpan ke Database
    const newAchievement = await db.achievement.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        category: data.category,
        date: data.date,
        studentNames: data.studentNames, // Disimpan sebagai Array String (Native di Postgres)
        studentClass: data.studentClass,
        predicate: data.predicate,
        description: data.description, // Karakter \n akan otomatis tersimpan
        image: data.image,
      },
    });

    return NextResponse.json(newAchievement, { status: 201 });
  } catch (error) {
    console.error("[ACHIEVEMENTS_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
