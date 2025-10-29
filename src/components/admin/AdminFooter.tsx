import React from "react";

export function AdminFooter() {
  return (
    <footer className="bg-card h-10 border-t px-4 sm:px-6">
      <div className="border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]" />
      {/* You can replace the background pattern with actual footer content */}
      {/* e.g., <p className="flex h-full items-center text-sm text-muted-foreground">© 2025 Al Madeena</p> */}
    </footer>
  );
}
