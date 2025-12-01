import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import type { CreateImageBody, ReorderImagesBody } from "~/types/gallery";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as CreateImageBody;
    const { sectionId, url, publicId, alt, order } = body;

    if (!sectionId || !url) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    let newOrder = 0;

    if (typeof order === "number") {
      newOrder = order;
    } else {
      const lastImage = await db.galleryImage.findFirst({
        where: { sectionId },
        orderBy: { order: "desc" },
      });
      newOrder = lastImage ? lastImage.order + 1 : 0;
    }

    const newImage = await db.galleryImage.create({
      data: {
        sectionId,
        url,
        publicId,
        alt: alt ?? "",
        order: newOrder,
      },
    });

    return NextResponse.json(newImage);
  } catch (error) {
    console.error("[IMAGE_POST]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as ReorderImagesBody;
    const { items } = body;

    await db.$transaction(
      items.map((item) => {
        const data: { order: number; sectionId?: string } = {
          order: item.order,
        };

        if (item.sectionId) data.sectionId = item.sectionId;

        return db.galleryImage.update({
          where: { id: item.id },
          data,
        });
      }),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[IMAGE_REORDER]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
