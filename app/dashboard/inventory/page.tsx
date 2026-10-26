'use client';
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Car, X } from 'lucide-react';

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
  imageUrl: string | null;
}

const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Ute', 'Wagon', 'Van', 'Coupe'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const STATUSES = ['Available', 'Reserved', 'Sold'];

const emptyForm = {
  make: '',
  model: '',
  year: '',
  price: '',
  odometer: '',
  body: '',
  trans: '',
  fuel: '',
};

const inputClass =
  'w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none';

export default function InventoryAdmin() {
  const [authorized, setAuthorized] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<File | null>(null);

  const loadVehicles = useCallback(async () => {
    try {
      const res = await fetch('/api/vehicles', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load vehicles');
      setVehicles(await res.json());
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setAuthorized(true);
      loadVehicles();
    } else {
      window.location.href = '/dashboard';
    }
  }, [loadVehicles]);

  const update =
    (key: keyof typeof emptyForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleAddVehicle = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (image) data.append('image', image);

      const res = await fetch('/api/vehicles', { method: 'POST', body: data });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Failed to save vehicle');
      }

      setForm(emptyForm);
      setImage(null);
      setIsModalOpen(false);
      await loadVehicles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save vehicle');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vehicle? This cannot be undone.')) return;
    const res = await fetch(`/api/vehicles?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) {
      setError('Failed to delete vehicle');
      return;
    }
    setError('');
    setVehicles((list) => list.filter((v) => v.id !== id));
  };

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch('/api/vehicles', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError('Failed to update status');
      return;
    }
    setError('');
    setVehicles((list) => list.map((v) => (v.id === id ? { ...v, status } : v)));
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

        {error && !isModalOpen && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Vehicle</th>
                  <th className="py-3 px-4 font-semibold">Price (Ex. Gov)</th>
                  <th className="py-3 px-4 font-semibold">Odometer</th>
                  <th className="py-3 px-4 font-semibold">Specs</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="py-8 px-4 text-center text-slate-400">Loading vehicles…</td>
                  </tr>
                )}
                {!isLoading && vehicles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 px-4 text-center text-slate-400">
                      No vehicles yet. Click “Add Vehicle Stock” to add one.
                    </td>
                  </tr>
                )}
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium">
                      <div className="flex items-center gap-3">
                        {vehicle.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={vehicle.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Car className="w-5 h-5" /></div>
                        )}
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </div>
                    </td>
                    <td className="py-4 px-4">${vehicle.price.toLocaleString()}</td>
                    <td className="py-4 px-4">{vehicle.odometer ?? '—'}</td>
                    <td className="py-4 px-4 text-slate-500">
                      {[vehicle.body, vehicle.trans, vehicle.fuel].filter(Boolean).join(' · ') || '—'}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={vehicle.status}
                        onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                        className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border-0 cursor-pointer"
                      >
                        {[...new Set([vehicle.status, ...STATUSES])].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                      >
                        Delete
                      </button>
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
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Vehicle Stock</h2>

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">{error}</div>
              )}

              <form onSubmit={handleAddVehicle} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
                    <input type="text" placeholder="e.g. Kia" value={form.make} onChange={update('make')} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                    <input type="text" placeholder="e.g. Sportage GT-Line" value={form.model} onChange={update('model')} required className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                    <input type="number" placeholder="e.g. 2023" min={1950} max={new Date().getFullYear() + 1} value={form.year} onChange={update('year')} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price ($ Ex. Gov)</label>
                    <input type="number" placeholder="e.g. 38990" min={0} step="any" value={form.price} onChange={update('price')} required className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Odometer</label>
                  <input type="text" placeholder="e.g. 15,000 km" value={form.odometer} onChange={update('odometer')} className={inputClass} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Body</label>
                    <select value={form.body} onChange={update('body')} className={inputClass}>
                      <option value="">—</option>
                      {BODY_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Trans.</label>
                    <select value={form.trans} onChange={update('trans')} className={inputClass}>
                      <option value="">—</option>
                      {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fuel</label>
                    <select value={form.fuel} onChange={update('fuel')} className={inputClass}>
                      <option value="">—</option>
                      {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Photo (optional, max 4 MB)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    className="w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSaving} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white py-2.5 rounded-lg font-medium transition-colors">
                    {isSaving ? 'Saving…' : 'Save Vehicle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
