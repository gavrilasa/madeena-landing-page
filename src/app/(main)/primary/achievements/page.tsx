import AchievementsContent from "~/components/academic/AchievementsContent";
import PageHeader from "~/components/common/PageHeader";

export default function PrimaryAchievementsPage() {
  return (
    <main>
      <PageHeader
        title="Prestasi Primary"
        subtitle="Merayakan Keberhasilan Siswa Primary Al Madeena"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <AchievementsContent category="primary" />
    </main>
  );
}