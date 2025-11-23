import FacilitiesContent from "~/components/academic/FacilitiesContent";
import PageHeader from "~/components/common/PageHeader";
import PrimaryQuickLinks from "~/components/academic/PrimaryQuickLinks";

export default function PrimaryFacilitiesPage() {
  return (
    <main>
      <PageHeader
        title="Fasilitas Primary"
        subtitle="Sarana Penunjang Pembelajaran Modern & Islami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <FacilitiesContent category="primary" />
      <PrimaryQuickLinks />
    </main>
  );
}