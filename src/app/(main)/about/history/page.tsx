// src/app/(main)/about/history/page.tsx

import PageHeader from "~/components/common/PageHeader";
import HistoryContent from "~/components/about/HistoryContent";

export default function HistoryPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Sejarah Al Madeena"
        subtitle="Dari Bimbingan Belajar Menuju Lembaga Pendidikan Islam"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <HistoryContent />
    </div>
  );
}
