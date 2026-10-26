'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Leaf, Search } from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  odometer: string | null;
  status: string;
  body: string | null;
  fuel: string | null;
  trans: string | null;
}

export default function PublicVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVehicles(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredVehicles = vehicles.filter(v => 
    `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <div className="bg-blue-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Vehicle Showroom</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Explore our live inventory of LMCT certified quality pre-owned vehicles.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search make, model, or year..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-700"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-slate-500">Loading live inventory from database...</div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-lg font-semibold text-slate-700">No vehicles found in stock.</p>
            <p className="text-sm text-slate-500 mt-1">Add vehicles via your admin dashboard to display them here instantly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">{vehicle.status}</span>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{vehicle.body}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                  <div className="text-2xl font-extrabold text-blue-700 mb-4">${vehicle.price.toLocaleString()}</div>
                  
                  <div className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Odometer:</span>
                      <span className="font-medium">{vehicle.odometer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Transmission:</span>
                      <span className="font-medium">{vehicle.trans}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Fuel Type:</span>
                      <span className="font-medium flex items-center gap-1">
                        {vehicle.fuel === 'Hybrid' && <Leaf className="w-3.5 h-3.5 text-green-600" />} {vehicle.fuel}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-center text-sm transition-colors block">
                  Enquire Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
