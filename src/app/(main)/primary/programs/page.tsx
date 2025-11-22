import ProgramsContent from "~/components/academic/ProgramsContent";
import PageHeader from "~/components/common/PageHeader";

export default function PrimaryProgramsPage() {
  return (
    <main>
      <PageHeader
        title="Program Unggulan Primary"
        subtitle="Membangun Pondasi Akademik dan Karakter Islami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ProgramsContent category="primary" />
    </main>
  );
}