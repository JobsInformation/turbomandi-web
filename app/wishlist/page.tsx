import Link from 'next/link';
import { Heart, Car, ShieldCheck, ArrowRight, Trash2, ShoppingCart } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <Heart className="w-4 h-4 text-blue-600 fill-blue-600" />
            Saved Vehicles
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Personal Wishlist
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Keep track of vehicles you love, compare specifications, and move them to your cart when you're ready.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Wishlist Card 1 */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-gray-100 h-52 relative flex items-center justify-center">
                <Car className="w-16 h-16 text-gray-400" />
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  VIC Certified
                </span>
                <button 
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-red-500 shadow-md transition-all cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Heart className="w-4 h-4 fill-red-500" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Toyota Camry Ascent</h3>
                <p className="text-2xl font-extrabold text-blue-600 mb-4">$32,990 <span className="text-xs font-normal text-gray-500">Drive Away</span></p>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-100 font-medium">
                  <span>2023 Model</span>
                  <span>•</span>
                  <span>Automatic</span>
                  <span>•</span>
                  <span>45,000 km</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <Link
                href="/cart"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 no-underline shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </Link>
              <Link
                href="/vehicles/toyota-camry"
                className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center no-underline border border-gray-200"
              >
                Details
              </Link>
            </div>
          </div>

          {/* Wishlist Card 2 */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-gray-100 h-52 relative flex items-center justify-center">
                <Car className="w-16 h-16 text-gray-400" />
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  VIC Certified
                </span>
                <button 
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-red-500 shadow-md transition-all cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Heart className="w-4 h-4 fill-red-500" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Mazda CX-5 Maxx Sport</h3>
                <p className="text-2xl font-extrabold text-blue-600 mb-4">$28,500 <span className="text-xs font-normal text-gray-500">Drive Away</span></p>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-100 font-medium">
                  <span>2022 Model</span>
                  <span>•</span>
                  <span>Automatic</span>
                  <span>•</span>
                  <span>62,000 km</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <Link
                href="/cart"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 no-underline shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </Link>
              <Link
                href="/vehicles/mazda-cx5"
                className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center no-underline border border-gray-200"
              >
                Details
              </Link>
            </div>
          </div>

        </div>

        {/* Explore More Callout */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 border border-gray-200 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-bold text-xl text-gray-900">Looking for something specific?</h3>
          <p className="text-gray-600 text-sm">Browse our full inventory of certified pre-owned sedans, SUVs, and hybrids with guaranteed roadworthy certificates.</p>
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-colors shadow-md no-underline"
          >
            Browse All Stock <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
