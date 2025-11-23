import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth"; //
import { db } from "~/server/db"; //
import type { Prisma } from "@prisma/client";

// Skema Zod untuk validasi data berita yang masuk
const NewsArticleSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  slug: z.string().min(1, "Slug tidak boleh kosong"),
  summary: z.string().min(1, "Ringkasan tidak boleh kosong"),
  featuredImage: z.string().url("URL gambar sampul tidak valid"),
  // Perbaikan: Gunakan z.unknown() atau z.json() daripada z.any()
  content: z.unknown(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

/**
 * GET Handler: Mengambil semua artikel berita (untuk dasbor admin)
 */
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const articles = await db.newsArticle.findMany({
      orderBy: {
        updatedAt: "desc", // Tampilkan yang terbaru di-update di atas
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch news articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * POST Handler: Membuat artikel berita baru
 */
export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Perbaikan: Ambil body sebagai 'unknown' untuk menghindari 'any'
    const body = (await request.json()) as unknown;
    const validation = NewsArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const { title, slug, summary, featuredImage, content, status } =
      validation.data;

    // Periksa keunikan slug sebelum membuat
    const existingSlug = await db.newsArticle.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Slug ini sudah digunakan. Harap pilih yang lain." },
        { status: 409 }, // 409 Conflict
      );
    }

    // Atur tanggal publikasi jika statusnya PUBLISHED
    const publishedAt = status === "PUBLISHED" ? new Date() : null;

    const newArticle = await db.newsArticle.create({
      data: {
        title,
        slug,
        summary,
        featuredImage,
        content: content as Prisma.InputJsonValue,
        status,
        publishedAt,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Failed to create news article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
