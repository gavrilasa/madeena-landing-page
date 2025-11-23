import PageHeader from "~/components/common/PageHeader";
import { CareerList } from "~/components/contact/CareerList";

export const metadata = {
  title: "Karir & Lowongan Kerja - Al Madeena Islamic School",
  description: "Bergabunglah dengan tim pendidik dan staf profesional di Al Madeena Islamic School. Cek lowongan kerja terbaru di sini.",
};

export default function CareerPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Karir di Al Madeena"
        subtitle="Mari berkontribusi dalam mencetak generasi Qur'ani masa depan bersama kami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <CareerList />
    </main>
  );
}