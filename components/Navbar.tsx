'use client';

import Link from 'next/link';
import { Home, Car, ShoppingCart, Heart, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-all">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-none">
                Royal Auto Hub
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 block">
                VIC LMCT Certified Dealer
              </span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-200/80">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-all no-underline"
            >
              <Home className="w-4 h-4 text-blue-600" />
              Home
            </Link>

            <Link
              href="/vehicles"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-all no-underline"
            >
              <Car className="w-4 h-4 text-blue-600" />
              Vehicles & Stock
            </Link>

            <Link
              href="/parts"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-all no-underline"
            >
              Parts
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-all no-underline"
            >
              Workshop
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-white transition-all no-underline"
            >
              <Heart className="w-4 h-4 text-blue-600" />
              Wishlist
            </Link>
          </nav>

          {/* Right Action / Cart */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-3 rounded-2xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center no-underline shadow-sm"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            <Link
              href="/vehicles"
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all shadow-lg shadow-blue-600/25 no-underline items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Browse Stock
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
