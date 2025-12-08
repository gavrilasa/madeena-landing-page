import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function PUT(req: Request) {
  try {
    const { items } = await req.json();
    
    // Transaction for atomic updates
    await db.$transaction(
      items.map((item: { id: string; order: number }) =>
        db.foundationMember.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Reorder failed" }, { status: 500 });
  }
}