import { SidebarTrigger } from "~/components/ui/sidebar";
import AdminProfile from "./AdminProfile";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function AdminHeader() {
  return (
    <header className="bg-card sticky top-0 z-50 flex h-[55px] items-center justify-between gap-6 border-b px-4 py-2 sm:px-6">
      <SidebarTrigger className="[&_svg]:size-5!" />
      <AdminProfile
        trigger={
          <Button variant="ghost" size="icon" className="size-9.5">
            <Avatar className="size-9.5 rounded-md">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
    </header>
  );
}
