// src/components/admin/news/NewsArticleForm.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { AlertTriangle, Loader2 } from "lucide-react";

// Impor komponen UI
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldContent,
} from "~/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { ImageUploader } from "~/components/ui/image-uploader";
// FIX 1: Mengubah path import menjadi relatif sesuai permintaan
import { TiptapEditor } from "./TipTapEditor";

// --- Skema & Tipe ---

// Tipe data berdasarkan Prisma, untuk props
// (content disimpan sebagai 'unknown' karena berasal dari JSON)
interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  content: unknown;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Skema Zod yang lebih aman untuk Tiptap node
// Mendefinisikan bentuk dasar node untuk menghindari 'any'
const tiptapNodeSchema = z
  .object({
    type: z.string().optional(),
    content: z.array(z.any()).optional(), // z.any() diperlukan untuk struktur rekursif
  })
  .passthrough(); // Izinkan properti lain (seperti attrs, marks, dll.)

// Skema validasi Zod (sesuai dengan API)
const newsArticleSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  slug: z.string().min(1, "Slug tidak boleh kosong"),
  summary: z.string().min(1, "Ringkasan tidak boleh kosong"),
  featuredImage: z.string().url("URL gambar sampul tidak valid"),
  content: z
    .object({
      type: z.string(),
      content: z.array(tiptapNodeSchema), // Menggunakan skema node yang lebih aman
    })
    .refine(
      (val) => {
        // Logika refine yang lebih aman, memeriksa properti yang ada
        if (val.content.length === 0) return false;
        const firstNode = val.content[0];
        if (!firstNode) return false;
        // Periksa apakah node pertama memiliki konten (misal, teks dalam paragraf)
        // ATAU apakah node pertama itu sendiri adalah gambar
        return (
          (firstNode.content && firstNode.content.length > 0) ??
          firstNode.type === "image"
        );
      },
      {
        message: "Konten tidak boleh kosong",
      },
    ),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type FormData = z.infer<typeof newsArticleSchema>;
type FormErrors = z.ZodError<FormData> | null;

// --- Helper ---

// Fungsi untuk membuat slug
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w-]+/g, "") // Hapus karakter non-alfanumerik
    .replace(/--+/g, "-"); // Ganti -- ganda dengan -
};

// --- Komponen Utama ---

