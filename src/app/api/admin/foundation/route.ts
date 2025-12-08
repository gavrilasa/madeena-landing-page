import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const foundationSchema = z.object({
  name: z.string().min(1),
  gender: z.enum(["MALE", "FEMALE"]),
  role: z.string().min(1),
  quote: z.string().optional(),
  email: z.string().optional().or(z.literal("")),
  instagram: z.string().optional(),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const members = await db.foundationMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = foundationSchema.parse(body);
    
    // Get last order
    const lastItem = await db.foundationMember.findFirst({
      orderBy: { order: "desc" },
    });
    const newOrder = (lastItem?.order ?? -1) + 1;

    const member = await db.foundationMember.create({
      data: { ...validated, order: newOrder },
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}