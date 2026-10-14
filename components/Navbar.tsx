'use client';

import Link from 'next/link';
import { Home, Car, ShoppingCart, Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo / Title */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:bg-blue-700 transition-colors">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-none">
                Royal Auto Hub
              </span>
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mt-1 block">
                VIC LMCT Certified Dealer
              </span>
            </div>
          </Link>

          {/* Navigation Menu (Home Button Included) */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all no-underline"
            >
              <Home className="w-4 h-4 text-blue-600" />
              Home
            </Link>

            <Link
              href="/vehicles"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all no-underline"
            >
              <Car className="w-4 h-4 text-blue-600" />
              Vehicles & Stock
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all no-underline"
            >
              <Heart className="w-4 h-4 text-blue-600" />
              Wishlist
            </Link>
          </nav>

          {/* Right Action / Cart */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center no-underline"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            <Link
              href="/vehicles"
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md no-underline"
            >
              Browse Stock
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
