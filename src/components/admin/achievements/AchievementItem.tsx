"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Edit,
  Trash2,
  Trophy,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";
import type { Achievement } from "~/lib/generated/prisma/client";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { cn } from "~/lib/utils";

interface AchievementItemProps {
  achievement: Achievement;
  onDelete: (id: string) => Promise<void>; // Promise agar bisa handle loading state jika perlu
}

export function AchievementItem({
  achievement,
  onDelete,
}: AchievementItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Logika Tampilan Nama Siswa
  const renderStudentNames = () => {
    const names = achievement.studentNames;
    if (names.length === 0)
      return (
        <span className="text-muted-foreground italic">No student listed</span>
      );

    if (names.length === 1) {
      return <span className="font-medium text-gray-700">{names[0]}</span>;
    }

    return (
      <div className="flex items-center gap-1">
        <span className="font-medium text-gray-700">{names[0]}</span>
        <span className="text-muted-foreground rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">
          +{names.length - 1} lainnya
        </span>
      </div>
    );
  };

  // 2. Format Tanggal (Indonesia)
  const formattedDate = format(new Date(achievement.date), "dd MMMM yyyy", {
    locale: id,
  });

  // 3. Handle Delete dengan Loading State
  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await onDelete(achievement.id);
    } catch (error) {
      console.error("Gagal menghapus:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group flex flex-col items-start gap-4 rounded-xl border bg-white p-3 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
      {/* Thumbnail Section */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-gray-50">
        {achievement.image ? (
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={
              achievement.category === "PRESCHOOL" ? "default" : "secondary"
            }
            className={cn(
              "text-[10px] tracking-wider uppercase",
              achievement.category === "PRESCHOOL"
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-blue-600 text-white hover:bg-blue-700",
            )}
          >
            {achievement.category}
          </Badge>
          <div className="text-muted-foreground flex items-center text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            {formattedDate}
          </div>
        </div>

        <h3
          className="truncate pr-4 font-semibold text-gray-900"
          title={achievement.title}
        >
          {achievement.title}
        </h3>

        <div className="flex flex-col gap-0.5 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">
              {achievement.predicate}
            </span>
          </div>
          <div className="text-sm">
            {renderStudentNames()}
            <span className="text-muted-foreground ml-2 border-l pl-2 text-xs">
              {achievement.studentClass}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="ml-auto flex items-center gap-1 self-end sm:self-center">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          <Link href={`/admin/achievements/${achievement.id}/edit`}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Data prestasi{" "}
                <strong>{achievement.title}</strong> akan dihapus permanen dari
                database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
