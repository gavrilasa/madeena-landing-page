"use client"; // Keep client directive if using context/hooks

import { SidebarTrigger } from "~/components/ui/sidebar"; // Adjust path

export function AdminHeader() {
  return (
    <header className="bg-card sticky top-0 z-50 flex h-[55px] items-center justify-between gap-6 border-b px-4 py-2 sm:px-6">
      {/* 55px matches h-13.75 */}
      <SidebarTrigger className="[&_svg]:!size-5" />
      {/* Add other header elements here if needed (e.g., User menu, Notifications) */}
    </header>
  );
}
