import type { Metadata } from "next";
import { AchievementForm } from "~/components/admin/achievements/AchievementForm";

export const metadata: Metadata = {
  title: "Tambah Prestasi Baru | Admin Panel",
};

export default function CreateAchievementPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Tambah Prestasi
        </h1>
        <p className="text-muted-foreground text-sm">
          Buat data prestasi baru untuk ditampilkan di halaman publik.
        </p>
      </div>

      <AchievementForm />
    </div>
  );
}
