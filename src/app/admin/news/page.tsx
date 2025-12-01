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
  Filter,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Skeleton } from "~/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import type { NewsArticle } from "~/types/news";

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

export default function NewsDashboardPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PUBLISHED" | "DRAFT"
  >("ALL");

  const [articleToDelete, setArticleToDelete] = useState<{
    slug: string;
    title: string;
  } | null>(null);

  const router = useRouter();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  useEffect(() => {
    void loadArticles();
  }, []);

  async function executeDelete() {
    if (!articleToDelete) return;

    const { slug } = articleToDelete;

    setArticleToDelete(null);

    const promise = fetch(`/api/admin/news/${slug}`, {
      method: "DELETE",
    });

    toast.promise(promise, {
      loading: "Menghapus artikel...",
      success: (res) => {
        if (!res.ok) {
          throw new Error("Gagal menghapus artikel.");
        }
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
        return "Artikel berhasil dihapus.";
      },
      error: "Gagal menghapus artikel.",
    });
  }

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

    const filteredArticles = articles.filter((article) => {
      if (statusFilter === "ALL") return true;
      return article.status === statusFilter;
    });

    if (filteredArticles.length === 0 && articles.length > 0) {
      return (
        <div className="flex h-40 flex-col items-center justify-center text-center">
          <p className="text-muted-foreground text-sm">
            Tidak ditemukan artikel dengan status{" "}
            <span className="font-semibold text-gray-900">
              {statusFilter === "PUBLISHED" ? "Published" : "Draft"}
            </span>
            .
          </p>
          <Button
            variant="link"
            onClick={() => setStatusFilter("ALL")}
            className="text-primary mt-2"
          >
            Tampilkan Semua Artikel
          </Button>
        </div>
      );
    }

    return (
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="rounded-lg border">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="grid grid-cols-10 bg-gray-50">
                  <div className="col-span-6 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Judul
                  </div>
                  <div className="col-span-1 px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </div>
                  <div className="col-span-2 px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Tanggal Publikasi
                  </div>
                  <div className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Aksi
                  </div>
                </div>
                <div className="divide-y divide-gray-200 bg-white">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="grid grid-cols-10">
                      <div className="col-span-6 flex w-full min-w-0 items-center px-6 py-2 text-sm font-medium text-gray-900">
                        <span className="min-w-0 flex-1 truncate">
                          {article.title}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center justify-center px-6 text-sm whitespace-nowrap text-gray-500">
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
                      <div className="col-span-2 flex items-center justify-center px-6 py-2 text-center text-sm whitespace-nowrap text-gray-500">
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="px-6 py-2 text-right text-sm font-medium whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            className="cursor-pointer"
                          >
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
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive cursor-pointer focus:bg-red-50"
                              onSelect={() =>
                                setArticleToDelete({
                                  slug: article.slug,
                                  title: article.title,
                                })
                              }
                            >
                              <Trash2 className="text-destructive mr-2 h-4 w-4" />
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
    <div className="container mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Manajemen Berita
        </h1>
        <p className="text-muted-foreground text-md">
          Buat, edit, dan kelola semua artikel berita di sini.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 border-dashed"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Status:</span>
                  <span className="font-semibold">
                    {statusFilter === "ALL"
                      ? "Semua"
                      : statusFilter === "PUBLISHED"
                        ? "Published"
                        : "Draft"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "ALL"}
                  onCheckedChange={() => setStatusFilter("ALL")}
                  className="cursor-pointer"
                >
                  Semua
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "PUBLISHED"}
                  onCheckedChange={() => setStatusFilter("PUBLISHED")}
                  className="cursor-pointer"
                >
                  Published
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "DRAFT"}
                  onCheckedChange={() => setStatusFilter("DRAFT")}
                  className="cursor-pointer"
                >
                  Draft
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button asChild className="cursor-pointer">
            <Link href="/admin/news/create">
              <Plus className="mr-2 h-4 w-4" />
              Buat Berita Baru
            </Link>
          </Button>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>

      <AlertDialog
        open={!!articleToDelete}
        onOpenChange={(open) => {
          if (!open) setArticleToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Artikel &quot;
              <span className="text-foreground font-semibold">
                {articleToDelete?.title}
              </span>
              &quot; akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void executeDelete()}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
