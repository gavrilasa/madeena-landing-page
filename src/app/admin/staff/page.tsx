import type { Metadata } from "next";
import { StaffManager } from "~/components/admin/staff/StaffManager";

export const metadata: Metadata = {
  title: "Manajemen Staff - Admin Panel",
  description: "Kelola data guru dan karyawan sekolah.",
};

export default function AdminStaffPage() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Manajemen Guru & Staff
        </h1>
        <p className="text-muted-foreground text-md">
          Atur daftar guru, posisi, dan urutan tampilan di halaman profil.
        </p>
      </div>

      <StaffManager />
    </div>
  );
}
