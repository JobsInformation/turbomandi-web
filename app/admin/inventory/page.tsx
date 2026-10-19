'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Car, Plus, Search, Loader2 } from 'lucide-react';

export default function InventoryPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Verify Unified Authentication
  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsAuthorized(true);
      fetchInventory();
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  // 2. Fetch Data from Neon Database via existing API
  const fetchInventory = async () => {
    try {
      // Trying the admin API route first, falling back to public vehicles route if needed
      const res = await fetch('/api/admin/inventory');
      if (!res.ok) {
        const fallbackRes = await fetch('/api/vehicles');
        const fallbackData = await fallbackRes.json();
        setVehicles(Array.isArray(fallbackData) ? fallbackData : fallbackData.vehicles || []);
      } else {
        const data = await res.json();
        setVehicles(Array.isArray(data) ? data : data.vehicles || []);
      }
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) return null;

  const filteredVehicles = vehicles.filter(v => 
    v.make?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.model?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-4">
           <a href="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </a>
           <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <Car className="w-5 h-5 text-blue-600" /> Vehicle Inventory
           </h1>
         </div>
         <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
           <Plus className="w-4 h-4" /> Add Vehicle
         </button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Total Vehicles: {vehicles.length}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">Make & Model</th>
                  <th className="px-6 py-4 font-semibold">Year</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        <span>Pulling records from Neon...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No vehicles found in the database.
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle, i) => (
                    <tr key={vehicle.id || i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {vehicle.make} {vehicle.model}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{vehicle.year || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-600">
                        ${vehicle.price?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium">
                          {vehicle.status || 'Available'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
