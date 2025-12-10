"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { ImageUploader } from "~/components/ui/image-uploader";
import type { FoundationMember } from "~/types/foundation";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  // No NIP validation
  gender: z.enum(["MALE", "FEMALE"]),
  role: z.string().min(1, "Jabatan wajib diisi"),
  quote: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  instagram: z.string().optional(),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface FoundationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: FoundationMember | null;
  onSuccess: () => void;
}

export function FoundationFormDialog({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}: FoundationFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "MALE",
    role: "",
    quote: "",
    email: "",
    instagram: "",
    imageUrl: "",
    bio: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          gender: initialData.gender as "MALE" | "FEMALE",
          role: initialData.role,
          quote: initialData.quote ?? "",
          email: initialData.email ?? "",
          instagram: initialData.instagram ?? "",
          imageUrl: initialData.imageUrl ?? "",
          bio: initialData.bio ?? "",
          isActive: initialData.isActive,
        });
      } else {
        setFormData({
          name: "",
          gender: "MALE",
          role: "",
          quote: "",
          email: "",
          instagram: "",
          imageUrl: "",
          bio: "",
          isActive: true,
        });
      }
    }
  }, [open, initialData]);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast.error("Data tidak valid");
      setIsLoading(false);
      return;
    }

    try {
      const url = initialData
        ? `/api/admin/foundation/${initialData.id}`
        : "/api/admin/foundation";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      toast.success(initialData ? "Data diperbarui" : "Berhasil ditambahkan");
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Anggota Yayasan" : "Tambah Anggota Yayasan"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nama Lengkap<span className="-ml-1.5 text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Contoh: H. Murdiyono, S.T."
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Jenis Kelamin<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(val) =>
                  handleChange("gender", val as "MALE" | "FEMALE")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Laki-laki</SelectItem>
                  <SelectItem value="FEMALE">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">
                Jabatan di Yayasan
                <span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Contoh: Pembina Yayasan"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Foto Profil</Label>
            <ImageUploader
              value={formData.imageUrl ?? ""}
              onChange={(url) => handleChange("imageUrl", url)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Kutipan (Opsional)</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => handleChange("quote", e.target.value)}
              placeholder="Motto atau kutipan..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografi (Opsional)</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Biografi singkat..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email (Opsional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (Opsional)</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label>Status Aktif</Label>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(val) => handleChange("isActive", val)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
