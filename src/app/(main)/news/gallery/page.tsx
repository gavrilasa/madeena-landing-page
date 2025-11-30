import Image from "next/image";
import { db } from "~/server/db";
import { cn } from "~/lib/utils";
import PageHeader from "~/components/common/PageHeader";
import type { GalleryBlock } from "~/types/gallery";

export const metadata = {
  title: "Galeri Kegiatan - Al Madeena",
  description:
    "Dokumentasi kegiatan dan momen berharga siswa-siswi Al Madeena Islamic School.",
};

// Fungsi helper untuk mendapatkan class grid berdasarkan varian dan index
function getGridClass(variant: string, index: number): string {
  const isLargeImage = index === 0; // Asumsi index 0 selalu gambar utama

  // Base classes untuk semua item (mobile first: full width/half width)
  // Di mobile (grid-cols-2), gambar besar jadi full width (col-span-2), kecil jadi 1 kotak
  const classes =
    "relative overflow-hidden rounded-xl bg-gray-50 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md";

  if (variant === "left-large") {
    // LAYOUT KIRI BESAR
    if (isLargeImage) {
      // Desktop: Span 2 kolom & 2 baris
      // Mobile: Span 2 kolom (full width di grid-cols-2)
      return cn(classes, "col-span-2 row-span-2 h-[300px] md:h-full");
    }
    // Gambar kecil: Span 1
    return cn(classes, "col-span-1 row-span-1 h-[150px] md:h-[250px]");
  }

  if (variant === "right-large") {
    // LAYOUT KANAN BESAR
    if (isLargeImage) {
      // Desktop: Span 2 kolom & 2 baris, TAPI ditaruh di kolom ke-3 (Kanan)
      // Kita gunakan 'md:col-start-3' untuk memaksanya ke kanan
      return cn(
        classes,
        "col-span-2 row-span-2 h-[300px] md:h-full md:col-start-3",
      );
    }
    // Gambar kecil: Span 1
    return cn(classes, "col-span-1 row-span-1 h-[150px] md:h-[250px]");
  }

  return classes;
}

export default async function GalleryPage() {
  // 1. Ambil data dari database
  // Gunakan casting 'any' sementara jika TS belum mengenali model baru, atau hapus jika sudah aman
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settingsData = await (db as any).gallerySettings.findFirst();

  // 2. Parsing Data
  const galleryBlocks: GalleryBlock[] = settingsData
    ? (settingsData.content as unknown as GalleryBlock[])
    : [];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Halaman */}
      <PageHeader
        title="Galeri Kegiatan"
        subtitle="Momen ceria dan inspiratif dari kegiatan belajar mengajar di Al Madeena."
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Jika Galeri Kosong */}
        {galleryBlocks.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 text-center">
            <p className="text-xl font-medium text-gray-400">
              Belum ada foto kegiatan yang diunggah.
            </p>
          </div>
        )}

        {/* Loop setiap Blok Layout */}
        <div className="flex flex-col gap-8 md:gap-12">
          {galleryBlocks.map((block) => (
            <div
              key={block.id}
              // GRID CONTAINER
              // Mobile: 2 kolom. Desktop: 4 kolom.
              // 'grid-flow-row-dense' SANGAT PENTING untuk layout "Kanan Besar"
              // agar item-item kecil (index 1-4) mengisi celah di sebelah kiri secara otomatis.
              className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 md:grid-flow-row-dense md:grid-cols-4 md:gap-6"
            >
              {block.images.map((image, index) => {
                const gridClassName = getGridClass(block.variant, index);

                // Slot Kosong (null)
                if (!image) {
                  return (
                    <div
                      key={`empty-${block.id}-${index}`}
                      className={cn(
                        gridClassName,
                        "border border-gray-100 bg-white",
                      )} // Kotak putih polos
                      aria-hidden="true"
                    />
                  );
                }

                // Slot Terisi Gambar
                return (
                  <div key={image.id} className={gridClassName}>
                    <Image
                      src={image.url}
                      alt={image.alt || "Dokumentasi Kegiatan Al Madeena"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Caption on Hover (Optional UX Improvement) */}
                    {image.alt && (
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <p className="line-clamp-2 text-sm font-medium text-white">
                          {image.alt}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
