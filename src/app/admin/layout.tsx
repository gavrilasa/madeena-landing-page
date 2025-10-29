import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AdminSidebar } from "~/components/admin/AdminSidebar";
import { AdminHeader } from "~/components/admin/AdminHeader";
import { AdminFooter } from "~/components/admin/AdminFooter";

export const metadata: Metadata = {
  title: "Dashboard - Al Madeena Islamic School",
  description: "Al Madeena Islamic School",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Al Madeena" />
      </head>
      <body suppressHydrationWarning>
        <SidebarProvider>
          <div className="flex min-h-dvh w-full">
            <AdminSidebar />

            <div className="flex flex-1 flex-col">
              <AdminHeader />

              <main className="size-full flex-1 px-4 py-6 sm:px-6">
                {children} {/* This is where AdminPage's content will render */}
              </main>

              <AdminFooter />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
