'use client';

import Link from 'next/link';
import { ArrowLeft, Car, Gauge, Calendar, Cog, Search, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

// Mock database of premium vehicles
const initialVehicles = [
  { id: 1, make: 'Honda', model: 'Civic RS 1.5 Turbo', year: 2023, price: 9500000, mileage: '12,000 km', transmission: 'Automatic', type: 'Sedan', tag: 'Hot Deal' },
  { id: 2, make: 'Toyota', model: 'Fortuner Legender', year: 2024, price: 19500000, mileage: '0 km', transmission: 'Automatic', type: 'SUV', tag: 'Brand New' },
  { id: 3, make: 'Kia', model: 'Sportage AWD', year: 2022, price: 8200000, mileage: '35,000 km', transmission: 'Automatic', type: 'SUV', tag: 'Inspected' },
  { id: 4, make: 'Suzuki', model: 'Swift GLX CVT', year: 2024, price: 4700000, mileage: '5,000 km', transmission: 'Automatic', type: 'Hatchback', tag: 'Like New' },
  { id: 5, make: 'Hyundai', model: 'Tucson AWD', year: 2023, price: 8600000, mileage: '18,000 km', transmission: 'Automatic', type: 'SUV', tag: 'Inspected' },
  { id: 6, make: 'Toyota', model: 'Corolla Altis Grande', year: 2021, price: 6800000, mileage: '55,000 km', transmission: 'Automatic', type: 'Sedan', tag: 'Used' }
];

export default function VehiclesPage() {
  const [search, setSearch] = useState('');
  
  const filteredVehicles = initialVehicles.filter(v => 
    `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 relative">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight flex items-center gap-4 mb-3">
              <div className="bg-red-600 p-3 rounded-2xl">
                <Car className="w-8 h-8 text-white" />
              </div>
              Premium Vehicles
            </h1>
            <p className="text-zinc-400 text-lg">Browse our curated selection of verified and inspected cars.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search make or model..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((car) => (
            <div key={car.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition group flex flex-col">
              {/* Image Placeholder */}
              <div className="h-48 bg-zinc-800 relative flex items-center justify-center border-b border-zinc-800">
                <Car className="w-16 h-16 text-zinc-700 group-hover:scale-110 transition duration-500" />
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {car.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-1 text-white group-hover:text-red-500 transition">{car.make} {car.model}</h3>
                  <p className="text-3xl font-bold text-white mb-6">
                    PKR {car.price.toLocaleString()}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Calendar className="w-4 h-4 text-red-500" /> {car.year}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Gauge className="w-4 h-4 text-red-500" /> {car.mileage}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Cog className="w-4 h-4 text-red-500" /> {car.transmission}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <ShieldCheck className="w-4 h-4 text-red-500" /> Verified
                    </div>
                  </div>
                </div>

                <button className="w-full bg-zinc-800 hover:bg-white hover:text-black text-white px-4 py-3 rounded-xl font-bold transition flex justify-center items-center gap-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-3xl">
            <Car className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No vehicles found</h3>
            <p className="text-sm mt-1">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
