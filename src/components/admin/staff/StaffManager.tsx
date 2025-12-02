"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Plus, Users, Search } from "lucide-react";
import type { Staff } from "~/types/staff";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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

import { StaffItem } from "./StaffItem";
import { StaffFormDialog } from "./StaffFormDialog";

export function StaffManager() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk Dialog
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  // State untuk Delete
  const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);

  // DND Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/staff");
      if (!res.ok) throw new Error("Gagal mengambil data");

      // PERBAIKAN 1: Casting explicit ke tipe Staff[] untuk menghindari 'any'
      const data = (await res.json()) as Staff[];
      setStaffList(data);
    } catch {
      // PERBAIKAN 2: Menggunakan prefix underscore (_error) untuk variabel yang tidak digunakan
      toast.error("Gagal memuat data staff");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchStaff();
  }, []);

  // --- Handlers ---

  const handleCreate = () => {
    setEditingStaff(null);
    setIsFormOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setIsFormOpen(true);
  };

  const handleDelete = (staff: Staff) => {
    setDeleteTarget(staff);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const previousList = [...staffList];
    setStaffList((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);

    try {
      const res = await fetch(`/api/admin/staff/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      toast.success("Staff berhasil dihapus");
    } catch {
      // PERBAIKAN 3: Prefix underscore untuk unused variable
      setStaffList(previousList);
      toast.error("Gagal menghapus data");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = staffList.findIndex((item) => item.id === active.id);
      const newIndex = staffList.findIndex((item) => item.id === over?.id);

      // Optimistic UI Update
      const newItems = arrayMove(staffList, oldIndex, newIndex);
      setStaffList(newItems);

      // API Call
      try {
        const payload = newItems.map((item, index) => ({
          id: item.id,
          order: index,
        }));

        await fetch("/api/admin/staff/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: payload }),
        });
        toast.success("Urutan diperbarui");
      } catch {
        // PERBAIKAN 4: Prefix underscore untuk unused variable
        toast.error("Gagal menyimpan urutan");
        void fetchStaff(); // Revert on error
      }
    }
  };

  // Filter staff berdasarkan pencarian
  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nip.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Cari nama, NIP, atau jabatan..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Staff
        </Button>
      </div>

      {/* List Content */}
      <div className="rounded-xl border bg-gray-50/50 p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-20 w-full items-center justify-between rounded-lg border bg-white p-4"
              >
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-muted-foreground flex h-60 flex-col items-center justify-center text-center">
            <Users className="mb-4 h-10 w-10 opacity-20" />
            <p>Tidak ada data staff ditemukan.</p>
            {searchQuery && (
              <Button
                variant="link"
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Bersihkan pencarian
              </Button>
            )}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredStaff.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {filteredStaff.map((staff) => (
                  <StaffItem
                    key={staff.id}
                    staff={staff}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Form Dialog */}
      <StaffFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={editingStaff}
        onSuccess={fetchStaff}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Staff?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus data{" "}
              <span className="text-foreground font-semibold">
                {deleteTarget?.name}
              </span>{" "}
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
