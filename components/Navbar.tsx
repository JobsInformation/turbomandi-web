'use client';
import Link from 'next/link';
import { Phone, Wrench, Car, Bike, Package, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-white">
      <Link 
  href="/" 
  className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block"
>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black italic tracking-wider bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
          TURBOMANDI
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-300">
          <Link href="/vehicles?type=CAR" className="flex items-center gap-2 hover:text-red-500"><Car className="w-4 h-4 text-red-500" /> Cars</Link>
          <Link href="/vehicles?type=BIKE" className="flex items-center gap-2 hover:text-red-500"><Bike className="w-4 h-4 text-orange-500" /> Bikes</Link>
          <Link href="/parts" className="flex items-center gap-2 hover:text-red-500"><Package className="w-4 h-4 text-yellow-500" /> Parts</Link>
          <Link href="/services" className="flex items-center gap-2 hover:text-red-500"><Wrench className="w-4 h-4 text-red-500" /> Services</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/vehicles/new" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all">
            <PlusCircle className="w-4 h-4" /> Sell
          </Link>
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 border border-emerald-500/30">
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
