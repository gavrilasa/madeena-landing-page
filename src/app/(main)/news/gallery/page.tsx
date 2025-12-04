import { type Metadata } from "next";
import { db } from "~/server/db";
import Gallery from "~/components/gallery/Gallery";
import PageHeader from "~/components/common/PageHeader";

export const metadata: Metadata = {
  title: "Gallery | Madeena School",
  description:
    "Explore our gallery to see our school facilities, student activities, and achievements.",
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const sections = await db.gallerySection.findMany({
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <main className="bg-white">
      <PageHeader
        title="Galeri Sekolah"
        subtitle="Momen berharga dan dokumentasi kegiatan siswa Al Madeena Islamic School"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <Gallery sections={sections} />
    </main>
  );
}