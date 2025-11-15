// src/app/(main)/about/staff-profile/page.tsx

import PageHeader from "~/components/common/PageHeader";
import StaffGridClient from "~/components/about/StaffGridClient";

export default function StaffProfilePage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Meet The Team"
        subtitle="Our Dedicated Educators & Staff"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <StaffGridClient />
    </div>
  );
}
