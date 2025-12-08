import PageHeader from "~/components/common/PageHeader";
import FoundationBoardGridClient from "~/components/about/FoundationBoardGridClient";
import { db } from "~/server/db";

export default async function FoundationBoardPage() {
  // Fetch from the new table
  const boardData = await db.foundationMember.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Dewan Yayasan"
        subtitle="Yayasan Al Madeena Cendekia Muslim"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      {/* Note: Ensure FoundationBoardGridClient accepts FoundationMember[] type */}
      <FoundationBoardGridClient data={boardData} />
    </div>
  );
}