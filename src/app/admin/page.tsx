// src/app/admin/page.tsx

import { db } from "~/server/db";
import { AnalyticsDashboard } from "~/components/admin/dashboard/AnalyticsDashboard";

export const metadata = {
  title: "Dashboard Overview - Admin Panel",
};

export default async function AdminDashboardPage() {
  // 1. Ambil data Tren Harian (Views & Visitors per tanggal)
  const dailyStats = await db.dailyAnalytics.groupBy({
    by: ["date"],
    _sum: {
      views: true,
      visitors: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  // 2. Ambil data Per Halaman (Views per tanggal & path)
  // Kita butuh tanggalnya untuk filter "Bulan Tertentu"
  const pageStats = await db.dailyAnalytics.groupBy({
    by: ["date", "path"],
    _sum: {
      views: true,
    },
  });

  // 3. Ambil data Referrer (Views per tanggal & referrer)
  const referrerStats = await db.dailyAnalytics.groupBy({
    by: ["date", "referrerGroup"],
    _sum: {
      views: true,
    },
  });

  // 4. Format Data untuk Client (Serialisasi Date ke String)
  const formattedDaily = dailyStats.map((item) => ({
    date: item.date.toISOString(),
    views: item._sum.views ?? 0,
    visitors: item._sum.visitors ?? 0,
  }));

  const formattedPages = pageStats.map((item) => ({
    date: item.date.toISOString(),
    path: item.path,
    views: item._sum.views ?? 0,
  }));

  const formattedReferrers = referrerStats.map((item) => ({
    date: item.date.toISOString(),
    referrer: item.referrerGroup,
    views: item._sum.views ?? 0,
  }));

  return (
    <AnalyticsDashboard
      rawDaily={formattedDaily}
      rawPages={formattedPages}
      rawReferrers={formattedReferrers}
    />
  );
}
