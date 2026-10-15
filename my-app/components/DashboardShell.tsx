"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className={`dashboard${isSidebarOpen ? "" : " sidebar-closed"}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-content">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        {children}
      </div>
    </div>
  );
}