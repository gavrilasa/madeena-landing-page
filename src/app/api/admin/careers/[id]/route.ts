import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { UpdateCareerSchema } from "~/types/career";
import type { Prisma } from "~/lib/generated/prisma/client";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const body = UpdateCareerSchema.parse(await request.json());

    const updateData: Prisma.CareerUpdateInput = {
      ...body,
      // Pastikan updatedAt diperbarui (opsional, Prisma handle otomatis biasanya)
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
        { error: "Validasi gagal", details: error.errors },
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
    const { id } = context.params;

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
