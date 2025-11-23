"use client";

import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "../providers/SidebarProvider";

export function MobileMenuButton() {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed left-4 top-4 z-30 lg:hidden"
      onClick={toggle}
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}


