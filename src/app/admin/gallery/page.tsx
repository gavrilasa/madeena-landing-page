import { db } from "~/server/db";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { GalleryEditor } from "~/components/admin/gallery/GalleryEditor";
import { type GallerySettings } from "~/types/gallery";

export const metadata = {
  title: "Manajemen Galeri - Admin",
};

export default async function AdminGalleryPage() {
  // 1. Ambil data dari database (Server Side)
  const settingsData = await db.gallerySettings.findFirst();

  // 2. Normalisasi data agar sesuai tipe TypeScript
  // Jika database kosong, berikan array kosong
  const initialData: GallerySettings = settingsData
    ? {
        content: settingsData.content as unknown as GallerySettings["content"],
      }
    : { content: [] };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manajemen Galeri</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Galeri Kegiatan</h1>
        <p className="text-muted-foreground">
          Atur tata letak foto kegiatan sekolah dengan sistem Drag and Drop.
          Jangan lupa tekan tombol <strong>Simpan</strong> setelah melakukan
          perubahan.
        </p>
      </div>

      <GalleryEditor initialData={initialData} />
    </div>
  );
}
