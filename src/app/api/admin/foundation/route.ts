import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

// Schema Validasi untuk Foundation Member
const FoundationSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  gender: z.enum(["MALE", "FEMALE"], {
    error: "Gender harus MALE atau FEMALE",
  }),
  role: z.string().min(1, "Jabatan tidak boleh kosong"),
  quote: z.string().optional(),
  email: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),
  instagram: z.string().optional(),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const members = await db.foundationMember.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error("[FOUNDATION_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as unknown;
    const validation = FoundationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const {
      name,
      gender,
      role,
      quote,
      email,
      instagram,
      imageUrl,
      bio,
      isActive,
    } = validation.data;

    const lastItem = await db.foundationMember.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = (lastItem?.order ?? -1) + 1;

    const newMember = await db.foundationMember.create({
      data: {
        name,
        gender,
        role,
        quote,
        email: email === "" ? null : email,
        instagram,
        imageUrl,
        bio,
        isActive,
        order: newOrder,
      },
    });

    revalidatePath("/about/foundation-board");

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("[FOUNDATION_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
