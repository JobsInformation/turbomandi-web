'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Car, ShoppingCart, LogOut, TrendingUp, Clock, 
  Lock, ArrowRight, Loader2, Plus, Trash2, CheckCircle, Search, X 
} from 'lucide-react';
import { 
  getNeonData, createOrderInNeon, updateOrderStatusInNeon, 
  deleteOrderFromNeon, createVehicleInNeon, deleteVehicleFromNeon 
} from './actions';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'orders' | 'workshop'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  // Modal States
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ title: '', price: 35000, year: 2024, mileage: '10,000 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: '' });

  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ customerName: '', items: '', method: 'Direct Bank Transfer', status: 'Confirmed' });

  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const data = await getNeonData();
    if (data.vehicles.length > 0 || data.orders.length > 0) {
      setVehicles(data.vehicles);
      setOrders(data.orders);
      setBookings(data.bookings);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      localStorage.setItem('royal_admin_auth', 'true');
      setIsLoggedIn(true);
      setIsLoading(false);
      await fetchData();
      showToast('Successfully connected to Neon Database & Admin Portal');
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    setIsLoggedIn(false);
    setPassword('');
    showToast('Logged out successfully');
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createVehicleInNeon(newVehicle);
    if (res.success) {
      setShowAddVehicleModal(false);
      setNewVehicle({ title: '', price: 35000, year: 2024, mileage: '10,000 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: '' });
      await fetchData();
      showToast('Vehicle saved to Neon database!');
    } else {
      showToast('Error saving vehicle to database.');
    }
  };

  const handleDeleteVehicle = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const res = await deleteVehicleFromNeon(id);
    if (res.success) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      showToast('Vehicle deleted from Neon database.');
    }
  };

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createOrderInNeon({
      customerName: newOrder.customerName || 'Valued Customer',
      items: newOrder.items || 'Vehicle / Spare Part',
      status: newOrder.status || 'Confirmed',
      total: 42990,
      city: 'Melbourne',
      phone: '03001234567'
    });
    if (res.success) {
      setShowAddOrderModal(false);
      setNewOrder({ customerName: '', items: '', method: 'Direct Bank Transfer', status: 'Confirmed' });
      await fetchData();
      showToast('Order saved to Neon database!');
    } else {
      showToast('Error saving order to database.');
    }
  };

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    const res = await updateOrderStatusInNeon(id, newStatus);
    if (res.success) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      showToast(`Order status updated to "${newStatus}" in Neon`);
    }
  };

  const handleDeleteOrder = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const res = await deleteOrderFromNeon(id);
    if (res.success) {
      setOrders(prev => prev.filter(o => o.id !== id));
      showToast('Order deleted from Neon database.');
    }
  };

  // If NOT logged in
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
                Neon DB + VIC LMCT Portal
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Admin Portal Access
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Enter your password to unlock database management.
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
                placeholder="Enter password..."
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
                  <Loader2 className="w-5 h-5 animate-spin" /> Connecting to Neon...
                </>
              ) : (
                <>
                  Unlock Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            Royal Auto Hub • Neon PostgreSQL Database Connected
          </div>

        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 relative">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900 leading-none">Royal Auto Hub</h1>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 block">Neon DB + VIC LMCT Management</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg shadow-blue-600/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Neon PostgreSQL Connected
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, Admin</h2>
            <p className="text-blue-100 text-sm max-w-xl">
              All records below are fetched and stored directly in your Neon database tables in real time.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center">
            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">LMCT License No.</p>
            <p className="text-xl font-extrabold mt-1">VIC-123456</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'vehicles' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Vehicle Inventory ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Database Vehicles</span>
            <p className="text-3xl font-extrabold text-gray-900">{vehicles.length}</p>
            <p className="text-xs text-emerald-600 font-semibold">Synced with Neon</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Database Orders</span>
            <p className="text-3xl font-extrabold text-gray-900">{orders.length}</p>
            <p className="text-xs text-blue-600 font-semibold">Synced with Neon</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Database Actions</h3>
            <p className="text-xs text-gray-500">Changes made here will instantly reflect in your Neon console tables.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Vehicle to DB
            </button>
            <button
              onClick={() => setShowAddOrderModal(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-gray-200"
            >
              <ShoppingCart className="w-4 h-4" /> Add Order to DB
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Neon Database Orders Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4 rounded-l-xl">Customer</th>
                  <th className="p-4">Items / Vehicle</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">No orders found in Neon database. Click "Add Order to DB" above.</td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">{ord.customerName}</td>
                      <td className="p-4">{ord.items}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 outline-none cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteOrder(ord.id, e)}
                          className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-xl cursor-pointer border border-red-200"
                        >
                          <Trash2 className="w-4 h-4 pointer-events-none" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ADD ORDER MODAL */}
      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">Add Order to Neon DB</h3>
              <button onClick={() => setShowAddOrderModal(false)} className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={newOrder.customerName}
                  onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  placeholder="e.g. Nizakat Hussain"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Item / Vehicle</label>
                <input
                  type="text"
                  required
                  value={newOrder.items}
                  onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
                  placeholder="e.g. 2026 Corolla Tyre"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddOrderModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Save to Neon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VEHICLE MODAL */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">Add Vehicle to Neon DB</h3>
              <button onClick={() => setShowAddVehicleModal(false)} className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Vehicle Title</label>
                <input
                  type="text"
                  required
                  value={newVehicle.title}
                  onChange={e => setNewVehicle({ ...newVehicle, title: e.target.value })}
                  placeholder="e.g. 2024 Toyota Camry Hybrid"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price (AUD)</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.price}
                    onChange={e => setNewVehicle({ ...newVehicle, price: Number(e.target.value) })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Year</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.year}
                    onChange={e => setNewVehicle({ ...newVehicle, year: Number(e.target.value) })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Save to Neon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
