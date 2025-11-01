import { SidebarProvider } from "~/components/ui/sidebar";
import { AdminSidebar } from "~/components/admin/AdminSidebar";
import { AdminHeader } from "~/components/admin/AdminHeader";
import { AdminFooter } from "~/components/admin/AdminFooter";
import "~/styles/tiptap.css";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-dvh w-full">
          <AdminSidebar />

          <div className="flex flex-1 flex-col">
            <AdminHeader />

            <main className="size-full flex-1 px-4 py-6 sm:px-6">
              {children}
            </main>

            <AdminFooter />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
