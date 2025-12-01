import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  try {
    const sections = await db.gallerySection.findMany({
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error("[GALLERY_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
