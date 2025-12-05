"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Achievement } from "~/lib/generated/prisma/client";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { AchievementItem } from "~/components/admin/achievements/AchievementItem";
import { Suspense } from "react";

function AchievementsContent() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const searchParams = useSearchParams();
  const router = useRouter();

  // --- 1. Fetch Data Logic ---
  const fetchAchievements = async (category?: string, query?: string) => {
    setIsLoading(true);
    try {
      // Bangun URL dengan parameter query
      const params = new URLSearchParams();
      if (category && category !== "all") params.append("category", category);
      if (query) params.append("q", query);

      const res = await fetch(`/api/admin/achievements?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data");

      const data = (await res.json()) as Achievement[];
      setAchievements(data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data prestasi");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. Effect untuk Sinkronisasi URL dan Fetching ---
  useEffect(() => {
    const category = searchParams.get("category") ?? "all";
    const q = searchParams.get("q") ?? "";

    setActiveTab(category);
    setSearchQuery(q);

    // Fetch data saat parameter URL berubah
    void fetchAchievements(category, q);
  }, [searchParams]);

  // --- 3. Handlers ---
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      params.delete("category");
    } else {
      params.set("category", tab);
    }
    // Reset ke halaman 1 jika ada pagination (opsional nanti)
    router.push(`/admin/achievements?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    router.push(`/admin/achievements?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/achievements/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus");

      toast.success("Prestasi berhasil dihapus");
      // Refresh data lokal tanpa fetch ulang seluruhnya agar lebih cepat
      setAchievements((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Manajemen Prestasi
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Kelola data prestasi dan penghargaan siswa Preschool & Primary.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/admin/achievements/create">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Prestasi
          </Link>
        </Button>
      </div>

      <Card className="gap-4">
        <CardHeader className="px-3 pb-0">
          {/* Toolbar: Tabs & Search */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Filter Tabs */}
            <div className="flex w-full rounded-lg bg-gray-100 p-1 md:w-auto">
              {["all", "preschool", "primary"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-all md:flex-none ${
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  } `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <form
              onSubmit={handleSearch}
              className="relative w-full md:max-w-xs"
            >
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari judul..."
                className="border-gray-200 bg-gray-50 pl-9 transition-colors focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Loader2 className="mb-2 h-8 w-8 animate-spin" />
              <p className="text-sm">Memuat data...</p>
            </div>
          ) : achievements.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-16 text-center">
              <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
                <Search className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Belum ada data
              </h3>
              <p className="text-muted-foreground mt-1 max-w-sm text-sm">
                {searchQuery
                  ? `Tidak ditemukan prestasi dengan kata kunci "${searchQuery}"`
                  : "Belum ada prestasi yang ditambahkan. Mulai dengan menambahkan prestasi baru."}
              </p>
              {!searchQuery && (
                <Button variant="link" asChild className="mt-2">
                  <Link href="/admin/achievements/create">
                    Tambah Data Sekarang
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement) => (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <AchievementsContent />
    </Suspense>
  );
}
