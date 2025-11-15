// src/app/(main)/about/partners/page.tsx

import PageHeader from "~/components/common/PageHeader";
import PartnersContentClient from "~/components/about/PartnersContentClient";

export default function PartnersPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Partner Kerjasama"
        subtitle="Bersinergi untuk Pendidikan Islam yang Unggul"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <PartnersContentClient />
    </div>
  );
}
