import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import AchievementDetail from "~/components/academic/AchievementDetail";

interface AchievementDetailPageProps {
  params: Promise<{ slug: string }>;
}

// 1. Optimasi Performa: Generate Static Params
// Memberitahu Next.js daftar slug yang ada saat build time agar jadi file statis (SSG)
export async function generateStaticParams() {
  const achievements = await db.achievement.findMany({
    where: { category: "PRESCHOOL" },
    select: { slug: true },
  });

  return achievements.map((achievement) => ({
    slug: achievement.slug,
  }));
}

// 2. SEO Dinamis: Generate Metadata
export async function generateMetadata({
  params,
}: AchievementDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const achievement = await db.achievement.findUnique({
    where: { slug },
    select: { title: true, description: true, image: true },
  });

  if (!achievement) {
    return {
      title: "Prestasi Tidak Ditemukan",
    };
  }

  // Potong deskripsi agar tidak terlalu panjang di Google/WA (max 160 char)
  const metaDescription =
    achievement.description.slice(0, 150).replace(/\n/g, " ") + "...";

  return {
    title: `${achievement.title} - Preschool Al Madeena`,
    description: metaDescription,
    openGraph: {
      title: achievement.title,
      description: metaDescription,
      images: [achievement.image], // Gambar thumbnail saat share link
      type: "article",
    },
  };
}

// 3. Komponen Halaman Utama
export default async function AchievementDetailPage({
  params,
}: AchievementDetailPageProps) {
  const { slug } = await params;

  // Fetch data lengkap
  const achievement = await db.achievement.findUnique({
    where: { slug },
  });

  // Jika data tidak ada -> 404
  if (!achievement) {
    notFound();
  }

  return (
    <main>
      {/* Render komponen detail dengan data dari database */}
      <AchievementDetail achievement={achievement} />
    </main>
  );
}
