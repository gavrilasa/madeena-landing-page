"use client";

import type { ReactNode } from "react";

import { LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSignOut } from "~/hooks/use-signout";

type Props = {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
};

export default function AdminProfile({
  trigger,
  defaultOpen,
  align = "end",
}: Props) {
  const handleSignOut = useSignOut();

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align={align || "end"}>
        <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2 font-normal">
          <div className="relative">
            <Avatar className="size-7">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-1 flex-col items-start">
            <span className="text-foreground text-sm font-semibold">
              Admin Al Madeena
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer px-4 py-2 text-sm"
          onClick={handleSignOut}
        >
          <LogOutIcon className="size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
