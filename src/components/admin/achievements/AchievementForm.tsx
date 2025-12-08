"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Trash2, Plus, Save, Loader2 } from "lucide-react";
import type { Achievement } from "~/lib/generated/prisma/client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ImageUploader } from "~/components/ui/image-uploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// --- Schema Validasi (Zod) ---
const formSchema = z.object({
  title: z.string().min(1, "Judul prestasi wajib diisi"),
  category: z.enum(["PRESCHOOL", "PRIMARY"], {
    error: "Pilih kategori",
  }),
  date: z.string().min(1, "Tanggal wajib diisi"),
  studentNames: z
    .array(
      z.object({
        name: z.string().min(1, "Nama siswa tidak boleh kosong"),
      }),
    )
    .min(1, "Minimal satu siswa harus diisi"),
  studentClass: z.string().min(1, "Kelas wajib diisi"),
  predicate: z.string().min(1, "Predikat juara wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  image: z
    .string()
    .url("Gambar wajib diupload")
    .min(1, "Gambar wajib diupload"),
});

type FormValues = z.infer<typeof formSchema>;

interface AchievementFormProps {
  initialData?: Achievement;
}

export function AchievementForm({ initialData }: AchievementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Setup React Hook Form ---
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      category: initialData?.category ?? "PRESCHOOL",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      studentNames: initialData?.studentNames.map((name) => ({ name })) ?? [
        { name: "" },
      ],
      studentClass: initialData?.studentClass ?? "",
      predicate: initialData?.predicate ?? "",
      description: initialData?.description ?? "",
      image: initialData?.image ?? "",
    },
  });

  // --- Setup Dynamic Input (Student Names) ---
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "studentNames",
  });

  // --- Handler Submit ---
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        studentNames: values.studentNames.map((item) => item.name),
        date: new Date(values.date).toISOString(),
      };

      const url = initialData
        ? `/api/admin/achievements/${initialData.id}`
        : "/api/admin/achievements";

      const method = initialData ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || "Gagal menyimpan data");
      }

      toast.success(
        initialData
          ? "Prestasi berhasil diperbarui!"
          : "Prestasi baru berhasil ditambahkan!",
      );

      router.push("/admin/achievements");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Layout: Menggunakan container mx-auto agar Card melebar sesuai breakpoint
    <Card className="container mx-auto shadow-md">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Prestasi" : "Tambah Prestasi Baru"}
        </CardTitle>
        <CardDescription>
          Isi formulir di bawah ini untuk menampilkan prestasi siswa di website.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Group 1: Informasi Dasar */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Lomba / Prestasi</Label>
              <Input
                id="title"
                placeholder="Contoh: Juara 1 Lomba Mewarnai"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Tanggal Prestasi</Label>
              <Input type="date" id="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Kategori Sekolah</Label>
              <RadioGroup
                defaultValue={form.getValues("category")}
                onValueChange={(val) =>
                  form.setValue("category", val as "PRESCHOOL" | "PRIMARY")
                }
                className="flex gap-4"
              >
                <div className="flex h-9 w-full cursor-pointer items-center space-x-2 rounded-md border px-3 transition-colors hover:bg-gray-50">
                  <RadioGroupItem value="PRESCHOOL" id="preschool" />
                  <Label
                    htmlFor="preschool"
                    className="cursor-pointer font-normal"
                  >
                    Preschool
                  </Label>
                </div>
                <div className="flex h-9 w-full cursor-pointer items-center space-x-2 rounded-md border px-3 transition-colors hover:bg-gray-50">
                  <RadioGroupItem value="PRIMARY" id="primary" />
                  <Label
                    htmlFor="primary"
                    className="cursor-pointer font-normal"
                  >
                    Primary
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Group 3: Input Dinamis Nama Siswa */}
          <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-gray-700">
                Daftar Siswa / Tim
              </Label>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={`Nama Siswa ${index + 1}`}
                      {...form.register(`studentNames.${index}.name`)}
                    />
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "" })}
              className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Nama Siswa
            </Button>

            {form.formState.errors.studentNames && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.studentNames.root?.message ??
                  "Nama siswa wajib diisi"}
              </p>
            )}
          </div>

          {/* Group 4: Detail Tambahan */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="studentClass">Kelas / Grade</Label>
              <Input
                id="studentClass"
                placeholder="Contoh: B1 - Umar atau Grade 1 & 2"
                {...form.register("studentClass")}
              />
              {form.formState.errors.studentClass && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.studentClass.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="predicate">Predikat / Juara</Label>
              <Input
                id="predicate"
                placeholder="Contoh: Juara 1, Gold Medal, Harapan 2"
                {...form.register("predicate")}
              />
              {form.formState.errors.predicate && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.predicate.message}
                </p>
              )}
            </div>
          </div>

          {/* Group 5: Gambar Utama */}
          <div className="space-y-2">
            <Label>Foto Dokumentasi</Label>
            <div className="max-w-md">
              <ImageUploader
                value={form.watch("image")}
                onChange={(url) =>
                  form.setValue("image", url, { shouldValidate: true })
                }
              />
            </div>
            {form.formState.errors.image && (
              <p className="text-sm text-red-500">
                {form.formState.errors.image.message}
              </p>
            )}
          </div>

          {/* Group 6: Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Deskripsi Artikel
              <span className="text-muted-foreground ml-2 text-xs font-normal">
                (Tekan Enter untuk membuat paragraf baru)
              </span>
            </Label>
            <Textarea
              id="description"
              className="min-h-[200px] leading-relaxed"
              placeholder="Tuliskan cerita lengkap tentang prestasi ini..."
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Simpan Prestasi
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
