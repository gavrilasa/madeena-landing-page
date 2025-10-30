"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  AlertTriangle,
  Newspaper,
} from "lucide-react";

// Impor komponen UI dari ShadCN
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Skeleton } from "~/components/ui/skeleton";

// Definisikan tipe data yang sesuai dengan model Prisma NewsArticle
interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null; // Datetime akan menjadi string saat di-fetch
  createdAt: string;
  updatedAt: string;
}

/**
 * Komponen untuk menampilkan baris-baris skeleton saat loading
 */
function LoadingSkeletons() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

/**
 * Komponen utama untuk dasbor berita
 */
export default function NewsDashboardPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fungsi untuk mengambil data artikel
  async function loadArticles() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/news");
      if (!response.ok) {
        throw new Error("Gagal mengambil data artikel.");
      }
      const data = (await response.json()) as NewsArticle[];
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  }

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    void loadArticles();
  }, []);

  // Fungsi untuk menangani penghapusan artikel
  const handleDelete = (slug: string, title: string) => {
    toast.error(`Anda yakin ingin menghapus "${title}"?`, {
      action: {
        label: "Hapus",
        onClick: () => deleteArticle(slug),
      },
      cancel: {
        label: "Batal",
      },
    });
  };

  async function deleteArticle(slug: string) {
    const promise = fetch(`/api/admin/news/${slug}`, {
      method: "DELETE",
    });

    toast.promise(promise, {
      loading: "Menghapus artikel...",
      success: (res) => {
        if (!res.ok) {
          throw new Error("Gagal menghapus artikel.");
        }
        // Hapus artikel dari state secara optimis
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
        return "Artikel berhasil dihapus.";
      },
      error: "Gagal menghapus artikel.",
    });
  }

  // Fungsi untuk merender konten utama
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeletons />;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (articles.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <Newspaper className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            Belum Ada Berita
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Mulai buat artikel berita pertama Anda.
          </p>
          <Button asChild className="mt-6">
            <Link href="/admin/news/create">
              <Plus className="mr-2 h-4 w-4" />
              Buat Berita Baru
            </Link>
          </Button>
        </div>
      );
    }

    // Jika ada data, tampilkan tabel
    return (
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="rounded-lg border">
              {/* Tabel Kustom */}
              <div className="min-w-full divide-y divide-gray-200">
                {/* Header Tabel */}
                <div className="grid grid-cols-10 bg-gray-50">
                  <div className="col-span-4 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Judul
                  </div>
                  <div className="col-span-2 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </div>
                  <div className="col-span-3 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Tanggal Publikasi
                  </div>
                  <div className="col-span-1 px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Aksi
                  </div>
                </div>
                {/* Body Tabel */}
                <div className="divide-y divide-gray-200 bg-white">
                  {articles.map((article) => (
                    <div key={article.id} className="grid grid-cols-10">
                      <div className="col-span-4 px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        {article.title}
                      </div>
                      <div className="col-span-2 px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            article.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>
                      <div className="col-span-3 px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="col-span-1 px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Opsi</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() =>
                                router.push(`/admin/news/${article.slug}/edit`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:bg-red-50 focus:text-red-600"
                              onSelect={() =>
                                handleDelete(article.slug, article.title)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Dasbor Berita</CardTitle>
          <CardDescription>
            Buat, edit, dan kelola semua artikel berita di sini.
          </CardDescription>
        </div>
        <Button asChild>
          <Link href="/admin/news/create">
            <Plus className="mr-2 h-4 w-4" />
            Buat Berita Baru
          </Link>
        </Button>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
