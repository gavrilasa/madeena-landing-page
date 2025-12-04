import PageHeader from "~/components/common/PageHeader";
import StaffGridClient from "~/components/about/StaffGridClient";
import { db } from "~/server/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Guru & Staf | Al Madeena School",
  description:
    "Berkenalan dengan tim pendidik dan tenaga kependidikan kami yang berdedikasi.",
};

export const revalidate = 60;

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
        title="Profil Guru & Staf"
        subtitle="Berkenalan dengan tim pendidik dan tenaga kependidikan kami yang berdedikasi"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <StaffGridClient staffList={staffList} />
    </div>
  );
}
