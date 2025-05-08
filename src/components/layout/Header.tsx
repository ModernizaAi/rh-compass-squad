
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NotificationsPopover } from "./NotificationsPopover";
import { UserMenu } from "./UserMenu";

export function Header() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    const event = new CustomEvent("toggle-sidebar");
    window.dispatchEvent(event);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 py-2.5 px-4 h-16 flex items-center justify-between shadow-sm z-20">
      <div className="flex items-center">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={toggleSidebar}
          >
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <div className="hidden md:block">
          <h1 className="text-lg font-medium">CompassHR</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <NotificationsPopover />
        <UserMenu />
      </div>
    </header>
  );
}
