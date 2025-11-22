import ProgramsContent from "~/components/academic/ProgramsContent";
import PageHeader from "~/components/common/PageHeader";

export default function PreschoolProgramsPage() {
  return (
    <main>
      <PageHeader
        title="Program Unggulan Preschool"
        subtitle="Ceria Belajar, Tumbuh Berkarakter"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ProgramsContent category="preschool" />
    </main>
  );
}