import PageHeader from "~/components/common/PageHeader";
import { FaqAccordion } from "~/components/registration/FaqAccordion";
import { faqData } from "~/data/registration/faqData";

export const metadata = {
  title: "FAQ - Al Madeena Islamic School",
  description: "Pertanyaan yang sering diajukan seputar pendaftaran, kurikulum, dan kegiatan di Al Madeena Islamic School.",
};

export default function FaqPage() {
  return (
    <main className="bg-white">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Temukan jawaban atas pertanyaan Anda tentang Al Madeena Islamic School"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-6">
          <FaqAccordion items={faqData} />
          <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Masih punya pertanyaan lain?
            </h3>
            <p className="mt-2 text-gray-600">
              Jangan ragu untuk menghubungi tim kami langsung.
            </p>
            <a
              href="/contact/information"
              className="mt-6 inline-block rounded-full bg-black px-8 py-3 font-semibold text-white transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}