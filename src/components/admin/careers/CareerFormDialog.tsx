"use client";

import { useEffect, useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

// Ganti Switch dengan Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Import komponen hasil pemisahan
import { CreatableCombobox } from "~/components/ui/creatable-combobox";
import { CareerRequirements } from "~/components/admin/careers/CareerRequirements";
import {
  careerFormSchema,
  type CareerFormValues,
} from "~/lib/schemas/careerSchema";
import type { Career } from "~/types/career";

interface CareerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  careerToEdit?: Career;
  onSuccess: () => void;
}

export function CareerFormDialog({
  open,
  onOpenChange,
  careerToEdit,
  onSuccess,
}: CareerFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingData, setExistingData] = useState<{
    departments: string[];
    types: string[];
  }>({ departments: [], types: [] });

  // Inisialisasi Form dengan Schema dari file terpisah
  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      title: "",
      department: "",
      type: "",
      location: "Cirebon",
      description: "",
      requirements: [{ value: "" }],
      status: "DRAFT",
    },
  });

  // Effect: Reset form saat dialog dibuka atau data edit berubah
  useEffect(() => {
    if (open) {
      if (careerToEdit) {
        form.reset({
          title: careerToEdit.title,
          department: careerToEdit.department,
          type: careerToEdit.type,
          location: careerToEdit.location,
          description: careerToEdit.description,
          requirements: careerToEdit.requirements.length
            ? careerToEdit.requirements.map((r) => ({ value: r }))
            : [{ value: "" }],
          status: careerToEdit.status as "DRAFT" | "PUBLISHED",
        });
      } else {
        form.reset({
          title: "",
          department: "",
          type: "",
          location: "Cirebon",
          description: "",
          requirements: [{ value: "" }],
          status: "DRAFT",
        });
      }

      // Fetch opsi departemen & tipe yang sudah ada
      const fetchOptions = async () => {
        try {
          const res = await fetch("/api/admin/careers");
          if (res.ok) {
            const data = (await res.json()) as Career[];
            const uniqueDepts = Array.from(
              new Set(data.map((c) => c.department)),
            ).filter(Boolean);
            const uniqueTypes = Array.from(
              new Set(data.map((c) => c.type)),
            ).filter(Boolean);
            setExistingData({
              departments: uniqueDepts,
              types: uniqueTypes,
            });
          }
        } catch {
          // Ignore error silently
        }
      };
      void fetchOptions();
    }
  }, [open, careerToEdit, form]);

  const onSubmit = async (values: CareerFormValues) => {
    setIsSubmitting(true);
    try {
      // Bersihkan requirements dari string kosong
      const cleanRequirements = values.requirements
        .map((r) => r.value)
        .filter((r) => r.trim() !== "");

      if (cleanRequirements.length === 0) {
        form.setError("requirements", {
          message: "Minimal harus ada satu persyaratan yang diisi",
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...values,
        requirements: cleanRequirements,
      };

      const url = careerToEdit
        ? `/api/admin/careers/${careerToEdit.id}`
        : "/api/admin/careers";
      const method = careerToEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = (await res.json()) as { error?: string };
        throw new Error(errorData.error ?? "Gagal menyimpan data");
      }

      toast.success(careerToEdit ? "Lowongan diperbarui" : "Lowongan dibuat");
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan sistem",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {careerToEdit ? "Edit Lowongan" : "Tambah Lowongan Baru"}
          </DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk {careerToEdit ? "mengubah" : "membuat"}{" "}
            lowongan pekerjaan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Judul: Mengambil 2 kolom */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Posisi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Guru Matematika"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CareerFormValues, "status">;
                }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="department"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CareerFormValues, "department">;
                }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Departemen</FormLabel>
                    <FormControl>
                      <CreatableCombobox
                        value={field.value}
                        onChange={field.onChange}
                        options={existingData.departments}
                        label="Departemen"
                        placeholder="Pilih Departemen"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Pilih yang ada atau buat baru.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CareerFormValues, "type">;
                }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tipe Pekerjaan</FormLabel>
                    <FormControl>
                      <CreatableCombobox
                        value={field.value}
                        onChange={field.onChange}
                        options={existingData.types}
                        label="Tipe"
                        placeholder="Pilih Tipe"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Pilih yang ada atau buat baru.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Pekerjaan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Jelaskan tanggung jawab utama..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bagian Requirements (Dynamic Fields) */}
            <CareerRequirements />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {careerToEdit ? "Simpan Perubahan" : "Buat Lowongan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
