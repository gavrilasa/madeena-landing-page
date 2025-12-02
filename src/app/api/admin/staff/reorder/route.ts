import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

// Skema validasi untuk payload reorder
const ReorderStaffSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number().int().min(0),
    }),
  ),
});

/**
 * PUT Handler: Memperbarui urutan (order) staff secara massal
 * Digunakan setelah aksi drag-and-drop di Admin Panel
 */
export async function PUT(request: Request) {
  try {
    // 1. Cek sesi autentikasi
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parsing dan Validasi Body
    const body = (await request.json()) as unknown;
    const validation = ReorderStaffSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: validation.error.format() },
        { status: 400 },
      );
    }

    const { items } = validation.data;

    // 3. Eksekusi Update dalam Transaksi
    // Menggunakan $transaction memastikan semua update berhasil atau gagal bersamaan
    await db.$transaction(
      items.map((item) =>
        db.staff.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );

    return NextResponse.json({
      success: true,
      message: "Urutan berhasil diperbarui",
    });
  } catch (error) {
    console.error("[STAFF_REORDER]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
