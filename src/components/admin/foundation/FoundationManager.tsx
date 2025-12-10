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
import type { FoundationMember } from "~/types/foundation";
import { FoundationFormDialog } from "./FoundationFormDialog";
// Reuse StaffItem or create FoundationItem if layout differs significantly.
// For now, we reuse StaffItem but adapt props or make a simpler one.
// Let's create a local Item to be safe/clean.
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";

// Local Foundation Item Component
function FoundationItem({
  member,
  onEdit,
  onDelete,
}: {
  member: FoundationMember;
  onEdit: (m: FoundationMember) => void;
  onDelete: (m: FoundationMember) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 rounded-lg border bg-white p-3 shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-muted-foreground cursor-grab hover:text-gray-900"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <Avatar className="h-10 w-10">
        <AvatarImage src={member.imageUrl ?? ""} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{member.name}</h4>
          {!member.isActive && (
            <Badge variant="secondary" className="text-xs">
              Non-aktif
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm">{member.role}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => onEdit(member)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(member)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function FoundationManager() {
  const [list, setList] = useState<FoundationMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoundationMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FoundationMember | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/foundation");
      if (!res.ok) throw new Error();

      const data = (await res.json()) as FoundationMember[];

      setList(data);
    } catch {
      toast.error("Gagal memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = list.findIndex((item) => item.id === active.id);
      const newIndex = list.findIndex((item) => item.id === over?.id);
      const newItems = arrayMove(list, oldIndex, newIndex);
      setList(newItems);

      try {
        await fetch("/api/admin/foundation/reorder", {
          method: "PUT",
          body: JSON.stringify({
            items: newItems.map((item, index) => ({
              id: item.id,
              order: index,
            })),
          }),
        });
        toast.success("Urutan diperbarui");
      } catch {
        toast.error("Gagal menyimpan urutan");
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/admin/foundation/${deleteTarget.id}`, {
        method: "DELETE",
      });
      setList((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal menghapus");
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = list.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Cari nama atau jabatan..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Anggota
        </Button>
      </div>

      <div className="rounded-xl border bg-gray-50/50 p-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center text-gray-500">
            <Users className="mb-2 h-8 w-8 opacity-20" />
            <p>Tidak ada data.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filtered.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {filtered.map((member) => (
                  <FoundationItem
                    key={member.id}
                    member={member}
                    onEdit={(m) => {
                      setEditingItem(m);
                      setIsFormOpen(true);
                    }}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <FoundationFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={editingItem}
        onSuccess={fetchData}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini permanen. {deleteTarget?.name} akan dihapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
