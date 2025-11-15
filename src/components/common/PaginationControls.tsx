"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const prevPageUrl = currentPage === 2 ? "/news" : `/news/${currentPage - 1}`;
  const nextPageUrl = `/news/${currentPage + 1}`;

  return (
    <div className="mt-12 flex items-center justify-between">
      <Button asChild variant="outline" disabled={!hasPrev}>
        <Link href={prevPageUrl}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Sebelumnya
        </Link>
      </Button>

      <span className="text-muted-foreground text-sm">
        Halaman {currentPage} dari {totalPages}
      </span>

      <Button asChild variant="outline" disabled={!hasNext}>
        <Link href={nextPageUrl}>
          Selanjutnya
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
