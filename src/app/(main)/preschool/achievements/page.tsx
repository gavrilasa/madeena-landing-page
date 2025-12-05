import type { Metadata } from "next";
import { db } from "~/server/db";
import AchievementsContent from "~/components/academic/AchievementsContent";
import PageHeader from "~/components/common/PageHeader";
import PreschoolQuickLinks from "~/components/academic/PreschoolQuickLinks";

// --- Metadata Dinamis ---
export const metadata: Metadata = {
  title: "Prestasi Preschool - Al Madeena Islamic School",
  description:
    "Kebanggaan Kecil Langkah Besar. Lihat daftar prestasi membanggakan dari siswa-siswi Preschool Al Madeena.",
};

// --- Konfigurasi ---
// Revalidate setiap 1 jam agar data tidak terlalu stale,
// tapi tetap cepat (ISR - Incremental Static Regeneration)
export const revalidate = 3600;

const ITEMS_PER_PAGE = 9;

// --- Data Teks Statis untuk Halaman Preschool ---
// (Dipindahkan dari file data statis ke sini agar terpusat di Page)
const PAGE_TEXT = {
  intro: `Meskipun masih di usia dini, anak-anak <strong>Preschool Al Madeena Islamic School</strong> telah menunjukkan semangat belajar dan kompetisi yang luar biasa. Melalui bimbingan guru dan dukungan orang tua, mereka berani tampil, berusaha, dan memberikan yang terbaik dalam berbagai ajang perlombaan baik di tingkat sekolah maupun luar sekolah.<br/><br/>
    Prestasi yang diraih bukan hanya menjadi kebanggaan sekolah, tetapi juga bukti nyata bahwa pendidikan di Al Madeena mampu menumbuhkan anak-anak yang <strong>percaya diri, berakhlak mulia, dan bersemangat meraih cita-cita.</strong>`,
  closing:
    "Prestasi ini menjadi motivasi bagi seluruh keluarga besar <strong>Preschool Al Madeena Islamic School</strong> untuk terus menumbuhkan generasi Qur’ani yang <strong>cerdas, kreatif, dan berkarakter mulia.</strong>",
};

interface AchievementsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PreschoolAchievementsPage({
  searchParams,
}: AchievementsPageProps) {
  // 1. Ambil Parameter Halaman (Pagination)
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // 2. Fetch Data dari Database (Prisma)
  // Query 1: Ambil total jumlah data untuk hitung total halaman
  const totalCount = await db.achievement.count({
    where: { category: "PRESCHOOL" },
  });

  // Query 2: Ambil data prestasi untuk halaman ini
  const achievements = await db.achievement.findMany({
    where: { category: "PRESCHOOL" },
    orderBy: { date: "desc" }, // Urutkan dari yang terbaru
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <main>
      <PageHeader
        title="Prestasi Preschool"
        subtitle="Kebanggaan Kecil Langkah Besar Siswa Preschool"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      {/* Oper data dinamis ke Client Component */}
      <AchievementsContent
        category="preschool"
        achievements={achievements}
        intro={PAGE_TEXT.intro}
        closing={PAGE_TEXT.closing}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <PreschoolQuickLinks />
    </main>
  );
}
