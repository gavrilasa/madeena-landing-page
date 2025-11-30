"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Trash2, LayoutTemplate } from "lucide-react";
import { Button } from "~/components/ui/button";
import { GallerySlot } from "./GallerySlot";
import { type GalleryBlock, type GalleryImage } from "~/types/gallery";
import { cn } from "~/lib/utils";

interface SortableBlockProps {
  block: GalleryBlock;
  onDeleteBlock: (id: string) => void;
  onUploadRequest: (slotId: string) => void;
  onDeleteImage: (slotId: string, image: GalleryImage) => void;
}

export function SortableBlock({
  block,
  onDeleteBlock,
  onUploadRequest,
  onDeleteImage,
}: SortableBlockProps) {
  // Blok itu sendiri adalah droppable container
  const { setNodeRef } = useDroppable({
    id: block.id,
    data: { type: "container", blockId: block.id },
  });

  // Generate ID unik untuk setiap slot agar dnd-kit bisa melacaknya
  const slotIds = block.images.map((_, index) => `${block.id}::${index}`);

  return (
    <div
      ref={setNodeRef}
      className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/50 p-4 md:p-6"
    >
      {/* Header Blok */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-white p-2 shadow-sm">
            <LayoutTemplate className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Layout Block</h3>
            <p className="text-muted-foreground text-xs">
              {block.variant === "left-large"
                ? "Gambar Besar di Kiri"
                : "Gambar Besar di Kanan"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDeleteBlock(block.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Hapus Layout
        </Button>
      </div>

      {/* Grid Content */}
      <SortableContext items={slotIds} strategy={rectSortingStrategy}>
        <div
          // FIX: Tambahkan 'md:grid-flow-row-dense' agar item kecil otomatis mengisi celah kosong
          className="grid h-[600px] grid-cols-2 gap-4 md:h-[500px] md:grid-flow-row-dense md:grid-cols-4"
        >
          {block.images.map((image, index) => {
            const slotId = `${block.id}::${index}`;

            // Default: 1x1 kotak
            let gridClass = "col-span-1 row-span-1";

            if (block.variant === "left-large") {
              // Logika Kiri Besar: Index 0 span 2x2
              if (index === 0) gridClass = "col-span-2 row-span-2 md:h-full";
            } else {
              // FIX: Logika Kanan Besar (Right Large)
              // Gunakan 'md:col-start-3' untuk memaksa gambar besar ke kanan.
              // 'grid-flow-row-dense' pada parent akan mengurus sisanya (item kecil mengisi kiri).
              if (index === 0)
                gridClass = "col-span-2 row-span-2 md:col-start-3 md:h-full";
            }

            return (
              <GallerySlot
                key={slotId}
                id={slotId}
                image={image}
                onUploadClick={() => onUploadRequest(slotId)}
                onDeleteClick={(img) => onDeleteImage(slotId, img)}
                className={cn("h-full w-full", gridClass)}
              />
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
}
