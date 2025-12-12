// src/components/common/MobileNav.tsx
"use client";

import * as React from "react";
// Import semua icon yang mungkin digunakan dari lucide-react
import * as LucideIcons from "lucide-react";
import { cn } from "~/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "~/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import Image from "next/image";

// Tipe Icon dari Lucide
type LucideIconType = React.ElementType;

function ItemIcon({ name }: { name?: string }) {
  // Ambil icon dari LucideIcons berdasarkan string name
  const Icon = (name && (LucideIcons as any)[name] ? (LucideIcons as any)[name] : LucideIcons.Info) as LucideIconType;
  return (
    <span className="mr-3 inline-flex size-8 flex-none items-center justify-center rounded-lg bg-neutral-100 ring-1 ring-neutral-200 ring-inset">
      <Icon className="size-4 text-neutral-700" aria-hidden="true" />
    </span>
  );
}

// Icon kecil untuk submenu
function SubItemIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = ((LucideIcons as any)[name] ? (LucideIcons as any)[name] : LucideIcons.Circle) as LucideIconType;
  return <Icon className="mr-3 size-4 text-neutral-500" aria-hidden="true" />;
}

export interface NavigationItem {
  href?: string;
  label: string;
  active?: boolean;
  submenu?: boolean;
  type?: "description" | "simple" | "icon";
  items?: Array<{ href: string; label: string; description?: string; icon?: string }>;
  iconName?: string;
}

export function MobileNav({
  links,
  ctaHref = "https://wa.me/6282119222822",
  ctaLabel = "Daftar Sekarang",
  isScrolled,
}: {
  links: NavigationItem[];
  ctaHref?: string;
  ctaLabel?: string;
  isScrolled: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Buka menu"
          className={cn(
            "lg:hidden",
            isScrolled
              ? "text-gray-800 hover:bg-gray-100"
              : "text-white hover:bg-white/10 lg:hidden",
          )}
        >
          <LucideIcons.Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "flex h-full w-screen max-w-none flex-col border-l border-neutral-200 bg-white p-0 px-1 text-neutral-900 sm:max-w-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        )}
      >
        <SheetTitle className="sr-only">Al Madeena</SheetTitle>

        <div className="z-10 flex flex-none items-center justify-between border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur">
          <Image
            src={"/web-app-manifest-192x192.png"}
            alt="Logo"
            width={56}
            height={56}
          />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Tutup menu"
              className="text-neutral-600 hover:bg-neutral-100"
            >
              <LucideIcons.X className="size-5" />
            </Button>
          </SheetClose>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 [scrollbar-gutter:stable]">
          <Accordion type="single" collapsible className="space-y-2 pb-6">
            {links.map((link) =>
              link.submenu && link.items ? (
                <AccordionItem
                  key={link.label}
                  value={link.label}
                  className="rounded-xl border border-neutral-200 bg-white last:border-b"
                >
                  <AccordionTrigger className="group flex w-full items-center justify-between px-4 py-3 text-left">
                    <div className="flex min-w-0 items-center">
                      <ItemIcon name={link.iconName} />
                      <span className="truncate text-[15px] font-semibold text-neutral-900">
                        {link.label}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-0">
                    <ul className="space-y-1 px-2">
                      {link.items.map((it) => (
                        <li key={`${link.label}-${it.label}`}>
                          <SheetClose asChild>
                            <a
                              href={it.href}
                              className="flex items-center rounded-lg px-4 py-2.5 hover:bg-neutral-50"
                            >
                              <SubItemIcon name={it.icon} />
                              <div className="text-[14px] font-medium text-neutral-700">
                                {it.label}
                              </div>
                            </a>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={link.label}>
                  <SheetClose asChild>
                    <a
                      href={link.href ?? "#"}
                      className={cn(
                        "flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-3",
                        "text-[15px] font-semibold text-neutral-900 hover:bg-neutral-50",
                      )}
                    >
                      <ItemIcon name={link.iconName} />
                      <span>{link.label}</span>
                    </a>
                  </SheetClose>
                </div>
              ),
            )}
          </Accordion>
        </nav>

        <div className="z-10 flex-none border-t border-neutral-200 bg-white px-3 py-4">
          <SheetClose asChild>
            <a
              href={ctaHref}
              className="block rounded-xl bg-[#059DEA] px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
              target="_blank"
            >
              {ctaLabel}
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}