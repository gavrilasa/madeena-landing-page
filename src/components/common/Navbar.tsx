// src/components/common/Navbar.tsx
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
import * as Icons from "lucide-react";

interface NavbarProps {
  forceSolid?: boolean;
}

export default function Navbar({ forceSolid }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname() || "";
  const isTransparentPage = pathname === "/";

  const useTransparentStyle =
    isClient && !forceSolid && isTransparentPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 right-0 left-0 z-50 px-4 transition-all duration-300 md:px-6",
        !useTransparentStyle
          ? "bg-white text-gray-800 shadow-md"
          : "bg-transparent text-white",
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between gap-6 md:pt-0 pt-2">
        <div className="flex h-full items-center gap-3">
          <Image
            src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1761939553/LogoTextHitam_f83bfl.svg"
            alt="Logo"
            width={52} 
            height={52}
            priority
          />
          <Separator
            orientation="vertical"
            className={cn(
              "max-h-10",
              !useTransparentStyle ? "bg-gray-300" : "bg-white/50",
            )}
          />
          <div className="flex flex-col leading-tight font-medium text-lg"> 
            <span>Al Madeena</span>
            <span className="-mt-1 text-base">Islamic School</span> 
          </div>
        </div>

        <div className="-mb-1 flex items-center gap-2">
          <NavigationMenu viewport={false} className="h-full max-lg:hidden">
            <NavigationMenuList className="h-full gap-2"> 
              {navigationLinks.map((link, index) => {
                const isActive =
                  link.href === pathname ||
                  link.items?.some((item) => item.href === pathname);

                return (
                  <NavigationMenuItem key={index} className="h-full">
                    {link.submenu && link.items ? (
                      <>
                        <NavigationMenuTrigger
                          data-active={isActive}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "group h-full cursor-pointer rounded-t-lg rounded-b-none border-transparent bg-transparent px-4 py-1.5 pb-3 font-medium transition-all text-[15px]", // Text size 15px
                            "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                            !useTransparentStyle
                              ? "text-gray-800 after:bg-gray-900 hover:text-gray-900 focus:text-gray-900 focus-visible:ring-gray-900/40 data-[state=open]:text-gray-900"
                              : "text-white after:bg-white hover:text-white focus:text-white focus-visible:ring-white/40 data-[state=open]:text-white",
                            isActive &&
                              !useTransparentStyle &&
                              "font-bold text-gray-900",
                            isActive &&
                              useTransparentStyle &&
                              "font-bold text-white",
                          )}
                        >
                          {link.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="rounded-sm">
                          <ul
                            className={cn(
                              "mt-0 border-0 bg-white text-gray-800 shadow-none md:min-w-72", 
                            )}
                          >
                            {link.items.map((item, itemIndex) => {
                              const IconComponent = item.icon
                                ? (Icons[
                                    item.icon as keyof typeof Icons
                                  ] as React.ElementType)
                                : null;

                              return (
                                <li key={itemIndex}>
                                  <NavigationMenuLink
                                    href={item.href}
                                    data-active={item.href === pathname}
                                    className={cn(
                                      "block p-3 text-[15px]", 
                                      "text-gray-700 transition-colors",
                                      "hover:bg-gray-100 hover:text-gray-900",
                                      "focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                                      "data-active:bg-gray-50 data-active:font-semibold data-active:text-gray-900",
                                    )}
                                  >
                                    <div className="flex items-start gap-3">
                                      {IconComponent && (
                                        <div className="group-hover:text-primary mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                                          <IconComponent className="h-5 w-5" />
                                        </div>
                                      )}

                                      <div className="flex-1 space-y-1">
                                        <div className="leading-none font-medium">
                                          {item.label}
                                        </div>
                                        {item.description && (
                                          <p className="line-clamp-2 text-xs leading-snug text-gray-500">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={link.href ?? "#"}
                        data-active={isActive}
                        className={cn(
                          "group relative flex h-full flex-row items-center justify-center rounded-none border-transparent bg-transparent px-4 py-1.5 pb-3 font-medium text-[15px]", // Text size 15px
                          "transition-colors outline-none focus-visible:ring-[3px]",
                          "hover:bg-transparent focus:bg-transparent",
                          !useTransparentStyle
                            ? isActive
                              ? "font-bold text-gray-900 hover:text-gray-900"
                              : "text-gray-800/80 hover:text-gray-900"
                            : isActive
                              ? "font-bold text-white hover:text-white"
                              : "text-white/80 hover:text-white",
                          !useTransparentStyle
                            ? "focus:text-gray-900 focus-visible:ring-gray-900/40"
                            : "focus:text-white focus-visible:ring-white/40",
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform transition-transform duration-300 ease-out group-hover:scale-x-100",
                            !useTransparentStyle ? "bg-gray-900" : "bg-white",
                            isActive && "scale-x-100",
                          )}
                        ></span>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
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