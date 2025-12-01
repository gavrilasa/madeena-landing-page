"use client";

import React, { useState, useEffect } from "react";
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
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import {
  Plus,
  Loader2,
  CheckCircle,
  AlertCircle,
  LayoutPanelLeft,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { SortableBlock } from "./SortableBlock";
import { UploadDialog } from "./UploadDialog";
import type {
  GallerySection,
  GalleryImage,
  GalleryEditorProps,
} from "~/types/gallery";

export function GalleryEditor({ initialData }: GalleryEditorProps) {
  const [sections, setSections] = useState<GallerySection[]>(initialData);

  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<
    GallerySection | GalleryImage | null
  >(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "section" | "image";
    id: string;
    sectionId?: string;
  } | null>(null);

  const [uploadTarget, setUploadTarget] = useState<{
    sectionId: string;
    order: number;
  } | null>(null);

  useEffect(() => {
    if (saveStatus === "saved") {
      const timer = setTimeout(() => setSaveStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddSection = async (type: string) => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/gallery/section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!res.ok) throw new Error("Gagal membuat section");

      const newSection = (await res.json()) as GallerySection;

      setSections((prev) => [...prev, newSection]);
      setSaveStatus("saved");

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
      toast.error("Gagal menambah layout baru");
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    setDeleteTarget({ type: "section", id: sectionId });
  };

  const handleDeleteImage = (imageId: string, sectionId: string) => {
    setDeleteTarget({ type: "image", id: imageId, sectionId });
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "section") {
      const sectionId = deleteTarget.id;

      const previousSections = [...sections];
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      setSaveStatus("saving");

      try {
        const res = await fetch(`/api/admin/gallery/section/${sectionId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Gagal menghapus");

        setSaveStatus("saved");
        toast.success("Layout berhasil dihapus");
      } catch (error) {
        console.error(error);
        setSections(previousSections);
        setSaveStatus("error");
        toast.error("Gagal menghapus layout, perubahan dikembalikan.");
      }
    }

    if (deleteTarget.type === "image") {
      const { id: imageId, sectionId } = deleteTarget;
      if (!sectionId) return;

      const previousSections = JSON.parse(
        JSON.stringify(sections),
      ) as GallerySection[];

      setSections((prev) =>
        prev.map((sec) => {
          if (sec.id === sectionId) {
            return {
              ...sec,
              images: sec.images.filter((img) => img.id !== imageId),
            };
          }
          return sec;
        }),
      );
      setSaveStatus("saving");

      try {
        const res = await fetch(`/api/admin/gallery/image/${imageId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Gagal menghapus gambar");

        setSaveStatus("saved");
      } catch (error) {
        console.error(error);
        setSections(previousSections);
        setSaveStatus("error");
        toast.error("Gagal menghapus gambar. Silakan coba lagi.");
      }
    }

    setDeleteTarget(null);
  };

  const handleUploadRequest = (sectionId: string, order: number) => {
    setUploadTarget({ sectionId, order });
    setIsUploadOpen(true);
  };

  const handleUploadSuccess = async (fileData: {
    url: string;
    publicId: string;
    alt?: string;
  }) => {
    if (!uploadTarget) return;

    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/gallery/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId: uploadTarget.sectionId,
          url: fileData.url,
          publicId: fileData.publicId,
          alt: fileData.alt ?? "",
          order: uploadTarget.order,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data gambar");

      const newImage = (await res.json()) as GalleryImage;

      setSections((prev) =>
        prev.map((sec) => {
          if (sec.id === uploadTarget.sectionId) {
            const otherImages = sec.images.filter(
              (img) => img.order !== newImage.order,
            );
            return { ...sec, images: [...otherImages, newImage] };
          }
          return sec;
        }),
      );
      setSaveStatus("saved");
      toast.success("Foto berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
      toast.error("Gagal menyimpan foto ke database");
    }
  };

  // --- DRAG AND DROP LOGIC ---

  const findSection = (id: string) => sections.find((s) => s.id === id);
  const findImage = (id: string) => {
    for (const section of sections) {
      const img = section.images.find((i) => i.id === id);
      if (img) return { image: img, sectionId: section.id };
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const section = findSection(active.id as string);
    if (section) {
      setActiveItem(section);
      return;
    }

    const imgData = findImage(active.id as string);
    if (imgData) {
      setActiveItem(imgData.image);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    const activeIsImage = !findSection(activeIdStr);

    if (!activeIsImage) return;

    const sourceData = findImage(activeIdStr);
    const overData = findImage(overIdStr);
    const overSection = findSection(overIdStr);

    if (!sourceData) return;

    const sourceSectionId = sourceData.sectionId;
    const targetSectionId = overData?.sectionId ?? overSection?.id;

    if (
      sourceSectionId &&
      targetSectionId &&
      sourceSectionId !== targetSectionId
    ) {
      setSections((prev) => {
        const newSections = JSON.parse(
          JSON.stringify(prev),
        ) as GallerySection[];

        const srcSec = newSections.find((s) => s.id === sourceSectionId);
        const tgtSec = newSections.find((s) => s.id === targetSectionId);

        if (!srcSec || !tgtSec) return prev;

        const activeIndex = srcSec.images.findIndex(
          (i) => i.id === activeIdStr,
        );
        if (activeIndex === -1) return prev;

        const [movedImage] = srcSec.images.splice(activeIndex, 1);
        if (movedImage) {
          movedImage.sectionId = targetSectionId;

          if (overData) {
            const overIndex = tgtSec.images.findIndex(
              (i) => i.id === overIdStr,
            );
            tgtSec.images.splice(
              overIndex >= 0 ? overIndex : tgtSec.images.length,
              0,
              movedImage,
            );
          } else {
            tgtSec.images.push(movedImage);
          }
        }

        return newSections;
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;
    if (active.id === over.id) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    const isSectionDrag = findSection(activeIdStr);
    if (isSectionDrag) {
      setSections((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === activeIdStr);
        const newIndex = prev.findIndex((s) => s.id === overIdStr);
        return arrayMove(prev, oldIndex, newIndex);
      });

      setSaveStatus("saving");
      try {
        const oldIndex = sections.findIndex((s) => s.id === activeIdStr);
        const newIndex = sections.findIndex((s) => s.id === overIdStr);
        const reordered = arrayMove(sections, oldIndex, newIndex);

        const payload = reordered.map((sec, idx) => ({
          id: sec.id,
          order: idx,
        }));

        await fetch("/api/admin/gallery/section", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: payload }),
        });
        setSaveStatus("saved");
      } catch (e) {
        console.error(e);
        setSaveStatus("error");
      }
      return;
    }

    const activeImgData = findImage(activeIdStr);

    if (activeImgData) {
      const targetSection = sections.find(
        (s) => s.id === activeImgData.sectionId,
      );

      if (targetSection) {
        const oldIndex = targetSection.images.findIndex(
          (i) => i.id === activeIdStr,
        );
        const newIndex = targetSection.images.findIndex(
          (i) => i.id === overIdStr,
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          const newImages = arrayMove(targetSection.images, oldIndex, newIndex);

          setSections((prev) =>
            prev.map((s) => {
              if (s.id === targetSection.id) return { ...s, images: newImages };
              return s;
            }),
          );

          setSaveStatus("saving");
          const payload = newImages.map((img, idx) => ({
            id: img.id,
            order: idx,
            sectionId: targetSection.id,
          }));

          fetch("/api/admin/gallery/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: payload }),
          })
            .then(() => setSaveStatus("saved"))
            .catch(() => setSaveStatus("error"));
        } else {
          setSaveStatus("saving");
          const payload = targetSection.images.map((img, idx) => ({
            id: img.id,
            order: idx,
            sectionId: targetSection.id,
          }));
          fetch("/api/admin/gallery/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: payload }),
          })
            .then(() => setSaveStatus("saved"))
            .catch(() => setSaveStatus("error"));
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-16 z-40 flex items-center justify-between rounded-xl border bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium transition-opacity duration-300">
            {saveStatus === "saving" && (
              <span className="flex items-center rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-blue-600">
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Saving...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="flex items-center rounded-md border border-green-100 bg-green-50 px-2 py-1 text-green-600">
                <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                All changes saved
              </span>
            )}
            {saveStatus === "error" && (
              <span className="flex items-center rounded-md border border-red-100 bg-red-50 px-2 py-1 text-red-600">
                <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
                Error saving changes
              </span>
            )}
            {saveStatus === "idle" && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                {sections.length} Layout Aktif
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Layout
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleAddSection("left-large")}
                className="cursor-pointer"
              >
                <LayoutPanelLeft className="mr-2 h-4 w-4" />
                Layout Kiri
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddSection("right-large")}
                className="cursor-pointer"
              >
                <LayoutPanelLeft className="mr-2 h-4 w-4 rotate-180" />
                Layout Kanan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-4">
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                <p className="text-gray-500">Belum ada layout galeri.</p>
                <Button
                  variant="link"
                  onClick={() => handleAddSection("left-large")}
                  className="cursor-pointer"
                >
                  Klik untuk tambah layout pertama
                </Button>
              </div>
            ) : (
              sections.map((section) => (
                <SortableBlock
                  key={section.id}
                  section={section}
                  onDeleteBlock={() => handleDeleteSection(section.id)}
                  onUploadRequest={(index) =>
                    handleUploadRequest(section.id, index)
                  }
                  onDeleteImage={(imgId) =>
                    handleDeleteImage(imgId, section.id)
                  }
                />
              ))
            )}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId && activeItem ? (
            <div className="opacity-80">
              {"type" in activeItem ? (
                <div className="rounded border bg-white p-4 shadow-lg">
                  Moving Section...
                </div>
              ) : (
                <div className="relative h-32 w-32 overflow-hidden rounded-lg shadow-xl ring-2 ring-blue-500">
                  <Image
                    src={activeItem.url}
                    alt="Moving"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <UploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSuccess={handleUploadSuccess}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.type === "section"
                ? "Layout ini beserta seluruh foto di dalamnya akan dihapus permanen. Tindakan ini tidak dapat dibatalkan."
                : "Foto ini akan dihapus permanen dari galeri. Tindakan ini tidak dapat dibatalkan."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
