'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, ClipboardList, Wrench, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const session = localStorage.getItem('turbomandi_user');
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(session);
      if (user.role !== 'ADMIN') {
        router.push('/');
      } else {
        setIsAdmin(true);
      }
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('turbomandi_user');
    router.push('/login');
  };

  if (!isMounted || !isAdmin) return null;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-2 transition">
            &larr; Back to Store Home
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold text-red-500 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-3 mb-10">
          <ShieldAlert className="w-8 h-8 text-red-600" />
          Turbomandi <span className="text-red-600">Admin Control Panel</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Orders Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition flex flex-col justify-between">
            <div>
              <div className="bg-zinc-950 border border-zinc-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <ClipboardList className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Customer Orders</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Manage incoming part orders, view customer delivery details, addresses, and purchased items.
              </p>
            </div>
            <Link href="/admin/orders" className="text-red-600 font-bold text-sm flex items-center gap-2 hover:text-red-500 transition">
              View Orders &rarr;
            </Link>
          </div>

          {/* Workshop Bookings Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition flex flex-col justify-between group">
            <div>
              <div className="bg-zinc-950 border border-zinc-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:border-red-600/50 transition">
                <Wrench className="w-6 h-6 text-zinc-400 group-hover:text-red-600 transition" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Workshop Bookings</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Service appointments and workshop slot scheduling.
              </p>
            </div>
            <Link href="/admin/bookings" className="text-red-600 font-bold text-sm flex items-center gap-2 hover:text-red-500 transition">
              View Bookings &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
