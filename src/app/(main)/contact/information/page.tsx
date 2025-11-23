import PageHeader from "~/components/common/PageHeader";
import { ContactContent } from "~/components/contact/ContactContent";

export const metadata = {
  title: "Hubungi Kami - Al Madeena Islamic School",
  description:
    "Informasi kontak lengkap Al Madeena Islamic School: Alamat, Nomor Telepon, Email, dan Sosial Media.",
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Hubungi Kami"
        subtitle="Kami siap membantu menjawab pertanyaan Anda seputar pendidikan di Al Madeena."
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <ContactContent />
    </main>
  );
}