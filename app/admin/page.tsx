'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, ShoppingCart, Calendar, Wrench, LogOut } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for our secure local storage token
    const auth = localStorage.getItem('royal_admin_auth');
    
    if (auth === 'true') {
      setIsAuthorized(true);
    } else {
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    document.cookie = "royal_admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
         <h1 className="text-xl font-bold text-slate-800">Royal Auto Hub Admin</h1>
         <button 
           onClick={handleLogout}
           className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
         >
           <LogOut className="w-4 h-4" /> Logout
         </button>
      </div>

      {/* Main Dashboard Grid */}
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/admin/inventory" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                    <Car className="w-8 h-8" />
                </div>
                <span className="font-semibold text-slate-700">Vehicle Inventory</span>
            </Link>

            <Link href="/admin/orders" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="p-4 bg-green-50 text-green-600 rounded-full group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-8 h-8" />
                </div>
                <span className="font-semibold text-slate-700">Customer Orders</span>
            </Link>

            <Link href="/admin/bookings" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-full group-hover:scale-110 transition-transform">
                    <Calendar className="w-8 h-8" />
                </div>
                <span className="font-semibold text-slate-700">Service Bookings</span>
            </Link>

            <Link href="/parts" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="p-4 bg-orange-50 text-orange-600 rounded-full group-hover:scale-110 transition-transform">
                    <Wrench className="w-8 h-8" />
                </div>
                <span className="font-semibold text-slate-700">Parts Directory</span>
            </Link>
        </div>
      </div>
    </div>
  );
}
