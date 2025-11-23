import FacilitiesContent from "~/components/academic/FacilitiesContent";
import PageHeader from "~/components/common/PageHeader";
import PreschoolQuickLinks from "~/components/academic/PreschoolQuickLinks";

export default function PreschoolFacilitiesPage() {
  return (
    <main>
      <PageHeader
        title="Fasilitas Preschool"
        subtitle="Sarana Penunjang Pembelajaran Modern & Islami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <FacilitiesContent category="preschool" />
      <PreschoolQuickLinks />
    </main>
  );
}