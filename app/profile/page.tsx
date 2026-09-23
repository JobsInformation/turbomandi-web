'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Package, Wrench, Calendar, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ orders: any[], bookings: any[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        alert(result.error || 'Failed to fetch history');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-2 mb-8 transition w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Store Home
        </Link>

        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Customer Order & Booking Portal</h1>
        <p className="text-zinc-500 text-sm mb-8">Enter your email address to review your past parts purchases and workshop appointments.</p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-12">
          <input 
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your registered email address..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-2xl font-bold flex items-center gap-2 transition disabled:opacity-50"
          >
            <Search className="w-4 h-4" /> {loading ? 'Searching...' : 'View History'}
          </button>
        </form>

        {data && (
          <div className="space-y-10">
            {/* Orders Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-red-500 flex items-center gap-2">
                <Package className="w-5 h-5" /> Parts Orders ({data.orders.length})
              </h2>

              {data.orders.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-zinc-500 text-sm">No parts orders found for this email.</div>
              ) : (
                <div className="space-y-3">
                  {data.orders.map(order => (
                    <div key={order.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="text-xs font-mono text-zinc-500">ID: {order.id}</div>
                        <div className="font-bold text-white text-sm mt-1">Total: PKR {order.total.toLocaleString()}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()} • Status: <span className="text-emerald-400 font-bold">{order.status}</span></div>
                      </div>
                      <Link href={`/invoice/${order.id}`} className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition">
                        View Invoice &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Workshop Bookings Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-red-500 flex items-center gap-2">
                <Wrench className="w-5 h-5" /> Workshop Appointments ({data.bookings.length})
              </h2>

              {data.bookings.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-zinc-500 text-sm">No workshop bookings found for this email.</div>
              ) : (
                <div className="space-y-3">
                  {data.bookings.map(booking => (
                    <div key={booking.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="font-bold text-white text-sm">{booking.serviceType} for {booking.vehicleModel}</div>
                        <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-red-500" /> {booking.preferredDate} at {booking.preferredTime}
                        </div>
                      </div>
                      <span className="bg-emerald-950/60 border border-emerald-900/50 text-emerald-400 text-[10px] font-black uppercase px-3 py-1 rounded-lg">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
