// src/app/(main)/about/vision-mission/page.tsx

import PageHeader from "~/components/common/PageHeader";
import VisionMissionContentClient from "~/components/about/VisionMissionContentClient";

const visiShared = "Global Generation, Islamic Character";

export default function VisionMisionPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Visi"
        subtitle={visiShared}
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <VisionMissionContentClient />
    </div>
  );
}
