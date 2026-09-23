'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function NewPartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'General',
    price: '',
    stock: ''
  });

  const categories = ['Engine', 'Brakes', 'Suspension', 'Filters', 'Lubricants', 'General'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10)
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create part');
      }
      
      // Redirect back to parts page and refresh data
      router.push('/parts');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/parts" className="text-zinc-400 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Parts List
        </Link>
        
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">
          Add <span className="text-red-600">New Part</span>
        </h1>

        {error && (
          <div className="bg-red-950/50 border border-red-900 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Part Name *</label>
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. Toyota Corolla Brake Pads"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">SKU (Optional)</label>
              <input
                name="sku"
                type="text"
                placeholder="e.g. TOY-BP-100"
                value={formData.sku}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Category *</label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Price (PKR) *</label>
              <input
                required
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Initial Stock *</label>
              <input
                required
                name="stock"
                type="number"
                min="0"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving Part...' : 'Save Part to Inventory'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
