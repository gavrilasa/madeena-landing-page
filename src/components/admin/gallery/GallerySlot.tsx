"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical, ImagePlus } from "lucide-react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import type { GallerySlotProps } from "~/types/gallery";

export function GallerySlot({
  id,
  image,
  onUploadClick,
  onDeleteClick,
  className,
}: GallerySlotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  if (!image) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "hover:border-primary hover:bg-primary/5 hover:text-primary relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-colors",
          className,
          isDragging && "opacity-50",
        )}
      >
        <button
          type="button"
          onClick={onUploadClick}
          className="flex h-full w-full flex-col items-center justify-center p-4"
        >
          <ImagePlus className="mb-2 h-8 w-8" />
          <span className="text-xs font-medium">Tambah Foto</span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200",
        className,
        isDragging && "ring-primary z-50 scale-105 rotate-2 shadow-xl",
      )}
    >
      <Image
        src={image.url}
        alt={image.alt ?? "Gallery Image"}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40">
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab rounded-md bg-white p-1.5 text-gray-700 shadow-sm hover:bg-gray-100 active:cursor-grabbing"
            title="Pindahkan"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          <button
            onClick={() => onDeleteClick(image)}
            className="rounded-md bg-white p-1.5 text-red-600 shadow-sm hover:bg-red-50"
            title="Hapus Foto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {image.alt && (
          <div className="absolute bottom-2 left-2 max-w-[90%] truncate rounded bg-black/60 px-2 py-1 text-[10px] text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {image.alt}
          </div>
        )}
      </div>
    </div>
  );
}
