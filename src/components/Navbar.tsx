'use client';

import Link from 'next/link';
import { Phone, ShoppingCart, Wrench, Car, Bike, Package } from 'lucide-react';

export default function Navbar() {
  const whatsappNumber = "923001234567";

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black italic tracking-wider bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            TURBOMANDI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
          <Link href="/vehicles?type=CAR" className="flex items-center gap-2 hover:text-red-500 transition-colors">
            <Car className="w-4 h-4 text-red-500" /> Cars
          </Link>
          <Link href="/vehicles?type=BIKE" className="flex items-center gap-2 hover:text-red-500 transition-colors">
            <Bike className="w-4 h-4 text-orange-500" /> Bikes
          </Link>
          <Link href="/parts" className="flex items-center gap-2 hover:text-red-500 transition-colors">
            <Package className="w-4 h-4 text-yellow-500" /> Parts Store
          </Link>
          <Link href="/services" className="flex items-center gap-2 hover:text-red-500 transition-colors">
            <Wrench className="w-4 h-4 text-red-500" /> Workshop Services
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link 
            href="/cart" 
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 relative text-zinc-300 hover:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
          
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all"
          >
            <Phone className="w-4 h-4" /> WhatsApp Showroom
          </a>
        </div>
      </div>
    </header>
  );
}
