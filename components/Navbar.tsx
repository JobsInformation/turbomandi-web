'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-xl font-extrabold text-blue-800 tracking-tight">
        Royal Auto Hub
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <Link href="/dashboard/stock" className="hover:text-blue-700 transition-colors">Vehicles & Stock</Link>
        <Link href="/finance" className="hover:text-blue-700 transition-colors">Finance</Link>
        <Link href="/sell" className="hover:text-blue-700 transition-colors">Sell Your Car</Link>
        <Link href="/why-us" className="hover:text-blue-700 transition-colors">Why Us</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/contact" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          Contact
        </Link>
      </div>
    </header>
  );
}
