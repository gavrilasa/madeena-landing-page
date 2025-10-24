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

type IconName = keyof typeof iconMap;

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
};

function ItemIcon({ name }: { name?: IconName }) {
  const Icon = name ? (iconMap[name] ?? Info) : Info;
  return (
    <span className="mr-2 inline-flex size-8 flex-none items-center justify-center rounded-lg bg-neutral-100 ring-1 ring-neutral-200 ring-inset">
      <Icon className="size-4 text-neutral-700" aria-hidden />
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
  iconName?: IconName;
}

export function MobileNav({
  links,
  ctaHref = "#pendaftaran",
  ctaLabel = "Pendaftaran",
}: {
  links: NavigationItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Buka menu"
          className="text-white hover:bg-white/10 md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "w-screen max-w-none border-l border-neutral-200 bg-white p-0 px-1 text-neutral-900",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        )}
      >
        <SheetTitle className="sr-only">Al Madeena</SheetTitle>

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur">
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

        <nav className="h-[calc(100dvh-56px-64px)] overflow-y-auto px-3 pt-3 pb-2 [scrollbar-gutter:stable]">
          <ul className="space-y-2">
            {links.map((link) =>
              link.submenu && link.items ? (
                <li key={link.label}>
                  <Accordion
                    type="single"
                    collapsible
                    className="rounded-xl border border-neutral-200 bg-white"
                  >
                    <AccordionItem value="open" className="border-0">
                      <AccordionTrigger className="group flex w-full items-center justify-between px-4 py-3 text-left">
                        <div className="flex min-w-0 items-center">
                          <ItemIcon name={link.iconName} />
                          <span className="truncate text-[15px] font-semibold text-neutral-900">
                            {link.label}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top-1">
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
                                  {it.description ? (
                                    <p className="text-sm text-neutral-500">
                                      {it.description}
                                    </p>
                                  ) : null}
                                </a>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ) : (
                <li key={link.label}>
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
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Footer CTA */}
        <div className="sticky bottom-0 z-10 border-t border-neutral-200 bg-white/90 px-3 py-4 backdrop-blur">
          <SheetClose asChild>
            <a
              href={ctaHref}
              className="block rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              {ctaLabel}
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
