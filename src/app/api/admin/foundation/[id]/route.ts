import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";
import { Prisma } from "~/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    const publicIdWithExt = parts.slice(uploadIndex + 2).join("/");
    const publicId = publicIdWithExt?.split(".")[0];
    return publicId ?? null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

const UpdateFoundationSchema = z.object({
  name: z.string().min(1).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  role: z.string().min(1).optional(),
  quote: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  instagram: z.string().optional(),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as unknown;

    const validation = UpdateFoundationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const dataToUpdate = validation.data;

    const updatedFoundation = await db.foundationMember.update({
      where: { id },
      data: {
        ...dataToUpdate,
        email: dataToUpdate.email === "" ? null : dataToUpdate.email,
      },
    });

    revalidatePath("/about/foundation-board");

    return NextResponse.json(updatedFoundation);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Member foundation tidak ditemukan" },
        { status: 404 },
      );
    }
    console.error("[FOUNDATION_PATCH]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const member = await db.foundationMember.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Member foundation tidak ditemukan" },
        { status: 404 },
      );
    }

    if (member.imageUrl) {
      const publicId = getPublicIdFromUrl(member.imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error(
            "Gagal menghapus gambar dari Cloudinary:",
            cloudinaryError,
          );
        }
      }
    }

    await db.foundationMember.delete({
      where: { id },
    });

    revalidatePath("/about/foundation-board");

    return NextResponse.json({
      success: true,
      message: "Member foundation berhasil dihapus",
    });
  } catch (error) {
    console.error("[FOUNDATION_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
