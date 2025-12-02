"use client";

import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Edit, Trash2, User, UserCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { Staff } from "~/types/staff";

interface StaffItemProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
}

export function StaffItem({ staff, onEdit, onDelete }: StaffItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: staff.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  // Logic Placeholder Avatar
  const renderAvatar = () => {
    if (staff.imageUrl) {
      return (
        <Image
          src={staff.imageUrl}
          alt={staff.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      );
    }
    // Jika tidak ada foto, tampilkan icon berdasarkan gender
    return (
      <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
        {staff.gender === "FEMALE" ? (
          <UserCircle className="h-6 w-6" />
        ) : (
          <User className="h-6 w-6" />
        )}
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow-md",
        isDragging && "ring-primary ring-2",
      )}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover:bg-muted cursor-grab rounded p-1.5 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-gray-50">
          {renderAvatar()}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{staff.name}</span>
            {!staff.isActive && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                Non-Aktif
              </Badge>
            )}
          </div>
          <div className="text-muted-foreground text-xs">
            <span className="font-mono">{staff.nip}</span> • {staff.role}
          </div>
          <div className="text-primary mt-0.5 text-[10px] font-medium tracking-wider uppercase">
            {staff.department.replace("_", " ")}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(staff)}
          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(staff)}
          className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
