"use client";

import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import { MobileNav } from "./MobileNav";
import { navigationLinks } from "~/data/home/navigationLinks";
import { Separator } from "../ui/separator";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const useTransparentStyle = isClient && isHomepage && !isScrolled;

  // Efek untuk 'isScrolled'
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. Efek untuk 'isClient' (hanya berjalan sekali setelah mount)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 right-0 left-0 z-50 px-4 pt-2 transition-all duration-300 md:px-6",
        // 4. Logika 'useTransparentStyle' sekarang aman digunakan
        !useTransparentStyle
          ? "bg-white text-gray-800 shadow-md"
          : "bg-transparent text-white",
      )}
    >
      <div className="container mx-auto -mt-1 flex h-16 items-center justify-between gap-4">
        <div className="flex h-full items-center gap-3">
          {/* 5. Menghapus {" "} dari sini untuk memperbaiki mismatch */}
          <Image
            src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761939553/LogoTextHitam_f83bfl.svg"
            alt="Logo"
            width={48}
            height={48}
            priority
          />
          <Separator
            orientation="vertical"
            className={cn(
              "max-h-10",
              !useTransparentStyle ? "bg-gray-300" : "bg-white/50",
            )}
          />
          <div className="text-md flex flex-col leading-tight font-medium">
            <span>Al Madeena</span>
            <span className="-mt-1">Islamic School</span>
          </div>
        </div>

        <div className="-mb-1 flex items-center gap-2">
          <NavigationMenu viewport={false} className="h-full max-lg:hidden">
            <NavigationMenuList className="h-full gap-1">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index} className="h-full">
                  {link.submenu && link.items ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "group h-full cursor-pointer rounded-t-lg rounded-b-none border-transparent bg-transparent px-3 py-1.5 pb-3 font-medium transition-all",
                          "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                          !useTransparentStyle
                            ? "text-gray-800 after:bg-gray-900 hover:text-gray-900 focus:text-gray-900 focus-visible:ring-gray-900/40 data-[state=open]:text-gray-900"
                            : "text-white after:bg-white hover:text-white focus:text-white focus-visible:ring-white/40 data-[state=open]:text-white",
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent className="rounded-sm">
                        <ul
                          className={cn(
                            "mt-0 border-0 bg-white text-gray-800 shadow-none md:min-w-56",
                          )}
                        >
                          {link.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <NavigationMenuLink
                                href={item.href}
                                className={cn(
                                  "block p-2 text-sm font-medium",
                                  "text-gray-700 transition-colors",
                                  "hover:bg-gray-100 hover:text-gray-900",
                                  "focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                                  "data-active:bg-gray-50 data-active:text-gray-900",
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {link.type === "description" ? (
                                    <div className="flex-1 space-y-1">
                                      <div className="font-medium">
                                        {item.label}
                                      </div>
                                      <p className="line-clamp-2 text-xs font-light text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  ) : (
                                    <span>{item.label}</span>
                                  )}
                                </div>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={link.href ?? "#"}
                      className={cn(
                        "group relative flex h-full flex-row items-center justify-center rounded-none border-transparent bg-transparent px-3 py-1.5 pb-3 font-medium",
                        "transition-colors outline-none focus-visible:ring-[3px]",
                        "hover:bg-transparent focus:bg-transparent",
                        !useTransparentStyle
                          ? link.active
                            ? "font-semibold text-gray-900 hover:text-gray-900"
                            : "text-gray-800/80 hover:text-gray-900"
                          : link.active
                            ? "font-semibold text-white hover:text-white"
                            : "text-white/80 hover:text-white",
                        !useTransparentStyle
                          ? "focus:text-gray-900 focus-visible:ring-gray-900/40"
                          : "focus:text-white focus-visible:ring-white/40",
                      )}
                      data-active={link.active}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform transition-transform duration-300 ease-out group-hover:scale-x-100",
                          !useTransparentStyle ? "bg-gray-900" : "bg-white",
                          link.active && "scale-x-100",
                        )}
                      ></span>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="lg:hidden">
            <MobileNav
              links={navigationLinks}
              isScrolled={!useTransparentStyle}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
