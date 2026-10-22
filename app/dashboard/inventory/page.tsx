'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Car } from 'lucide-react';

export default function InventoryAdmin() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setAuthorized(true);
    } else {
      window.location.href = '/dashboard';
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Vehicle Inventory Management</h1>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" /> Add Vehicle Stock
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Vehicle</th>
                  <th className="py-3 px-4 font-semibold">Price (Ex. Gov)</th>
                  <th className="py-3 px-4 font-semibold">Odometer</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                <tr>
                  <td className="py-4 px-4 font-medium flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Car className="w-5 h-5"/></div>
                    2022 Toyota RAV4 Cruiser Hybrid
                  </td>
                  <td className="py-4 px-4">$45,990</td>
                  <td className="py-4 px-4">24,000 km</td>
                  <td className="py-4 px-4"><span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">Available</span></td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Car className="w-5 h-5"/></div>
                    2021 Ford Ranger Wildtrak 4x4
                  </td>
                  <td className="py-4 px-4">$58,500</td>
                  <td className="py-4 px-4">41,000 km</td>
                  <td className="py-4 px-4"><span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">Available</span></td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
