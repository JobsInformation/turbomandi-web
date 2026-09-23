'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Car, Package, Trash2, PlusCircle, ExternalLink } from 'lucide-react';

export default function AdminInventoryPage() {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'parts'>('vehicles');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vRes, pRes] = await Promise.all([
        fetch('/api/vehicles/list'),
        fetch('/api/parts/list'),
      ]);
      if (vRes.ok) setVehicles(await vRes.json());
      if (pRes.ok) setParts(await pRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteVehicle = async (id: string) => {
    if (!confirm('Are you sure you want to remove this vehicle listing?')) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePart = async (id: string) => {
    if (!confirm('Are you sure you want to remove this auto part?')) return;
    try {
      const res = await fetch(`/api/parts/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-black uppercase">Inventory Control</h1>
            <p className="text-xs text-zinc-400 mt-1">Manage, inspect, or delete live inventory records</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={activeTab === 'vehicles' ? '/vehicles/new' : '/parts/new'}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Add {activeTab === 'vehicles' ? 'Vehicle' : 'Part'}
            </Link>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'vehicles'
                ? 'bg-zinc-800 border border-red-600 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4 text-red-500" /> Vehicles ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('parts')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'parts'
                ? 'bg-zinc-800 border border-yellow-500 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 text-yellow-500" /> Parts ({parts.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400 text-sm">Loading inventory...</div>
        ) : activeTab === 'vehicles' ? (
          vehicles.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-zinc-400 text-sm">
              No vehicles listed.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-400 uppercase">
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Mileage</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-xs">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-zinc-800/40">
                      <td className="p-4 font-bold text-white">
                        {v.make} {v.model} ({v.year})
                      </td>
                      <td className="p-4 text-zinc-400 uppercase font-mono">{v.type}</td>
                      <td className="p-4 font-black text-red-500">PKR {v.price.toLocaleString()}</td>
                      <td className="p-4 text-zinc-400">{v.mileage.toLocaleString()} km</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/vehicles/${v.id}`} target="_blank" className="p-1 text-zinc-400 hover:text-white bg-zinc-800 rounded">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button onClick={() => deleteVehicle(v.id)} className="p-1 text-zinc-400 hover:text-red-500 bg-zinc-800 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : parts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-zinc-400 text-sm">
            No parts in stock.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-400 uppercase">
                  <th className="p-4">Part Name</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-xs">
                {parts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40">
                    <td className="p-4 font-bold text-white">{p.name}</td>
                    <td className="p-4 font-mono text-zinc-400">{p.sku}</td>
                    <td className="p-4 text-zinc-300">{p.category}</td>
                    <td className="p-4 font-black text-red-500">PKR {p.price.toLocaleString()}</td>
                    <td className="p-4 text-emerald-400 font-bold">{p.stock} units</td>
                    <td className="p-4 text-right">
                      <button onClick={() => deletePart(p.id)} className="p-1 text-zinc-400 hover:text-red-500 bg-zinc-800 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
