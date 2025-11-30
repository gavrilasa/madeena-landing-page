"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog"; // Pastikan komponen Dialog Shadcn sudah ada
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type GalleryImage } from "~/types/gallery";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (image: GalleryImage) => void;
}

export function UploadDialog({
  open,
  onOpenChange,
  onSuccess,
}: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal mengunggah gambar");

      const data = (await res.json()) as { url: string };

      // Ambil public_id sederhana dari URL (atau sesuaikan jika API upload Anda mengembalikan public_id)
      // Contoh regex sederhana untuk mengambil ID sebelum ekstensi
      const publicIdMatch = data.url.match(/\/v\d+\/(.+)\.[a-z]+$/i);
      const publicId = publicIdMatch ? publicIdMatch[1] : undefined;

      const newImage: GalleryImage = {
        id: crypto.randomUUID(),
        url: data.url,
        alt: altText,
        publicId: publicId,
      };

      onSuccess(newImage);
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengunggah.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setAltText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unggah Foto Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Gambar</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="alt">Keterangan (Alt Text) - Opsional</Label>
            <Input
              id="alt"
              placeholder="Contoh: Kegiatan Belajar Mengajar"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              disabled={isUploading}
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
          <Button onClick={handleUpload} disabled={isUploading || !file}>
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
