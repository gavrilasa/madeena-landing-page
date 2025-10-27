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
import { navigationLinks } from "~/data/home/navigationLinks";

export default function Navbar() {
  return (
    <header className="absolute top-2 right-0 left-0 z-50 bg-transparent px-4 py-2 text-white md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Image
            src="https://res.cloudinary.com/reswara/image/upload/v1761336815/Frame_9_1_yyke1c.svg"
            alt="Logo"
            width={64}
            height={64}
          />
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
                          "group h-full cursor-pointer rounded-t-lg rounded-b-none border-transparent bg-transparent px-3 py-1.5 pb-3 font-medium text-white transition-all",
                          "hover:bg-transparent hover:text-white",
                          "focus:bg-transparent focus:text-white",
                          "data-[state=open]:bg-transparent data-[state=open]:text-white",
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
                                className="block rounded-sm p-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
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
                        "group relative flex h-full items-center justify-center rounded-none border-transparent bg-transparent px-3 py-1.5 pb-3 font-medium text-white/80 transition-colors",
                        "hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
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
