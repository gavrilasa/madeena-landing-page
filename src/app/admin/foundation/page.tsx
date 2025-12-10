import { FoundationManager } from "~/components/admin/foundation/FoundationManager";

export default function AdminFoundationPage() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
            Dewan Yayasan
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola struktur organisasi dan anggota dewan yayasan.
        </p>
      </div>
      <FoundationManager />
    </div>
  );
}