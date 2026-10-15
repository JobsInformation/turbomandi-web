'use client';

import Link from 'next/link';
import { ShieldCheck, Car, ShoppingCart, LogOut, TrendingUp, Clock } from 'lucide-react';

export default function AdminPage() {
  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    document.cookie = "royal_admin_auth=; path=/; max-age=0";
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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

        {/* Recent Orders / Enquiries Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Recent Customer Reservations & Enquiries</h3>
            <span className="text-xs text-gray-500 font-semibold">Showing latest submissions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4 rounded-l-xl">Customer Name</th>
                  <th className="p-4">Vehicle / Item</th>
                  <th className="p-4">Payment Method</th>
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
                  <td className="p-4"><button className="text-blue-600 hover:underline text-xs font-bold">View Details</button></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 font-bold">Sarah Jenkins</td>
                  <td className="p-4">Mazda CX-5 Touring</td>
                  <td className="p-4">Direct Bank Transfer</td>
                  <td className="p-4"><span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending Transfer</span></td>
                  <td className="p-4"><button className="text-blue-600 hover:underline text-xs font-bold">View Details</button></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 font-bold">Michael O'Connor</td>
                  <td className="p-4">Civic Turbo Suspension Kit</td>
                  <td className="p-4">Showroom EFTPOS</td>
                  <td className="p-4"><span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Ready for Pickup</span></td>
                  <td className="p-4"><button className="text-blue-600 hover:underline text-xs font-bold">View Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
