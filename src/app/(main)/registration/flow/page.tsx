import PageHeader from "~/components/common/PageHeader";
import { RegistrationFlow } from "~/components/registration/RegistrationFlow";

export const metadata = {
  title: "Alur Pendaftaran - Al Madeena Islamic School",
  description: "Informasi lengkap mengenai tahapan dan prosedur pendaftaran siswa baru di Al Madeena Islamic School.",
};

export default function RegistrationFlowPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Alur Pendaftaran"
        subtitle="Langkah mudah bergabung menjadi bagian dari keluarga besar Al Madeena"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <RegistrationFlow />
    </main>
  );
}