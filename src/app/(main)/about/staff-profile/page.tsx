import PageHeader from "~/components/common/PageHeader";
import StaffGridClient from "~/components/about/StaffGridClient";
import { db } from "~/server/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet The Team - Al Madeena Islamic School",
  description:
    "Profil pendidik dan staf profesional Al Madeena Islamic School.",
};

export default async function StaffProfilePage() {
  const rawStaff = await db.staff.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  const staffList = rawStaff.map((staff) => ({
    ...staff,
    createdAt: staff.createdAt.toISOString(),
    updatedAt: staff.updatedAt.toISOString(),
  }));

  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Meet The Team"
        subtitle="Our Dedicated Educators & Staff"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <StaffGridClient staffList={staffList} />
    </div>
  );
}
