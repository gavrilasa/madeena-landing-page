import ExtracurricularContent from "~/components/academic/ExtracurricularContent";
import PageHeader from "~/components/common/PageHeader";

export default function PrimaryExtracurricularPage() {
  return (
    <main>
      <PageHeader
        title="Ekstrakurikuler Primary"
        subtitle="Wadah Pengembangan Bakat dan Karakter Siswa"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ExtracurricularContent category="primary" />
    </main>
  );
}