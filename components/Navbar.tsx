'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Phone, Wrench, Car, Bike, Package, PlusCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black italic tracking-wider bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
          TURBOMANDI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-300">
          <Link href="/" className="bg-zinc-800 hover:bg-zinc-700 text-white py-1.5 px-3 rounded-lg transition-colors flex items-center gap-2">🏠 Home</Link>
          <Link href="/vehicles?type=CAR" className="flex items-center gap-2 hover:text-red-500"><Car className="w-4 h-4 text-red-500" /> Cars</Link>
          <Link href="/vehicles?type=BIKE" className="flex items-center gap-2 hover:text-red-500"><Bike className="w-4 h-4 text-orange-500" /> Bikes</Link>
          <Link href="/parts" className="flex items-center gap-2 hover:text-red-500"><Package className="w-4 h-4 text-yellow-500" /> Parts</Link>
          <Link href="/services" className="flex items-center gap-2 hover:text-red-500"><Wrench className="w-4 h-4 text-red-500" /> Services</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/vehicles/new" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all">
            <PlusCircle className="w-4 h-4" /> Sell
          </Link>
          {/* Changed to ghost/outline button to fix color clashing */}
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="bg-transparent hover:bg-zinc-800 text-emerald-500 font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 border border-emerald-500 transition-all">
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden p-2 text-zinc-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-2 pb-4 space-y-3">
          <Link href="/" className="block text-zinc-300 hover:text-white py-2">Home</Link>
          <Link href="/vehicles?type=CAR" className="block text-zinc-300 hover:text-white py-2">Cars</Link>
          <Link href="/vehicles?type=BIKE" className="block text-zinc-300 hover:text-white py-2">Bikes</Link>
          <Link href="/parts" className="block text-zinc-300 hover:text-white py-2">Parts</Link>
          <Link href="/services" className="block text-zinc-300 hover:text-white py-2">Services</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/vehicles/new" className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg">Sell</Link>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-emerald-500 text-emerald-500 font-bold py-2 rounded-lg">WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  );
}
