import { type Metadata } from "next";
import { db } from "~/server/db";
import Gallery from "~/components/gallery/Gallery";

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
    <div className="bg-white">
      <Gallery sections={sections} />
    </div>
  );
}
