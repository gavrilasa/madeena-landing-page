// src/app/admin/news/[slug]/edit/page.tsx

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { NewsArticleForm } from "~/components/admin/news/NewsArticleForm"; // Asumsi path ini benar
import { db } from "~/server/db";
import { notFound } from "next/navigation";

// Tipe data yang diharapkan oleh <NewsArticleForm initialData={...}>
// Ini harus cocok dengan tipe 'NewsArticle' yang didefinisikan di dalam NewsArticleForm.tsx
type FormInitialData = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  content: unknown; // Tipe 'unknown' akan menerima 'JsonValue' dari Prisma
  status: string;
  publishedAt: string | null; // Tipe 'string' karena akan diserialisasi
  createdAt: string; // Tipe 'string' karena akan diserialisasi
  updatedAt: string; // Tipe 'string' karena akan diserialisasi
};

// Tipe untuk parameter halaman
interface EditNewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const { slug } = await params;

  // 1. Ambil data artikel dari database
  const article = await db.newsArticle.findUnique({
    where: { slug: slug },
  });

  // 2. Jika tidak ada artikel, tampilkan halaman 404
  if (!article) {
    notFound();
  }

  // 3. Serialisasi data agar aman dikirim dari Server Component ke Client Component.
  // Ini mengubah Date -> string dan memastikan 'content' diperlakukan sebagai 'unknown'.
  // Ini penting karena props Client Component harus serializable.
  const serializableArticle: FormInitialData = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    summary: article.summary,
    featuredImage: article.featuredImage,
    content: article.content as unknown, // Prisma 'JsonValue' aman di-cast ke 'unknown'
    status: article.status,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Navigasi Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/news">Berita</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Render Komponen Formulir dengan data awal yang sudah diserialisasi */}
      <NewsArticleForm initialData={serializableArticle} />
    </div>
  );
}
