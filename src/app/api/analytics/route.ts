import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "~/server/db";
import crypto from "crypto";

interface AnalyticsPayload {
  path?: string;
  referrer?: string;
}

function cleanReferrer(referrer: string | null, currentHost: string): string {
  if (!referrer) return "Direct/Internal";

  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();

    if (hostname.includes(currentHost)) {
      return "Direct/Internal";
    }

    if (hostname.includes("facebook") || hostname.includes("fb.com")) {
      return "Facebook";
    }
    if (hostname.includes("instagram")) {
      return "Instagram";
    }
    if (hostname.includes("google")) {
      return "Google";
    }
    if (hostname.includes("twitter") || hostname.includes("x.com")) {
      return "Twitter/X";
    }
    if (hostname.includes("tiktok")) {
      return "TikTok";
    }
    if (hostname.includes("youtube")) {
      return "YouTube";
    }
    if (hostname.includes("whatsapp")) {
      return "WhatsApp";
    }

    return "Others";
  } catch {
    return "Others";
  }
}

function getDailyVisitorHash(ip: string, userAgent: string): string {
  const secret = process.env.ANALYTICS_SECRET ?? "default-secret-salt";
  const today = new Date().toISOString().split("T")[0];

  const dataToHash = `${ip}|${userAgent}|${today}|${secret}`;
  return crypto.createHash("sha256").update(dataToHash).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AnalyticsPayload;
    const { path, referrer } = body;

    const headerList = await headers();

    const forwardedFor = headerList.get("x-forwarded-for");
    const realIp = headerList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] ?? realIp ?? "unknown";

    const userAgent = headerList.get("user-agent") ?? "unknown";
    const host = headerList.get("host") ?? "";

    const visitorHash = getDailyVisitorHash(ip, userAgent);
    const referrerGroup = cleanReferrer(referrer ?? null, host);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const existingMetric = await db.dailyAnalytics.findUnique({
      where: {
        date_path_referrerGroup: {
          date: today,
          path: path ?? "/",
          referrerGroup: referrerGroup,
        },
      },
    });

    if (existingMetric) {
      const currentHashes = (existingMetric.visitorHashes as string[]) ?? [];
      const isUniqueVisitor = !currentHashes.includes(visitorHash);

      await db.dailyAnalytics.update({
        where: { id: existingMetric.id },
        data: {
          views: { increment: 1 },
          visitors: { increment: isUniqueVisitor ? 1 : 0 },
          visitorHashes: isUniqueVisitor
            ? [...currentHashes, visitorHash]
            : undefined,
        },
      });
    } else {
      await db.dailyAnalytics.create({
        data: {
          date: today,
          path: path ?? "/",
          referrerGroup: referrerGroup,
          views: 1,
          visitors: 1,
          visitorHashes: [visitorHash],
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ANALYTICS_ERROR]", error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
