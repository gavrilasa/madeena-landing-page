import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { GalleryEditor } from "~/components/admin/gallery/GalleryEditor";

export const metadata = {
  title: "Manajemen Galeri | Admin Panel",
  description: "Atur tata letak dan konten galeri foto.",
};

export default async function AdminGalleryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const galleryData = await db.gallerySection.findMany({
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
    <div className="container mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Manajemen Galeri
        </h1>
        <p className="text-muted-foreground text-md">
          Atur tata letak grid dan unggah foto kegiatan sekolah secara
          real-time.
        </p>
      </div>

      <GalleryEditor initialData={galleryData} />
    </div>
  );
}
