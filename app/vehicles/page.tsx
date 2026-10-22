'use client';

import { useState, useEffect } from 'react';
import { Search, Heart, Leaf, Filter, X } from 'lucide-react';

// Sample verified stock data matching the specification requirements
const sampleStock = [
  { id: 1, year: 2022, make: 'Toyota', model: 'RAV4', variant: 'Cruiser', price: 45990, body: 'SUV', fuel: 'Hybrid', odometer: 24000, trans: 'Auto', status: 'Just Arrived' },
  { id: 2, make: 'Ford', model: 'Ranger', variant: 'Wildtrak', price: 58500, body: 'Ute', fuel: 'Diesel', odometer: 41000, trans: 'Auto', status: 'Popular' },
  { id: 3, year: 2023, make: 'Toyota', model: 'Camry', variant: 'Ascent', price: 34990, body: 'Sedan', fuel: 'Hybrid', odometer: 12000, trans: 'Auto', status: 'Under Offer' },
];

export default function PublicStockPage() {
  const [vehicles, setVehicles] = useState(sampleStock);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedVehicles, setSavedVehicles] = useState<number[]>([]);

  // Search Filter Logic
  const filteredVehicles = vehicles.filter(v => 
    v.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSave = (id: number) => {
    setSavedVehicles(prev => prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Banner - Royal Blue Branding */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Built on Trust. Focused on You.</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Explore our premium selection of Victorian used vehicles. Fair deals and transparency guaranteed.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Search & Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
              <Filter className="w-5 h-5" />
              <h3>Search Stock</h3>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Make, model or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800">
                <X className="w-4 h-4" /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center text-slate-600">
            <span className="font-semibold text-slate-800">{filteredVehicles.length} vehicles matching your search</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                
                {/* Vehicle Image Placeholder & Badges */}
                <div className="h-48 bg-slate-100 relative p-4 flex items-start justify-between">
                   <span className="bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                     {vehicle.status}
                   </span>
                   <button onClick={() => toggleSave(vehicle.id)} className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform">
                     <Heart className={`w-5 h-5 ${savedVehicles.includes(vehicle.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                   </button>
                </div>

                {/* Vehicle Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-slate-800">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">{vehicle.variant} • {vehicle.body}</p>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-6">
                    <div className="flex items-center gap-1"><span>{vehicle.odometer.toLocaleString()} km</span></div>
                    <div className="flex items-center gap-1"><span>{vehicle.trans}</span></div>
                    
                    {/* Hybrid Indicator */}
                    <div className="flex items-center gap-1 font-medium">
                      {vehicle.fuel === 'Hybrid' ? (
                        <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                          <Leaf className="w-3 h-3" /> Hybrid
                        </span>
                      ) : (
                        <span>{vehicle.fuel}</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-700">${vehicle.price.toLocaleString()}</div>
                      <div className="text-xs text-slate-400 mt-1">Excl. Govt Charges</div>
                    </div>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
