import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "~/lib/auth";
import { env } from "~/env.js";

// Konfigurasi Cloudinary (sama seperti di route upload)
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Helper untuk mengekstrak public_id dari URL Cloudinary
 * Contoh URL: https://res.cloudinary.com/.../upload/v12345/madeena/foto.jpg
 * Output: madeena/foto
 */
function getPublicIdFromUrl(url: string): string | null {
  try {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
    const match = regex.exec(url);
    return match ? (match[1] ?? null) : null;
  } catch (error) {
    console.error("Error parsing public_id from URL:", error);
    return null;
  }
}

export async function DELETE(request: Request) {
  try {
    // 1. Cek Autentikasi Admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Anda harus login." },
        { status: 401 },
      );
    }

    // 2. Parse Body Request
    // Frontend bisa mengirimkan { public_id: "..." } ATAU { url: "..." }
    const body = (await request.json()) as {
      public_id?: string;
      url?: string;
    };

    let publicIdToDelete = body.public_id;

    // Jika public_id tidak ada, coba ekstrak dari URL
    if (!publicIdToDelete && body.url) {
      const extractedId = getPublicIdFromUrl(body.url);
      if (extractedId) {
        publicIdToDelete = extractedId;
      }
    }

    if (!publicIdToDelete) {
      return NextResponse.json(
        {
          error: "Public ID atau URL valid diperlukan untuk menghapus gambar.",
        },
        { status: 400 },
      );
    }

    // 3. Panggil Cloudinary Destroy API
    const result = (await cloudinary.uploader.destroy(publicIdToDelete)) as {
      result: string;
    };

    if (result.result !== "ok") {
      console.error("Cloudinary delete failed:", result);
      return NextResponse.json(
        { error: "Gagal menghapus gambar di Cloudinary.", details: result },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Gambar berhasil dihapus.", public_id: publicIdToDelete },
      { status: 200 },
    );
  } catch (error) {
    console.error("Internal server error (DELETE image):", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
