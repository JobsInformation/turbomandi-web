import Link from 'next/link';
import { Wrench, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function PartsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            OEM Certified Parts & Accessories
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Genuine Auto Parts Store
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            High-quality OEM replacement parts, lubricants, and accessories guaranteed for your vehicle.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Part Card 1 */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Suspension
                </span>
                <span className="text-xs text-gray-400 font-mono">SKU: HON-CIV-1234</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Civic Turbo Suspension Kit</h3>
              <p className="text-xs text-emerald-600 font-semibold mb-4">✓ Stock Remaining: 13</p>
              <p className="text-2xl font-extrabold text-blue-600 mb-6">$1,599 <span className="text-xs font-normal text-gray-500">AUD</span></p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>

          {/* Part Card 2 */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Engine Maintenance
                </span>
                <span className="text-xs text-gray-400 font-mono">SKU: NGK-SPK-9988</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">NGK Iridium Spark Plugs</h3>
              <p className="text-xs text-emerald-600 font-semibold mb-4">✓ Stock Remaining: 49</p>
              <p className="text-2xl font-extrabold text-blue-600 mb-6">$145 <span className="text-xs font-normal text-gray-500">AUD</span></p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>

          {/* Part Card 3 */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Fluids & Lubricants
                </span>
                <span className="text-xs text-gray-400 font-mono">SKU: LQM-OIL-5544</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Liqui Moly 5W-40 Engine Oil</h3>
              <p className="text-xs text-emerald-600 font-semibold mb-4">✓ Stock Remaining: 29</p>
              <p className="text-2xl font-extrabold text-blue-600 mb-6">$120 <span className="text-xs font-normal text-gray-500">AUD</span></p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
