"use client";

import Image from "next/image";
import * as React from "react";
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
import { navigationLinks } from "~/data/Navigation";

export default function Navbar() {
  return (
    <header className="absolute top-2 right-0 left-0 z-50 bg-transparent px-4 py-2 text-white md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <Image src={"https://res.cloudinary.com/reswara/image/upload/v1761336815/Frame_9_1_yyke1c.svg"} alt="Logo" width={64} height={64} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NavigationMenu viewport={false} className="h-full max-md:hidden">
            <NavigationMenuList className="h-full gap-1">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index} className="h-full">
                  {link.submenu && link.items ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "group h-full rounded-none border-transparent bg-transparent px-3 py-1.5 pb-3 font-medium text-white/80 hover:border-b-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-active:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white", // Custom overrides
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul
                          className={cn(
                            "rounded-xl p-2 md:min-w-60",
                            "group-data-[viewport=true]/navigation-menu:bg-transparent",
                            "group-data-[viewport=true]/navigation-menu:backdrop-blur-0",
                            "group-data-[viewport=true]/navigation-menu:border-0",
                            "group-data-[viewport=true]/navigation-menu:ring-0",
                            "group-data-[viewport=true]/navigation-menu:shadow-none",
                          )}
                        >
                          {link.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <NavigationMenuLink
                                href={item.href}
                                className="block rounded p-2 text-sm transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                              >
                                <div className="flex items-center gap-2">
                                  {link.type === "description" ? (
                                    <div className="flex-1 space-y-1">
                                      <div className="font-medium">
                                        {item.label}
                                      </div>
                                      <p className="line-clamp-2 text-xs text-white/70">
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
                        "group relative flex h-full items-center justify-center rounded-none border-transparent bg-transparent px-3 py-1.5 pb-3 font-medium text-white/80 transition-colors hover:text-white focus:bg-transparent focus:text-white focus:outline-none",
                        link.active && "font-semibold text-white",
                      )}
                      active={link.active}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="md:hidden">
            <MobileNav links={navigationLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
