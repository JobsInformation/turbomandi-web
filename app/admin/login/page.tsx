'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Car, ShoppingCart, LogOut, TrendingUp, Clock, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'orders' | 'workshop'>('overview');

  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('royal_admin_auth', 'true');
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    setIsLoggedIn(false);
    setPassword('');
  };

  // If NOT logged in, render the login view instantly
  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] bg-white text-gray-900 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-2xl space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-blue-100">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                VIC LMCT Certified Dealer
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Admin Portal Access
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Enter your password to unlock Royal Auto Hub management.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password (e.g., RoyalAuto#2026!)..."
                className="w-full p-4 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Unlocking Dashboard...
                </>
              ) : (
                <>
                  Unlock Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            Royal Auto Hub • Melbourne Showroom Management
          </div>

        </div>
      </div>
    );
  }

  // If LOGGED IN, render the full admin dashboard instantly
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900 leading-none">Royal Auto Hub</h1>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 block">VIC LMCT Admin Management</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-semibold text-gray-600 hover:text-blue-600 no-underline">
              View Live Website →
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-gray-200"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg shadow-blue-600/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Melbourne Showroom Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, Admin</h2>
            <p className="text-blue-100 text-sm max-w-xl">
              Monitor certified vehicle stock, process customer reservations, manage spare parts inventory, and oversee VIC LMCT compliance.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center">
            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">LMCT License No.</p>
            <p className="text-xl font-extrabold mt-1">VIC-123456</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'vehicles'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Vehicle Inventory (42)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Customer Orders & Enquiries (8)
          </button>
          <button
            onClick={() => setActiveTab('workshop')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'workshop'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Workshop Bookings (14)
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Active Stock</span>
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">42 Vehicles</p>
            <p className="text-xs text-emerald-600 font-semibold">✓ 120-Point Inspected</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Pending Enquiries</span>
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">8 Orders</p>
            <p className="text-xs text-blue-600 font-semibold">Requires follow-up</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Workshop Bookings</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">14 Bookings</p>
            <p className="text-xs text-emerald-600 font-semibold">Scheduled this week</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Monthly Revenue</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">$284,500</p>
            <p className="text-xs text-emerald-600 font-semibold">+18% from last month</p>
          </div>
        </div>

        {/* Tab Content Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">
              {activeTab === 'vehicles' ? 'Showroom Vehicle Inventory' :
               activeTab === 'orders' ? 'Customer Orders & Enquiries' :
               activeTab === 'workshop' ? 'Service & Workshop Bookings' :
               'Recent Customer Reservations & Enquiries'}
            </h3>
            <span className="text-xs text-gray-500 font-semibold">VIC LMCT Compliant</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4 rounded-l-xl">Customer / Lead</th>
                  <th className="p-4">Vehicle / Item</th>
                  <th className="p-4">Payment / Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr>
                  <td className="p-4 text-gray-900 font-bold">John Smith</td>
                  <td className="p-4">Toyota Camry Ascent Hybrid</td>
                  <td className="p-4">Credit / Debit Card</td>
                  <td className="p-4"><span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Confirmed</span></td>
                  <td className="p-4"><button className="text-blue-600 hover:underline text-xs font-bold cursor-pointer">Manage</button></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 font-bold">Sarah Jenkins</td>
                  <td className="p-4">Mazda CX-5 Touring</td>
                  <td className="p-4">Direct Bank Transfer</td>
                  <td className="p-4"><span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending Transfer</span></td>
                  <td className="p-4"><button className="text-blue-600 hover:underline text-xs font-bold cursor-pointer">Manage</button></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 font-bold">Michael O'Connor</td>
                  <td className="p-4">Civic Turbo Suspension Kit</td>
                  <td className="p-4">Showroom EFTPOS</td>
                  <td className="p-4"><span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Ready for Pickup</span></td>
                  <td className="p-4"><button className="text-blue-600 hover:underline text-xs font-bold cursor-pointer">Manage</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
