import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const section = await db.gallerySection.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!section) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const deletePromises = section.images
      .filter((img) => img.publicId)
      .map((img) => cloudinary.uploader.destroy(img.publicId!));

    await Promise.allSettled(deletePromises);

    await db.gallerySection.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SECTION_DELETE]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
