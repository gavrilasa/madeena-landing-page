import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import type { CreateSectionBody, ReorderSectionsBody } from "~/types/gallery";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as CreateSectionBody;
    const { type } = body;

    const lastSection = await db.gallerySection.findFirst({
      orderBy: { order: "desc" },
    });
    const newOrder = lastSection ? lastSection.order + 1 : 0;

    const newSection = await db.gallerySection.create({
      data: {
        type: type ?? "left-large",
        order: newOrder,
      },
      include: { images: true },
    });

    return NextResponse.json(newSection);
  } catch (error) {
    console.error("[SECTION_POST]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as ReorderSectionsBody;
    const { items } = body;

    await db.$transaction(
      items.map((item) =>
        db.gallerySection.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SECTION_REORDER]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
