import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { AchievementForm } from "~/components/admin/achievements/AchievementForm";

export const metadata: Metadata = {
  title: "Edit Prestasi | Admin Panel",
};

interface EditAchievementPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAchievementPage({
  params,
}: EditAchievementPageProps) {
  // 1. Akses Parameter URL (Next.js 15 mengharuskan await params)
  const { id } = await params;

  // 2. Fetching Data Langsung dari Database (Server-Side)
  // Jauh lebih cepat daripada fetch('/api/...') karena tanpa overhead HTTP
  const achievement = await db.achievement.findUnique({
    where: { id },
  });

  // 3. Penanganan Error 404
  if (!achievement) {
    notFound(); // Akan otomatis merender halaman not-found.tsx
  }

  // 4. Render Halaman
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Edit Prestasi
        </h1>
        <p className="text-muted-foreground text-sm">
          Perbarui informasi prestasi atau penghargaan siswa.
        </p>
      </div>

      {/* Oper data ke form melalui prop initialData */}
      <AchievementForm initialData={achievement} />
    </div>
  );
}