export function NewsArticleForm({
  initialData,
}: {
  initialData?: NewsArticle;
}) {
  const router = useRouter();
  const isEditing = !!initialData;

  // State untuk form
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    summary: initialData?.summary ?? "",
    featuredImage: initialData?.featuredImage ?? "",
    // Memberikan nilai default yang valid sesuai skema Zod
    // FIX: Mengganti any[] dengan unknown[] untuk type assertion yang lebih aman
    content: (initialData?.content as { type: string; content: unknown[] }) ?? {
      type: "doc",
      content: [],
    },
    status: (initialData?.status as "DRAFT" | "PUBLISHED") ?? "DRAFT",
  });

  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEditing);
  const [errors, setErrors] = useState<FormErrors>(null);

  // Efek untuk auto-slugging
  useEffect(() => {
    if (!isSlugManuallyEdited) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [formData.title, isSlugManuallyEdited]);

  // Handler untuk submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);

    // 1. Validasi Sisi Klien
    const validation = newsArticleSchema.safeParse(formData);
    if (!validation.success) {
      setErrors(validation.error);
      toast.error("Validasi gagal. Periksa kembali data Anda.");
      return;
    }

    setIsLoading(true);

    // 2. Tentukan Endpoint dan Method
    const endpoint = isEditing
      ? `/api/admin/news/${initialData.slug}`
      : "/api/admin/news";
    const method = isEditing ? "PATCH" : "POST";

    // 3. Kirim ke API
    const promise = fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data), // Kirim data yang sudah divalidasi
    });

    // 4. Tampilkan Toast Promise
    toast.promise(promise, {
      loading: isEditing ? "Menyimpan perubahan..." : "Membuat artikel...",
      success: async (res) => {
        if (!res.ok) {
          const errorData = (await res.json()) as { error: string };
          throw new Error(errorData.error || "Gagal menyimpan artikel.");
        }
        router.push("/admin/news"); // Redirect ke halaman daftar
        router.refresh(); // Pemicu refresh data di server component
        return `Artikel "${validation.data.title}" berhasil disimpan.`;
      },
      error: (err) => {
        setIsLoading(false);
        // Tampilkan pesan error spesifik dari API (misal: slug duplikat)
        return err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak diketahui.";
      },
      finally: () => {
        // Hanya set isLoading(false) jika tidak error,
        // karena jika sukses, kita akan di-redirect.
        // Jika error, kita set false agar tombol bisa diklik lagi.
      },
    });
  };

  // Helper untuk update state form
  const handleChange = (field: keyof FormData, value: string | object) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Jika field slug diedit, kunci auto-slug
    if (field === "slug") {
      setIsSlugManuallyEdited(true);
    }
  };

  // Helper untuk mendapatkan pesan error untuk field tertentu
  const getError = (field: keyof FormData) => {
    return errors?.flatten().fieldErrors[field]?.[0];
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Artikel Berita" : "Buat Artikel Berita Baru"}
          </CardTitle>
          <CardDescription>
            Isi detail di bawah ini untuk artikel Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Tampilkan error API (misal: slug duplikat) */}
          {errors && !errors.errors.length && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errors.message || "Terjadi kesalahan server."}
              </AlertDescription>
            </Alert>
          )}

          {/* PERUBAHAN DI SINI: Menghapus grid dan div kolom, 
              semua Field sekarang menjadi turunan langsung dari FieldGroup */}
          <FieldGroup className="flex flex-col gap-6">
            {/* --- Bagian Metadata --- */}
            <Field>
              <FieldLabel htmlFor="title">Judul Artikel</FieldLabel>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                aria-invalid={!!getError("title")}
              />
              {getError("title") && (
                <p className="text-destructive text-sm">{getError("title")}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="slug">Slug (URL)</FieldLabel>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                aria-invalid={!!getError("slug")}
              />
              {getError("slug") && (
                <p className="text-destructive text-sm">{getError("slug")}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="summary">Ringkasan</FieldLabel>
              <Textarea
                id="summary"
                value={formData.summary}
                // FIX: Mengganti e.g.target.value menjadi e.target.value
                onChange={(e) => handleChange("summary", e.target.value)}
                rows={4}
                aria-invalid={!!getError("summary")}
              />
              {getError("summary") && (
                <p className="text-destructive text-sm">
                  {getError("summary")}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <RadioGroup
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
                className="gap-2"
              >
                <Field>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DRAFT" id="draft" />
                    <Label htmlFor="draft" className="font-normal">
                      Draft
                    </Label>
                  </div>
                </Field>
                <Field>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PUBLISHED" id="published" />
                    <Label htmlFor="published" className="font-normal">
                      Published
                    </Label>
                  </div>
                </Field>
              </RadioGroup>
            </Field>

            {/* --- Bagian Konten --- */}
            <Field>
              <FieldLabel>Gambar Sampul</FieldLabel>
              <ImageUploader
                value={formData.featuredImage}
                onChange={(url) => handleChange("featuredImage", url)}
              />
              {getError("featuredImage") && (
                <p className="text-destructive text-sm">
                  {getError("featuredImage")}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Konten Utama</FieldLabel>
              <FieldContent>
                <TiptapEditor
                  // Kirim sebagai string JSON
                  value={JSON.stringify(formData.content)}
                  onChange={(jsonValue) => handleChange("content", jsonValue)}
                  placeholder="Tulis artikel lengkap di sini..."
                />
                {getError("content") && (
                  <p className="text-destructive text-sm">
                    {getError("content")}
                  </p>
                )}
              </FieldContent>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="ml-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing
              ? isLoading
                ? "Menyimpan..."
                : "Simpan Perubahan"
              : isLoading
                ? "Menerbitkan..."
                : "Terbitkan Artikel"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
