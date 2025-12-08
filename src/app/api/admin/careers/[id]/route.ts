import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { UpdateCareerSchema } from "~/types/career";
import type { Prisma } from "~/lib/generated/prisma/client";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const json: unknown = await request.json();
    const body = UpdateCareerSchema.parse(json);

    const updateData: Prisma.CareerUpdateInput = {
      ...body,
      updatedAt: new Date(),
    };

    const updatedCareer = await db.career.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedCareer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasi gagal", details: error },
        { status: 400 },
      );
    }

    console.error("[CAREER_PATCH] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengupdate lowongan" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    // Perbaikan: Await params
    const { id } = await context.params;

    await db.career.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Lowongan berhasil dihapus" });
  } catch (error) {
    console.error("[CAREER_DELETE] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus lowongan" },
      { status: 500 },
    );
  }
}
