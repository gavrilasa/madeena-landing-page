import ExtracurricularContent from "~/components/academic/ExtracurricularContent";
import PageHeader from "~/components/common/PageHeader";
import PreschoolQuickLinks from "~/components/academic/PreschoolQuickLinks";

export default function PreschoolExtracurricularPage() {
  return (
    <main>
      <PageHeader
        title="Ekstrakurikuler Preschool"
        subtitle="Belajar Sambil Bermain, Tumbuh dengan Ceria"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ExtracurricularContent category="preschool" />
      <PreschoolQuickLinks />
    </main>
  );
}