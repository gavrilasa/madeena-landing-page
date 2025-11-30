/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth"; // Sesuaikan path auth Anda
import { db } from "~/server/db"; // Sesuaikan path db prisma Anda
import type { Prisma } from "@prisma/client";

/**
 * GET Handler: Mengambil konfigurasi galeri saat ini.
 * Mengembalikan array kosong [] jika belum ada data di database.
 */
export async function GET() {
  try {
    // 1. Cek Autentikasi Admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil satu-satunya record GallerySettings
    const settings = await db.gallerySettings.findFirst();

    // 3. Jika belum ada data, kembalikan struktur default
    if (!settings) {
      // Kembalikan object dengan content array kosong agar frontend tidak error
      return NextResponse.json({
        content: [],
        updatedAt: new Date().toISOString(),
      });
    }

    // 4. Kembalikan data yang ditemukan
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch gallery settings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * POST Handler: Menyimpan (Batch Save) seluruh struktur galeri.
 * Menggunakan logika Upsert (Update jika ada, Create jika belum).
 */
export async function POST(request: Request) {
  try {
    // 1. Cek Autentikasi Admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Terima payload JSON lengkap dari frontend
    // Body ini berisi array blocks (layout & images)
    const body = (await request.json()) as unknown;

    // (Opsional) Validasi sederhana: pastikan body tidak null/undefined
    if (!body) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // 3. Cek apakah sudah ada record di database
    // Kita menggunakan findFirst karena hanya ingin mempertahankan satu baris konfigurasi
    const existingSettings = await db.gallerySettings.findFirst();

    let result;

    if (existingSettings) {
      // 4a. Jika ada, lakukan UPDATE pada record tersebut
      result = await db.gallerySettings.update({
        where: { id: existingSettings.id },
        data: {
          content: body as Prisma.InputJsonValue, // Casting ke tipe Prisma JSON
        },
      });
    } else {
      // 4b. Jika belum ada, lakukan CREATE baru
      result = await db.gallerySettings.create({
        data: {
          content: body as Prisma.InputJsonValue,
        },
      });
    }

    // 5. Kembalikan hasil yang disimpan
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to save gallery settings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
