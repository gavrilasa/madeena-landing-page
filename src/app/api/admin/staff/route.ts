import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

const StaffSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  nip: z.string().min(1, "NIP tidak boleh kosong"),
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Gender harus MALE atau FEMALE" }),
  }),
  role: z.string().min(1, "Jabatan tidak boleh kosong"),
  department: z.enum(["leadership", "teachers", "administration", "support"], {
    errorMap: () => ({ message: "Departemen tidak valid" }),
  }),
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

    const staff = await db.staff.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("[STAFF_GET]", error);
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
    const validation = StaffSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const {
      name,
      nip,
      gender,
      role,
      department,
      quote,
      email,
      instagram,
      imageUrl,
      bio,
      isActive,
    } = validation.data;

    const existingStaff = await db.staff.findUnique({
      where: { nip },
    });

    if (existingStaff) {
      return NextResponse.json(
        { error: "NIP sudah terdaftar. Harap gunakan NIP lain." },
        { status: 409 },
      );
    }

    const lastStaff = await db.staff.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = (lastStaff?.order ?? -1) + 1;

    const newStaff = await db.staff.create({
      data: {
        name,
        nip,
        gender,
        role,
        department,
        quote,
        email: email === "" ? null : email,
        instagram,
        imageUrl,
        bio,
        isActive,
        order: newOrder,
      },
    });

    revalidatePath("/about/staff-profile");

    return NextResponse.json(newStaff, { status: 201 });
  } catch (error) {
    console.error("[STAFF_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
