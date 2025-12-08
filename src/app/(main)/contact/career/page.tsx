import PageHeader from "~/components/common/PageHeader";
import { CareerList } from "~/components/contact/CareerList";
import { db } from "~/server/db";
import type { Career } from "~/types/career"; // Pastikan import type ini ada

export const metadata = {
  title: "Karir & Lowongan Kerja - Al Madeena Islamic School",
  description:
    "Bergabunglah dengan tim pendidik dan staf profesional di Al Madeena Islamic School. Cek lowongan kerja terbaru di sini.",
};

export default async function CareerPage() {
  // Ambil data mentah dari database
  const careersData = await db.career.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Lakukan casting tipe secara eksplisit
  // Prisma mengembalikan 'string', kita paksa agar dianggap sebagai 'Career[]'
  const careers = careersData as unknown as Career[];

  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Karir di Al Madeena"
        subtitle="Mari berkontribusi dalam mencetak generasi Qur'ani masa depan bersama kami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      {/* Sekarang tipe datanya sudah cocok */}
      <CareerList careers={careers} />
    </main>
  );
}
