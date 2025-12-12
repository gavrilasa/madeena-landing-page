"use client";

import * as React from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  GraduationCap,
  Building2,
  Trophy,
  Newspaper,
  UserPlus,
  Languages,
  Info,
  Phone,
  ClipboardList,
} from "lucide-react";
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

// Definisi Icon Map untuk menghindari penggunaan 'any'
const iconMap = {
  Home,
  BookOpen,
  GraduationCap,
  Building2,
  Trophy,
  Newspaper,
  UserPlus,
  Languages,
  Info,
  Phone,
  ClipboardList,
};

type IconName = keyof typeof iconMap;

function ItemIcon({ name }: { name?: string }) {
  // Pastikan name valid dan ada di iconMap, jika tidak gunakan Info sebagai default
  const Icon = name && iconMap[name as IconName] ? iconMap[name as IconName] : Info;
  return (
    <span className="mr-2 inline-flex size-8 flex-none items-center justify-center rounded-lg bg-neutral-100 ring-1 ring-neutral-200 ring-inset">
      <Icon className="size-4 text-neutral-700" aria-hidden="true" />
    </span>
  );
}

export interface NavigationItem {
  href?: string;
  label: string;
  active?: boolean;
  submenu?: boolean;
  type?: "description" | "simple" | "icon";
  items?: Array<{ href: string; label: string; description?: string }>;
  iconName?: string;
}

export function MobileNav({
  links,
  ctaHref = "https://wa.me/6282119222822?text=Halo%2C%20saya%20tertarik%20untuk%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20Sekolah%20Al%20Madeena.",
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
          <Menu className="size-5" />
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
            width={64}
            height={64}
          />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Tutup menu"
              className="text-neutral-600 hover:bg-neutral-100"
            >
              <X className="size-5" />
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
                  <AccordionContent className="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top-1 pb-0">
                    <ul className="divide-y divide-neutral-200">
                      {link.items.map((it) => (
                        <li key={`${link.label}-${it.label}`}>
                          <SheetClose asChild>
                            <a
                              href={it.href}
                              className="block px-4 py-3 hover:bg-neutral-50"
                            >
                              <div className="text-[15px] font-medium text-neutral-900">
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