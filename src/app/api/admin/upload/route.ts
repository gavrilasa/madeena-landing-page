import { NextResponse } from "next/server";
import {
  v2 as cloudinary,
  type UploadApiResponse,
  type UploadApiErrorResponse,
} from "cloudinary";
import { auth } from "~/lib/auth";
import { env } from "~/env.js";
import { headers } from "next/headers";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME as string,
  api_key: env.CLOUDINARY_API_KEY as string,
  api_secret: env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

async function uploadToCloudinary(
  buffer: Buffer,
): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "madeena",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) {
          // === PERBAIKAN DI SINI ===
          // Kita membungkus objek 'error' dari Cloudinary ke dalam 'new Error()'.
          // Menggunakan 'error.message' jika tersedia, atau pesan default.
          return reject(new Error(error?.message || "Cloudinary upload error"));
          // ==========================
        }
        if (result?.secure_url) {
          return resolve({ secure_url: result.secure_url });
        }
        return reject(
          new Error("Cloudinary upload failed: No result or error returned."),
        );
      },
    );

    // Tulis buffer ke stream
    uploadStream.end(buffer);
  });
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Anda harus login." },
        { status: 401 },
      );
    }

    // 2. Terima file gambar dari request
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan." },
        { status: 400 },
      );
    }

    // 3. Ubah file menjadi buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Unggah buffer ke Cloudinary
    try {
      const { secure_url } = await uploadToCloudinary(buffer);

      // 5. Kembalikan URL gambar yang berhasil diunggah
      return NextResponse.json({ url: secure_url });
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      const errorMessage =
        uploadError instanceof Error
          ? uploadError.message
          : "Gagal mengunggah file.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
