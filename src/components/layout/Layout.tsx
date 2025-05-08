
import React, { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState("256px");

  // Listen for sidebar width changes
  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.isOpen !== undefined) {
        setSidebarWidth(customEvent.detail.isOpen ? "256px" : "64px");
      }
    };
    
    window.addEventListener("sidebar-width-change", handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener("sidebar-width-change", handleSidebarToggle as EventListener);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div 
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
