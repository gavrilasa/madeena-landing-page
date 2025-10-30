import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";

// Skema Zod untuk validasi data UPDATE (semua bidang opsional)
const UpdateNewsArticleSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong").optional(),
  slug: z.string().min(1, "Slug tidak boleh kosong").optional(),
  summary: z.string().min(1, "Ringkasan tidak boleh kosong").optional(),
  featuredImage: z.string().url("URL gambar sampul tidak valid").optional(),
  content: z.any().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

/**
 * GET Handler: Mengambil satu artikel berita (untuk form edit)
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await db.newsArticle.findUnique({
      where: { slug: params.slug },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH Handler: Mengupdate artikel berita (PATCH lebih baik untuk update parsial)
 */
export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = UpdateNewsArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const dataToUpdate = validation.data;

    // Validasi keunikan slug JIKA slug diubah
    if (dataToUpdate.slug && dataToUpdate.slug !== params.slug) {
      const existingSlug = await db.newsArticle.findUnique({
        where: { slug: dataToUpdate.slug },
      });

      if (existingSlug) {
        return NextResponse.json(
          { error: "Slug ini sudah digunakan. Harap pilih yang lain." },
          { status: 409 }, // 409 Conflict
        );
      }
    }

    // Logika untuk tanggal publikasi
    let publishedAtUpdate: Date | null | undefined = undefined;
    if (dataToUpdate.status) {
      // Hanya set tanggal publikasi jika status diubah menjadi PUBLISHED
      // dan sebelumnya BUKAN PUBLISHED
      if (dataToUpdate.status === "PUBLISHED") {
        const currentArticle = await db.newsArticle.findUnique({
          where: { slug: params.slug },
          select: { status: true },
        });
        if (currentArticle?.status !== "PUBLISHED") {
          publishedAtUpdate = new Date();
        }
      } else if (dataToUpdate.status === "DRAFT") {
        publishedAtUpdate = null; // Set null jika kembali ke DRAFT
      }
    }

    const updatedArticle = await db.newsArticle.update({
      where: { slug: params.slug },
      data: {
        ...dataToUpdate,
        // Hanya tambahkan 'publishedAt' ke data update jika nilainya didefinisikan
        ...(publishedAtUpdate !== undefined && {
          publishedAt: publishedAtUpdate,
        }),
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    // Tangani jika artikel yang akan di-update tidak ditemukan
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE Handler: Menghapus artikel berita
 */
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.newsArticle.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json(
      { message: "Artikel berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    // Tangani jika artikel yang akan dihapus tidak ditemukan
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }
    console.error("Failed to delete article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
