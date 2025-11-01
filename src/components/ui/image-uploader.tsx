"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

export function ImageUploader({
  value,
  onChange,
  onUploadStart,
  onUploadEnd,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast.error("File terlalu besar. Maksimal 10MB.");
      return;
    }

    setIsUploading(true);
    onUploadStart?.();
    const toastId = toast.loading("Mengunggah gambar...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengunggah gambar.");
      }

      const result = (await response.json()) as { url: string };
      onChange(result.url);
      toast.success("Gambar berhasil diunggah.", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan.",
        { id: toastId },
      );
    } finally {
      setIsUploading(false);
      onUploadEnd?.();
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleFileChange(file);
    }
  };

  if (value) {
    return (
      <div className="relative h-48 w-full overflow-hidden rounded-md border">
        <Image
          src={value}
          alt="Preview Gambar Sampul"
          layout="fill"
          objectFit="cover"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={() => onChange("")}
          disabled={isUploading}
          aria-label="Hapus gambar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-48 w-full flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-gray-300 bg-gray-50",
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <UploadCloud className="mb-2 h-10 w-10 text-gray-400" />
      <p className="mb-2 text-sm text-gray-500">
        <label
          htmlFor="file-upload"
          className="text-primary cursor-pointer font-medium hover:underline"
        >
          Pilih file
        </label>{" "}
        atau tarik dan lepas
      </p>
      <p className="text-xs text-gray-400">PNG, JPG, GIF hingga 10MB</p>
      <input
        id="file-upload"
        type="file"
        className="sr-only"
        accept="image/png, image/jpeg, image/gif"
        onChange={(e) => void handleFileChange(e.target.files?.[0] ?? null)}
        disabled={isUploading}
      />
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-white/80 backdrop-blur-sm">
          <p className="text-primary text-sm font-medium">Mengunggah...</p>
        </div>
      )}
    </div>
  );
}
