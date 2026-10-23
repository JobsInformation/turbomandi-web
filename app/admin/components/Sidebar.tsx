"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Inventory", href: "/admin/inventory" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Bookings", href: "/admin/bookings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        Royal Auto Hub
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`block p-3 rounded-lg transition-colors ${pathname === link.href ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full p-3 text-left hover:bg-gray-800 rounded-lg transition-colors text-red-400 font-medium"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
