import PageHeader from "~/components/common/PageHeader";
import PartnersContentClient from "~/components/about/PartnersContentClient";
import { partnersData } from "~/data/home/partnersData";

export const metadata = {
  title: "Partner Kerjasama - Al Madeena Islamic School",
  description:
    "Daftar mitra strategis dan kerjasama Al Madeena Islamic School.",
};

export default function PartnersPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Partner Kerjasama"
        subtitle="Bersinergi untuk Pendidikan Islam yang Unggul"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <PartnersContentClient data={partnersData} />
    </div>
  );
}
