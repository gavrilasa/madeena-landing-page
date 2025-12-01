"use client";

import React from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { SortableBlockProps } from "~/types/gallery";

export function SortableBlock({
  section,
  onDeleteBlock,
  onUploadRequest,
  onDeleteImage,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const getImageClass = (index: number, type: string) => {
    if (index === 0) {
      const baseClass = "col-span-2 row-span-2 h-[300px] md:h-full";

      if (type === "right-large") {
        return `${baseClass} md:col-start-3 md:col-span-2 md:row-span-2`;
      }
      return `${baseClass} md:col-start-1 md:col-span-2 md:row-span-2`;
    }

    return "col-span-1 row-span-1 h-[150px] md:h-full";
  };

  const slots = Array.from({ length: 5 });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab rounded p-1 hover:bg-gray-100 active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </button>
          <span className="text-sm font-medium tracking-wider text-gray-600 uppercase">
            Layout {section.type === "right-large" ? "Kanan" : "Kiri"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDeleteBlock}
          className="text-red-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-[250px_250px]">
        {slots.map((_, index) => {
          const image = section.images.find((img) => img.order === index);

          const slotClass = getImageClass(index, section.type);

          if (image) {
            return (
              <div
                key={image.id}
                className={cn(
                  "group/image relative overflow-hidden rounded-lg bg-gray-100",
                  slotClass,
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/image:opacity-100">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteImage(image.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute top-2 left-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white">
                  {index === 0 ? "BIG" : `#${index}`}
                </div>
              </div>
            );
          } else {
            return (
              <button
                key={`empty-${index}`}
                onClick={() => onUploadRequest(index)}
                className={cn(
                  "hover:border-primary hover:bg-primary/5 hover:text-primary flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 transition-colors",
                  slotClass,
                )}
              >
                <Plus className="mb-2 h-8 w-8" />
                <span className="text-xs font-medium">Add Photo</span>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
