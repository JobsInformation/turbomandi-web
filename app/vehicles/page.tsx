import Link from 'next/link';
import { Car, ShieldCheck, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            VIC Licensed Motor Car Trader (LMCT) Inventory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Verified Stock & Vehicles
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Explore certified pre-owned vehicles with transparent drive-away pricing and rigorous inspection standards.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm h-fit space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                Filter Vehicles
              </h2>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">Reset</button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Search Make / Model</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. Toyota, Mazda, SUV"
                    className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Max Price ($ AUD)</label>
                <select className="w-full p-2.5 rounded-2xl border border-gray-300 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="">Any Budget</option>
                  <option value="20000">Under $20,000</option>
                  <option value="35000">Under $35,000</option>
                  <option value="50000">Under $50,000</option>
                  <option value="75000">Under $75,000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Transmission</label>
                <select className="w-full p-2.5 rounded-2xl border border-gray-300 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="">All Transmissions</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-sm transition-colors shadow-md cursor-pointer">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Vehicle Grid */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Vehicle Card 1 */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-gray-100 h-52 relative flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      VIC Certified
                    </span>
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
                <div className="p-6 pt-0">
                  <Link
                    href="/vehicles/toyota-camry"
                    className="w-full bg-gray-900 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 no-underline shadow-sm"
                  >
                    View Details & Inspection <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Vehicle Card 2 */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-gray-100 h-52 relative flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      VIC Certified
                    </span>
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
                <div className="p-6 pt-0">
                  <Link
                    href="/vehicles/mazda-cx5"
                    className="w-full bg-gray-900 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 no-underline shadow-sm"
                  >
                    View Details & Inspection <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </main>

        </div>
      </div>

    </div>
  );
}
