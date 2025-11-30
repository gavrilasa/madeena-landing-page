"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Plus, Save, LayoutGrid, Loader2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UploadDialog } from "./UploadDialog";
import { SortableBlock } from "./SortableBlock";
import {
  type GallerySettings,
  type GalleryBlock,
  type GalleryImage,
} from "~/types/gallery";

interface GalleryEditorProps {
  initialData: GallerySettings;
}

export function GalleryEditor({ initialData }: GalleryEditorProps) {
  // State Utama
  const [blocks, setBlocks] = useState<GalleryBlock[]>(initialData.content);
  const [isSaving, setIsSaving] = useState(false);

  // State Upload
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [targetSlotId, setTargetSlotId] = useState<string | null>(null);

  // State Drag & Drop
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), // Jarak 8px agar tidak bentrok dengan klik
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // --- CRUD Operations ---

  const handleAddBlock = (variant: "left-large" | "right-large") => {
    const newBlock: GalleryBlock = {
      id: crypto.randomUUID(),
      variant,
      // Fix: Explicitly type the array to avoid unsafe assignment of any[]
      images: new Array<GalleryImage | null>(5).fill(null),
    };
    setBlocks((prev) => [...prev, newBlock]);
    // Scroll ke bawah
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleDeleteBlock = (blockId: string) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus layout ini beserta isinya?")
    ) {
      setBlocks((prev) => prev.filter((b) => b.id !== blockId));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blocks),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success("Perubahan galeri berhasil disimpan!");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Image Handling ---

  const handleUploadRequest = (slotId: string) => {
    setTargetSlotId(slotId);
    setIsUploadOpen(true);
  };

  const handleUploadSuccess = (image: GalleryImage) => {
    if (!targetSlotId) return;
    const [blockId, indexStr] = targetSlotId.split("::");
    const index = parseInt(indexStr!, 10);

    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id === blockId) {
          const newImages = [...block.images];
          newImages[index] = image;
          return { ...block, images: newImages };
        }
        return block;
      }),
    );
  };

  const handleDeleteImage = async (slotId: string, image: GalleryImage) => {
    if (
      !confirm("Hapus foto ini? (Foto akan dihapus permanen dari Cloudinary)")
    )
      return;

    // 1. Hapus fisik di Cloudinary (jika ada publicId)
    if (image.publicId || image.url) {
      try {
        await fetch("/api/admin/gallery/image", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: image.publicId, url: image.url }),
        });
      } catch (error) {
        console.error("Gagal hapus Cloudinary", error);
        toast.warning(
          "Gagal menghapus file Cloudinary, tapi akan dihapus dari layout.",
        );
      }
    }

    // 2. Hapus dari State Lokal
    const [blockId, indexStr] = slotId.split("::");
    const index = parseInt(indexStr!, 10);

    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id === blockId) {
          const newImages = [...block.images];
          newImages[index] = null;
          return { ...block, images: newImages };
        }
        return block;
      }),
    );
    toast.success("Foto dihapus.");
  };

  // --- Drag and Drop Logic ---

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id as string;
    setActiveId(id);

    const [blockId, indexStr] = id.split("::");
    const index = parseInt(indexStr!, 10);
    const block = blocks.find((b) => b.id === blockId);
    if (block) {
      setActiveImage(block.images[index] ?? null);
    }
  };

  // Removed unused event parameter
  const handleDragOver = () => {
    // Logika ini opsional jika hanya ingin swap saat drop
    // Tapi berguna jika ingin visual real-time
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveImage(null);

    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    if (activeIdStr !== overIdStr) {
      const [activeBlockId, activeIndexStr] = activeIdStr.split("::");
      const [overBlockId, overIndexStr] = overIdStr.split("::");

      const activeIndex = parseInt(activeIndexStr!, 10);
      const overIndex = parseInt(overIndexStr!, 10);

      // Skenario 1: Pindah dalam blok yang sama (Swap)
      if (activeBlockId === overBlockId) {
        setBlocks((prev) =>
          prev.map((block) => {
            if (block.id === activeBlockId) {
              const newImages = arrayMove(block.images, activeIndex, overIndex);
              return { ...block, images: newImages };
            }
            return block;
          }),
        );
      }
      // Skenario 2: Pindah antar blok (Cross-container move)
      else {
        setBlocks((prev) => {
          // Deep clone agar aman
          const newBlocks = JSON.parse(JSON.stringify(prev)) as GalleryBlock[];

          const sourceBlock = newBlocks.find((b) => b.id === activeBlockId);
          const targetBlock = newBlocks.find((b) => b.id === overBlockId);

          if (sourceBlock && targetBlock) {
            // Tukar isi (Swap)
            // Fix: Use nullish coalescing to ensure type safety (GalleryImage | null)
            const sourceItem = sourceBlock.images[activeIndex] ?? null;
            const targetItem = targetBlock.images[overIndex] ?? null;

            sourceBlock.images[activeIndex] = targetItem; // Item target pindah ke source
            targetBlock.images[overIndex] = sourceItem; // Item source pindah ke target
          }

          return newBlocks;
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Toolbar Atas */}
      <div className="sticky top-[70px] z-40 flex items-center justify-between rounded-xl border bg-white/80 p-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800">Gallery Builder</h2>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {blocks.length} Layouts
          </span>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Layout
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAddBlock("left-large")}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Besar Kiri (Default)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddBlock("right-large")}>
                <LayoutGrid className="mr-2 h-4 w-4 rotate-180" />
                Besar Kanan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* Area Kerja Drag Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-8 pb-20">
          {blocks.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <p className="text-gray-500">Belum ada layout galeri.</p>
              <Button
                variant="link"
                onClick={() => handleAddBlock("left-large")}
              >
                Klik untuk tambah layout pertama
              </Button>
            </div>
          ) : (
            blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                onDeleteBlock={handleDeleteBlock}
                onUploadRequest={handleUploadRequest}
                onDeleteImage={handleDeleteImage}
              />
            ))
          )}
        </div>

        {/* Overlay saat Dragging (Visual feedback) */}
        <DragOverlay>
          {activeId && activeImage ? (
            <div className="ring-primary h-full w-full overflow-hidden rounded-xl bg-white opacity-80 shadow-2xl ring-2">
              <Image
                src={activeImage.url}
                alt="Drag preview"
                fill
                className="object-cover"
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Dialog Upload */}
      <UploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
