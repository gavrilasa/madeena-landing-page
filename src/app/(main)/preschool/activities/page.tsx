import ActivitiesContent from "~/components/academic/ActivitiesContent";
import PageHeader from "~/components/common/PageHeader";

export default function PrimaryActivitiesPage() {
  return (
    <main>
      <PageHeader 
        title="Kegiatan Preschool" 
        subtitle="Mengembangkan Potensi Akademik dan Karakter"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp" 
      />
      <ActivitiesContent category="preschool" />
    </main>
  );
}