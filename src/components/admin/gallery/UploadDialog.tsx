"use client";

import React, { useState, useRef } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { UploadDialogProps } from "~/types/gallery";

export function UploadDialog({
  open,
  onOpenChange,
  onSuccess,
}: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setFile(null);
    setAltText("");
    setIsUploading(false);
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 3 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 3MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "madeena/gallery");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      const data = (await res.json()) as { url: string; public_id: string };

      onSuccess({
        url: data.url,
        publicId: data.public_id,
        alt: altText,
      });

      toast.success("Gambar terupload, menyimpan ke galeri...");
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengupload gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Foto Galeri</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
              file
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {file ? (
              <div className="text-center">
                <p className="text-primary font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  <X className="mr-1 h-3 w-3" /> Ganti File
                </Button>
              </div>
            ) : (
              <>
                <UploadCloud className="mb-2 h-10 w-10 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  Klik untuk pilih gambar
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, WEBP (Max 5MB)
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt-text">Deskripsi Gambar (Alt Text)</Label>
            <Input
              id="alt-text"
              placeholder="Contoh: Kegiatan siswa belajar di kelas..."
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
          >
            Batal
          </Button>
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUploading ? "Mengupload..." : "Upload & Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
