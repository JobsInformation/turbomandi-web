'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, MapPin, CheckCircle2, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TrackOrderPage() {
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const savedOrders = JSON.parse(localStorage.getItem('turbomandi_admin_orders') || '[]');
    const found = savedOrders.find((o: any) => o.id.toLowerCase() === searchId.trim().toLowerCase());

    setOrder(found || null);
    setSearched(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-2 mb-8 transition w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Store Home
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-900/30">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Track Your Order</h1>
          <p className="text-zinc-500 text-sm">Enter your Order ID to check real-time shipping status and details.</p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
            <input 
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. ORD-8832"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-red-600 uppercase font-mono"
            />
          </div>
          <button 
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-2xl font-bold text-sm uppercase tracking-wider transition"
          >
            Track
          </button>
        </form>

        {/* Results Area */}
        {searched && (
          <div>
            {order ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-6">
                  <div>
                    <span className="text-xs font-bold text-zinc-500 uppercase">Order Reference</span>
                    <h3 className="text-xl font-black text-white font-mono">{order.id}</h3>
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                      order.status === 'SHIPPED' 
                      ? 'bg-emerald-950/40 text-emerald-500 border border-emerald-900/50' 
                      : 'bg-orange-950/40 text-orange-500 border border-orange-900/50'
                    }`}>
                      {order.status === 'SHIPPED' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-2xl">
                    <span className="text-zinc-500 text-xs font-bold uppercase block mb-1">Customer Name</span>
                    <span className="font-bold text-zinc-200">{order.customer}</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-2xl">
                    <span className="text-zinc-500 text-xs font-bold uppercase block mb-1">Total Amount</span>
                    <span className="font-bold text-emerald-500">PKR {order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-2xl text-sm">
                  <span className="text-zinc-500 text-xs font-bold uppercase block mb-1">Delivery Address</span>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0" /> {order.address}
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-2xl text-sm">
                  <span className="text-zinc-500 text-xs font-bold uppercase block mb-1">Ordered Items</span>
                  <p className="text-zinc-300 font-medium">{order.items}</p>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
                <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-zinc-300 mb-1">Order Not Found</h3>
                <p className="text-xs">No active order matches ID <span className="font-mono text-zinc-300 uppercase">{searchId}</span>. Please verify your ID.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
