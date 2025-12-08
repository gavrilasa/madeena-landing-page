import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { CreateCareerSchema } from "~/types/career";
import type { Prisma } from "~/lib/generated/prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    const whereClause: Prisma.CareerWhereInput = {};

    if (query) {
      whereClause.title = {
        contains: query,
        mode: "insensitive",
      };
    }

    const careers = await db.career.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("[CAREERS_GET] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data lowongan" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = CreateCareerSchema.parse(await request.json());

    const newCareer = await db.career.create({
      data: {
        title: body.title,
        type: body.type,
        department: body.department,
        location: body.location,
        description: body.description,
        requirements: body.requirements,
        status: body.status,
      },
    });

    return NextResponse.json(newCareer, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.errors },
        { status: 400 },
      );
    }

    console.error("[CAREERS_POST] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat lowongan" },
      { status: 500 },
    );
  }
}
