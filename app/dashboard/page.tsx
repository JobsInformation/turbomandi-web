'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, Car, ShoppingCart, Calendar, Wrench, LogOut } from 'lucide-react';

export default function UnifiedDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check if already logged in on page load
  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // 2. Handle Login (No URL redirects!)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'RoyalAuto#2026!' || password === 'admin') {
      localStorage.setItem('royal_admin_auth', 'true');
      setIsAuthenticated(true); // Instantly swap the UI
      setError('');
    } else {
      setError('Invalid password. Try again.');
    }
  };

  // 3. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    setIsAuthenticated(false); // Instantly swap back to login UI
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ==========================================
  // UI STATE 1: THE LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Portal Access</h1>
          <p className="text-slate-500 text-center text-sm mb-6">Unified Secure Login</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter admin password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/20"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI STATE 2: THE DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
         <h1 className="text-xl font-bold text-slate-800">Royal Auto Hub Admin</h1>
         <button 
           onClick={handleLogout}
           className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
         >
           <LogOut className="w-4 h-4" /> Lock Portal
         </button>
      </div>

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
