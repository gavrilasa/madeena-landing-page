import AchievementsContent from "~/components/academic/AchievementsContent";
import PageHeader from "~/components/common/PageHeader";
import PreschoolQuickLinks from "~/components/academic/PreschoolQuickLinks";

export default function PreschoolAchievementsPage() {
  return (
    <main>
      <PageHeader
        title="Prestasi Preschool"
        subtitle="Kebanggaan Kecil Langkah Besar Siswa Preschool"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <AchievementsContent category="preschool" />
      <PreschoolQuickLinks />
    </main>
  );
}