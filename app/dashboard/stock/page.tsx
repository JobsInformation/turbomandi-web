'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Car, Leaf, Search, Plus } from 'lucide-react';

export default function StockAdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample live stock matching your dealership inventory
  const stockItems = [
    { id: 1, year: 2022, make: 'Toyota', model: 'RAV4', variant: 'Cruiser', price: 45990, body: 'SUV', fuel: 'Hybrid', odometer: '24,000 km', trans: 'Auto', status: 'Available' },
    { id: 2, year: 2021, make: 'Ford', model: 'Ranger', variant: 'Wildtrak', price: 58500, body: 'Ute', fuel: 'Diesel', odometer: '41,000 km', trans: 'Auto', status: 'Available' },
    { id: 3, year: 2023, make: 'Toyota', model: 'Camry', variant: 'Ascent', price: 34990, body: 'Sedan', fuel: 'Hybrid', odometer: '12,000 km', trans: 'Auto', status: 'Under Offer' },
  ];

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setAuthorized(true);
    } else {
      window.location.href = '/dashboard';
    }
  }, []);

  const filteredStock = stockItems.filter(item => 
    `${item.year} ${item.make} ${item.model} ${item.variant}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Live Stock Catalog</h1>
            <p className="text-slate-500 text-sm mt-1">Overview of vehicles currently published on Royal Auto Hub.</p>
          </div>
          <Link href="/dashboard/inventory" className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" /> Manage Inventory
          </Link>
        </div>

        {/* Search Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search stock by make, model, or year..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-700"
          />
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStock.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${vehicle.status === 'Available' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {vehicle.status}
                  </span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{vehicle.body}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1">{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}</h3>
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

              <Link href="/dashboard/inventory" className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-center text-sm transition-colors block">
                Edit Stock Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
