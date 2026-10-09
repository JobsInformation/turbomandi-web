'use client';
import Link from 'next/link';
import { ShoppingCart, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Announcement Bar: Victoria location and dealership positioning statement */}
      <div className="bg-blue-900 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
        📍 Victoria, Australia — Built on Trust. Focused on You.
      </div>

      <nav className="bg-white border-b border-zinc-200 text-zinc-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-black p-2 rounded-lg tracking-wider text-lg">
              RAH
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-blue-900 block leading-none">ROYAL AUTO HUB</span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Certified Dealership</span>
            </div>
          </Link>

          {/* Navigation Links: Vehicles, Finance, Sell Your Car, Why Us, Contact */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-zinc-700">
            <Link href="/vehicles" className="hover:text-blue-600 transition-colors">Vehicles</Link>
            <Link href="/finance" className="hover:text-blue-600 transition-colors">Finance</Link>
            <Link href="/sell" className="hover:text-blue-600 transition-colors">Sell Your Car</Link>
            <Link href="/why-us" className="hover:text-blue-600 transition-colors">Why Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <Link href="/wishlist" className="relative p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors text-zinc-700" title="Saved Vehicles">
              <Heart className="w-5 h-5 text-blue-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors text-zinc-700" title="Shopping Cart">
              <ShoppingCart className="w-5 h-5 text-zinc-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}
