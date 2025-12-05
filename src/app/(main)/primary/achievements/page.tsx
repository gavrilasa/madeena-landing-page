import type { Metadata } from "next";
import { db } from "~/server/db";
import AchievementsContent from "~/components/academic/AchievementsContent";
import PageHeader from "~/components/common/PageHeader";
import PrimaryQuickLinks from "~/components/academic/PrimaryQuickLinks";

// --- Metadata Dinamis ---
export const metadata: Metadata = {
  title: "Prestasi Primary - Al Madeena Islamic School",
  description:
    "Jejak Juara Siswa Primary. Lihat deretan prestasi akademik dan non-akademik siswa SD Al Madeena.",
};

// --- Konfigurasi ---
export const revalidate = 3600; // Revalidate setiap 1 jam (ISR)

const ITEMS_PER_PAGE = 9;

// --- Data Teks Statis untuk Halaman Primary ---
const PAGE_TEXT = {
  intro: `Siswa-siswi <strong>Primary Al Madeena Islamic School</strong> tidak hanya berprestasi dalam bidang akademik, tetapi juga dalam berbagai ajang non-akademik. Semangat belajar, kepercayaan diri, dan karakter tangguh yang ditanamkan di sekolah menjadi fondasi utama dalam setiap pencapaian yang diraih.<br/><br/>
    Melalui bimbingan guru dan dukungan penuh dari orang tua, peserta didik berhasil menunjukkan kemampuan terbaiknya di berbagai kompetisi, baik di tingkat <strong>kota, provinsi, maupun nasional.</strong>`,
  closing:
    "Deretan prestasi ini menjadi bukti bahwa <strong>Primary Al Madeena Islamic School</strong> tidak hanya menumbuhkan anak yang <strong>cerdas secara akademik</strong>, tetapi juga <strong>berkarakter, percaya diri, dan berdaya saing tinggi</strong> di berbagai bidang.",
};

interface AchievementsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PrimaryAchievementsPage({
  searchParams,
}: AchievementsPageProps) {
  // 1. Ambil Parameter Halaman
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // 2. Fetch Data dari Database (Prisma)
  // Query 1: Ambil total jumlah data untuk kategori PRIMARY
  const totalCount = await db.achievement.count({
    where: { category: "PRIMARY" },
  });

  // Query 2: Ambil data prestasi untuk halaman ini
  const achievements = await db.achievement.findMany({
    where: { category: "PRIMARY" },
    orderBy: { date: "desc" }, // Urutkan dari yang terbaru
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <main>
      <PageHeader
        title="Prestasi Primary"
        subtitle="Membangun Generasi Juara yang Berkarakter Islami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      {/* Oper data dinamis ke Client Component */}
      <AchievementsContent
        category="primary"
        achievements={achievements}
        intro={PAGE_TEXT.intro}
        closing={PAGE_TEXT.closing}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <PrimaryQuickLinks />
    </main>
  );
}
