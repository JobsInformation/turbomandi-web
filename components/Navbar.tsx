import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, Menu, X, Car, ShieldCheck } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useWishlist } from '@/components/WishlistContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner for Victorian Compliance / Region */}
      <div className="bg-blue-900 text-white text-xs py-1.5 px-4 text-center font-medium">
        <span>VIC Licensed Motor Car Trader (LMCT) | Transparent Pricing & Guaranteed Quality</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md group-hover:bg-blue-700 transition-colors">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900 block leading-none">
                ROYAL AUTO HUB
              </span>
              <span className="text-xs text-blue-600 font-semibold tracking-wider uppercase mt-0.5 block">
                Certified Dealership
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/inventory" 
              className={`text-sm font-medium transition-colors ${
                isActive('/inventory') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Vehicles
            </Link>
            <Link 
              href="/finance" 
              className={`text-sm font-medium transition-colors ${
                isActive('/finance') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Finance
            </Link>
            <Link 
              href="/sell-car" 
              className={`text-sm font-medium transition-colors ${
                isActive('/sell-car') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Sell Your Car
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action Icons (Wishlist, Cart, Admin) */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors" title="Saved Vehicles">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart / Selected Vehicles Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors" title="Cart">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Dashboard Quick Link */}
            <Link 
              href="/admin/inventory" 
              className="hidden sm:inline-flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>
          <Link 
            href="/inventory" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Vehicles
          </Link>
          <Link 
            href="/finance" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Finance
          </Link>
          <Link 
            href="/sell-car" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Sell Your Car
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Contact
          </Link>
          <Link 
            href="/admin/inventory" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium bg-gray-900 text-white text-center"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
