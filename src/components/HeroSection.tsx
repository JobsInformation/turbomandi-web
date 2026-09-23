'use client';

import { useState } from 'react';
import { Car, Package, Wrench, Search, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'parts' | 'services'>('vehicles');

  return (
    <section className="relative bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4" /> Verified Direct Stock & In-House Workshop
        </span>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6">
          Drive, Maintain & Upgrade <br />
          <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            All In One Mandi
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Browse TurboMandi's certified car & bike inventory, order 100% compatible OEM parts, or book a workshop service online.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'vehicles' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" /> Vehicles
            </button>
            <button
              onClick={() => setActiveTab('parts')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'parts' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" /> Parts Fitment
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'services' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" /> Book Service
            </button>
          </div>

          <div className="p-2">
            {activeTab === 'vehicles' && (
              <form action="/vehicles" method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select name="make" className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg p-3 text-sm focus:outline-none focus:border-red-500">
                  <option value="">All Makes</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Kia">Kia</option>
                </select>
                <select name="type" className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg p-3 text-sm focus:outline-none focus:border-red-500">
                  <option value="">Cars & Bikes</option>
                  <option value="CAR">Cars Only</option>
                  <option value="BIKE">Bikes Only</option>
                </select>
                <button type="submit" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg p-3 text-sm flex items-center justify-center gap-2 transition-all">
                  <Search className="w-4 h-4" /> Search Inventory
                </button>
              </form>
            )}

            {activeTab === 'parts' && (
              <form action="/parts" method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  name="q"
                  placeholder="Part name or SKU (e.g. Oil Filter, Brake Pad)..."
                  className="sm:col-span-2 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg p-3 text-sm focus:outline-none focus:border-red-500"
                />
                <button type="submit" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg p-3 text-sm flex items-center justify-center gap-2 transition-all">
                  <Search className="w-4 h-4" /> Find Parts
                </button>
              </form>
            )}

            {activeTab === 'services' && (
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-2">
                <p className="text-xs text-zinc-400 text-left">
                  Oil change, engine tuning, denting/painting, and general checkups at TurboMandi Workshop.
                </p>
                <a href="/services/book" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg text-sm text-center whitespace-nowrap transition-all">
                  Select Appointment Time
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
