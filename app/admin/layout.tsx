"use client";

import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Render just the login form without the sidebar if on the login route
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Render the full dashboard layout for all other /admin routes
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
