"use client";

import {
  Briefcase,
  ChartNoAxesCombinedIcon,
  Images,
  Newspaper,
  Trophy,
  Users,
  Building2, // Icon tambahan untuk Foundation
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();

  const activeIconClass = "data-[active=true]:[&>svg]:stroke-[2.5]";

  return (
    <Sidebar>
      <SidebarContent>
        <Image
          src={
            "https://res.cloudinary.com/dah2v3xbg/image/upload/v1761844689/Logo_Footer_mdjaax.svg"
          }
          width={200}
          height={48}
          alt="Logo Al Madeena"
          className="self-center py-2"
        />
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin"}
                  className={activeIconClass}
                >
                  <Link href="/admin">
                    <ChartNoAxesCombinedIcon />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith("/admin/news")}
                  className={activeIconClass}
                >
                  <Link href="/admin/news">
                    <Newspaper />
                    <span>News</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith("/admin/gallery")}
                  className={activeIconClass}
                >
                  <Link href="/admin/gallery">
                    <Images />
                    <span>Gallery</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith("/admin/staff")}
                  className={activeIconClass}
                >
                  <Link href="/admin/staff">
                    <Users />
                    <span>Staff</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* --- Menu Tambahan Foundation Board --- */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith("/admin/foundation")}
                  className={activeIconClass}
                >
                  <Link href="/admin/foundation">
                    <Building2 />
                    <span>Foundation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* -------------------------------------- */}

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith("/admin/achievements")}
                  className={activeIconClass}
                >
                  <Link href="/admin/achievements">
                    <Trophy />
                    <span>Achievements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith("/admin/careers")}
                  className={activeIconClass}
                >
                  <Link href="/admin/careers">
                    <Briefcase />
                    <span>Careers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}