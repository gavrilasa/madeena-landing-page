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
import type { Staff } from "~/types/staff";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  nip: z.string().min(1, "NIP wajib diisi"),
  gender: z.enum(["MALE", "FEMALE"]),
  role: z.string().min(1, "Jabatan wajib diisi"),
  department: z.string().min(1, "Departemen wajib dipilih"),
  quote: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  instagram: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface StaffFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Staff | null;
  onSuccess: () => void;
}

const DEPARTMENTS = [
  { value: "leadership", label: "Leadership Team" },
  { value: "teachers", label: "Teaching Staff" },
  { value: "administration", label: "Administration" },
  { value: "support", label: "Support Staff" },
];

export function StaffFormDialog({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}: StaffFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    nip: "",
    gender: "MALE",
    role: "",
    department: "",
    quote: "",
    email: "",
    instagram: "",
    imageUrl: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          nip: initialData.nip,
          gender: initialData.gender as "MALE" | "FEMALE",
          role: initialData.role,
          department: initialData.department,
          quote: initialData.quote ?? "",
          email: initialData.email ?? "",
          instagram: initialData.instagram ?? "",
          imageUrl: initialData.imageUrl ?? "",
          isActive: initialData.isActive,
        });
      } else {
        setFormData({
          name: "",
          nip: "",
          gender: "MALE",
          role: "",
          department: "",
          quote: "",
          email: "",
          instagram: "",
          imageUrl: "",
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
        ? `/api/admin/staff/${initialData.id}`
        : "/api/admin/staff";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menyimpan data");
      }

      toast.success(
        initialData ? "Data staff diperbarui" : "Staff berhasil ditambahkan",
      );
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan sistem",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Data Staff" : "Tambah Staff Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nama Lengkap<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Contoh: Budi Santoso, S.Pd"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nip">
                NIP / ID Yayasan<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Input
                id="nip"
                value={formData.nip}
                onChange={(e) => handleChange("nip", e.target.value)}
                placeholder="Contoh: 2023001"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Jenis Kelamin<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(val) =>
                  // PERBAIKAN 4: Casting value ke tipe spesifik Enum
                  handleChange("gender", val as "MALE" | "FEMALE")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Laki-laki</SelectItem>
                  <SelectItem value="FEMALE">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                Departemen<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Select
                value={formData.department}
                onValueChange={(val) => handleChange("department", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Departemen" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">
              Jabatan / Posisi<span className="-ml-1.5 text-red-500">*</span>
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Contoh: Kepala Sekolah / Guru Matematika"
              required
            />
          </div>

          {/* --- Media & Profile --- */}
          <div className="space-y-2">
            <Label>Foto Profil</Label>
            <ImageUploader
              value={formData.imageUrl ?? ""}
              onChange={(url) => handleChange("imageUrl", url)}
            />
            <p className="text-muted-foreground text-xs">
              Disarankan rasio 3:4 atau 1:1. Jika kosong, akan menggunakan
              avatar default sesuai gender.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Kutipan / Motto (Opsional)</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => handleChange("quote", e.target.value)}
              placeholder="Kata-kata mutiara singkat..."
              rows={2}
            />
          </div>

          {/* --- Kontak --- */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email (Opsional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="nama@sekolah.sch.id"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (Opsional)</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                placeholder="@username"
              />
            </div>
          </div>

          {/* --- Status --- */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Status Aktif</Label>
              <p className="text-muted-foreground text-xs">
                Non-aktifkan untuk menyembunyikan staff ini dari halaman publik.
              </p>
            </div>
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
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Data
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
