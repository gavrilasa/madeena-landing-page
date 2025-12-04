import PageHeader from "~/components/common/PageHeader";
import VisionMissionContentClient from "~/components/about/VisionMissionContentClient";
import { visionMissionData } from "~/data/about/visionMissionData";

export const metadata = {
  title: "Visi Misi - Al Madeena Islamic School",
  description:
    "Visi dan Misi Al Madeena Islamic School untuk jenjang Preschool dan Primary.",
};

export default function VisionMisionPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Visi Misi Al Madeena"
        subtitle="Visi dan Misi Sekolah Al Madeena Cendekia Muslim untuk Mencetak Generasi Global yang Berkarakter Islami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <VisionMissionContentClient features={visionMissionData} />
    </div>
  );
}
