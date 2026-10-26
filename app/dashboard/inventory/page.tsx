'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Car, X } from 'lucide-react';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  odometer: string;
  status: string;
}

export default function InventoryAdmin() {
  const [authorized, setAuthorized] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: '2022 Toyota RAV4 Cruiser Hybrid', price: 45990, odometer: '24,000 km', status: 'Available' },
    { id: 2, name: '2021 Ford Ranger Wildtrak 4x4', price: 58500, odometer: '41,000 km', status: 'Available' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMakeModel, setNewMakeModel] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOdometer, setNewOdometer] = useState('');

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setAuthorized(true);
    } else {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMakeModel || !newPrice) return;

    const newVehicle: Vehicle = {
      id: Date.now(),
      name: newMakeModel,
      price: Number(newPrice),
      odometer: newOdometer || '10,000 km',
      status: 'Available'
    };

    setVehicles([newVehicle, ...vehicles]);
    setNewMakeModel('');
    setNewPrice('');
    setNewOdometer('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Vehicle Inventory Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm cursor-pointer"
          >
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
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Car className="w-5 h-5"/></div>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </td>
                    <td className="py-4 px-4">${vehicle.price.toLocaleString()}</td>
                    <td className="py-4 px-4">{vehicle.odometer}</td>
                    <td className="py-4 px-4"><span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">{vehicle.status}</span></td>
                    <td className="py-4 px-4 text-right">
                      <button onClick={() => handleDelete(vehicle.id)} className="text-red-600 hover:text-red-800 font-medium cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Vehicle Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Vehicle Stock</h2>
              <form onSubmit={handleAddVehicle} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Make, Model & Year</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2023 Kia Sportage GT-Line" 
                    value={newMakeModel} 
                    onChange={(e) => setNewMakeModel(e.target.value)} 
                    required 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price ($ Ex. Gov)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 38990" 
                    value={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)} 
                    required 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Odometer</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 15,000 km" 
                    value={newOdometer} 
                    onChange={(e) => setNewOdometer(e.target.value)} 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition-colors">Save Vehicle</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
