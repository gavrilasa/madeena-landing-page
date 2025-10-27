"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "~/lib/utils";

type RootProps = React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
};

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: RootProps) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative z-50 flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport ? <NavigationMenuViewport /> : null}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

export const navigationMenuTriggerStyle = cva(
  [
    "relative inline-flex h-9 w-max items-center justify-center rounded-none",
    "bg-transparent px-3 py-1.5 text-sm font-medium text-white/80",
    "transition-[color,border-color,transform] outline-none",
    "hover:text-white focus:text-white data-[state=open]:text-white",
    "border-b-0",
    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
    "after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300",
    "hover:after:scale-x-100 focus:after:scale-x-100 data-[state=open]:after:scale-x-100",
    "focus-visible:ring-[3px] focus-visible:ring-white/40 focus-visible:outline-0",
  ].join(" "),
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="relative top-px ml-1 size-3 text-white transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // animasi
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
        "top-0 left-0 w-full p-2 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5",
        "origin-top-right md:right-0 md:left-auto",
        // ✅ Ubah background jadi putih solid, hilangkan blur transparan
        "group-data-[viewport=false]/navigation-menu:bg-white",
        "group-data-[viewport=false]/navigation-menu:text-gray-800",
        "group-data-[viewport=false]/navigation-menu:rounded-xl",
        "group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-gray-200",
        "group-data-[viewport=false]/navigation-menu:shadow-lg",
        "**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-right-52",
        "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-right-52",
        className,
      )}
      {...props}
    />
  );
}


function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-0 isolate z-60 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden",
          "origin-top-center data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
          "data-[state=open]:animate-in data-[state=open]:zoom-in-90",
          "md:w-(--radix-navigation-menu-viewport-width)",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm text-white/90 transition-colors outline-none",
        "hover:bg-white/15 focus:bg-white/15",
        "data-active:text-white",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-white/70",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-61 flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-white/50 shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
