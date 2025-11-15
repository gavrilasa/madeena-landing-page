// src/app/(main)/about/foundation-board/page.tsx

import PageHeader from "~/components/common/PageHeader";
import FoundationBoardGridClient from "~/components/about/FoundationBoardGridClient";

export default function FoundationBoardPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Dewan Yayasan"
        subtitle="Yayasan Al Madeena Cendekia Muslim"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <FoundationBoardGridClient />
    </div>
  );
}
