"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, MapPin, Briefcase, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { toast } from "sonner";
import type { Career } from "~/types/career";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

// Import komponen dialog dan delete button
import { CareerFormDialog } from "~/components/admin/careers/CareerFormDialog";
import { DeleteCareerButton } from "~/components/admin/careers/DeleteCareerButton";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | undefined>(
    undefined,
  );

  const fetchCareers = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = searchQuery
        ? `/api/admin/careers?q=${encodeURIComponent(searchQuery)}`
        : "/api/admin/careers";

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = (await res.json()) as Career[];
      setCareers(data);
    } catch {
      toast.error("Gagal memuat data lowongan");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchCareers();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [fetchCareers]);

  const handleEdit = (career: Career) => {
    setSelectedCareer(career);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedCareer(undefined);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    void fetchCareers();
    // Toast sukses sudah ditangani di dalam CareerFormDialog
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Karir & Lowongan
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Kelola lowongan pekerjaan yang tersedia di sekolah.
          </p>
        </div>
      </div>

      <Card className="gap-4">
        <CardHeader className="px-3 pb-0">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Left Side Placeholder */}
            <div className="w-full md:w-auto"></div>

            {/* Right Side: Search + Add Button */}
            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  placeholder="Cari posisi..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} className="shrink-0">
                <Plus className="mr-2 h-4 w-4" />
                <span className="md:hidden lg:inline">Tambah Lowongan</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-3 rounded-xl border p-6"
                >
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))
            ) : careers.length === 0 ? (
              <div className="text-muted-foreground col-span-full py-12 text-center">
                Tidak ada lowongan ditemukan.
              </div>
            ) : (
              careers.map((career) => (
                <div
                  key={career.id}
                  className="group bg-card relative flex flex-col justify-between rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="leading-none font-semibold tracking-tight">
                          {career.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {career.department}
                        </p>
                      </div>
                      <Badge
                        variant={
                          career.status === "PUBLISHED"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {career.status === "PUBLISHED" ? "Published" : "Draft"}
                      </Badge>
                    </div>

                    <div className="text-muted-foreground space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{career.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{career.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(new Date(career.createdAt), "d MMMM yyyy", {
                            locale: idLocale,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="text-muted-foreground/80 line-clamp-3 text-sm">
                      {career.description}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-6 flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="flex-1" // Menggunakan flex-1 agar tombol edit mengambil sisa ruang
                      onClick={() => handleEdit(career)}
                    >
                      Edit Detail
                    </Button>

                    {/* Tombol Hapus Terintegrasi */}
                    <DeleteCareerButton
                      careerId={career.id}
                      careerTitle={career.title}
                      onSuccess={() => void fetchCareers()} // Refresh list setelah hapus sukses
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <CareerFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        careerToEdit={selectedCareer}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
