'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Car, ShoppingCart, LogOut, TrendingUp, Clock, 
  Lock, ArrowRight, Loader2, Plus, Trash2, CheckCircle, Search, X 
} from 'lucide-react';

interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  status: string;
  image: string;
}

interface Order {
  id: string;
  customer: string;
  item: string;
  method: string;
  status: string;
  date: string;
}

interface WorkshopBooking {
  id: string;
  customer: string;
  service: string;
  date: string;
  status: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'orders' | 'workshop'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Data States with localStorage persistence
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('royal_admin_vehicles');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return [
      { id: 'v1', title: '2024 Toyota Camry Ascent Hybrid', price: 42990, year: 2024, mileage: '12,400 km', transmission: 'Automatic', fuel: 'Hybrid', status: 'Available', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80' },
      { id: 'v2', title: '2023 Mazda CX-5 Touring AWD', price: 38500, year: 2023, mileage: '24,100 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
      { id: 'v3', title: '2022 Ford Ranger Wildtrak 4x4', price: 58900, year: 2022, mileage: '45,000 km', transmission: 'Automatic', fuel: 'Diesel', status: 'Reserved', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80' },
      { id: 'v4', title: '2024 Hyundai Tucson Highlander', price: 47200, year: 2024, mileage: '8,500 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80' },
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('royal_admin_orders');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return [
      { id: 'ord-1', customer: 'John Smith', item: 'Toyota Camry Ascent Hybrid', method: 'Credit / Debit Card', status: 'Confirmed', date: '2026-10-14' },
      { id: 'ord-2', customer: 'Sarah Jenkins', item: 'Mazda CX-5 Touring', method: 'Direct Bank Transfer', status: 'Pending Transfer', date: '2026-10-13' },
      { id: 'ord-3', customer: "Michael O'Connor", item: 'Civic Turbo Suspension Kit', method: 'Showroom EFTPOS', status: 'Ready for Pickup', date: '2026-10-12' },
    ];
  });

  const [bookings, setBookings] = useState<WorkshopBooking[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('royal_admin_bookings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return [
      { id: 'bk-1', customer: 'David Miller', service: '120-Point LMCT Safety Inspection', date: '2026-10-16 10:00 AM', status: 'Scheduled' },
      { id: 'bk-2', customer: 'Emma Watson', service: 'Logbook Servicing & Oil Change', date: '2026-10-16 02:00 PM', status: 'Confirmed' },
      { id: 'bk-3', customer: 'Liam Hemsworth', service: 'Brake Rotor & Pad Replacement', date: '2026-10-17 09:30 AM', status: 'Pending' },
    ];
  });

  // Modal States
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ title: '', price: 35000, year: 2024, mileage: '10,000 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: '' });

  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: '', item: '', method: 'Direct Bank Transfer', status: 'Pending' });

  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('royal_admin_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('royal_admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('royal_admin_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('royal_admin_auth', 'true');
      setIsLoggedIn(true);
      setIsLoading(false);
      showToast('Successfully logged into Royal Auto Hub Admin Portal');
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    setIsLoggedIn(false);
    setPassword('');
    showToast('Logged out successfully');
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle: Vehicle = {
      id: 'v-' + Date.now(),
      title: newVehicle.title || 'Certified Pre-Owned Vehicle',
      price: Number(newVehicle.price) || 35000,
      year: Number(newVehicle.year) || 2024,
      mileage: newVehicle.mileage || '15,000 km',
      transmission: newVehicle.transmission || 'Automatic',
      fuel: newVehicle.fuel || 'Petrol',
      status: newVehicle.status || 'Available',
      image: newVehicle.image || 'https://images.unsplash.com/photo-1550355191-aa80b1574ffc?auto=format&fit=crop&w=800&q=80'
    };
    setVehicles([vehicle, ...vehicles]);
    setShowAddVehicleModal(false);
    setNewVehicle({ title: '', price: 35000, year: 2024, mileage: '10,000 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: '' });
    showToast('Vehicle added successfully to inventory!');
  };

  const handleDeleteVehicle = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Direct state removal without window.confirm to guarantee instant interactivity
    setVehicles(prev => prev.filter(v => v.id !== id));
    showToast('Vehicle successfully removed from inventory.');
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      id: 'ord-' + Date.now(),
      customer: newOrder.customer || 'Valued Customer',
      item: newOrder.item || 'Vehicle / Spare Part',
      method: newOrder.method || 'Credit Card',
      status: newOrder.status || 'Confirmed',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([order, ...orders]);
    setShowAddOrderModal(false);
    setNewOrder({ customer: '', item: '', method: 'Direct Bank Transfer', status: 'Pending' });
    showToast('New customer order created successfully!');
  };

  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to "${newStatus}"`);
  };

  const handleDeleteOrder = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast('Order successfully deleted.');
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

  // LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

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
              Fully interactive management system for your certified inventory, customer orders, workshop appointments, and VIC LMCT compliance.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center">
            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">LMCT License No.</p>
            <p className="text-xl font-extrabold mt-1">VIC-123456</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
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
            Vehicle Inventory ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Customer Orders & Enquiries ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('workshop')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'workshop'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Workshop Bookings ({bookings.length})
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Active Stock</span>
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{vehicles.length} Vehicles</p>
            <p className="text-xs text-emerald-600 font-semibold">✓ 120-Point Inspected</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Pending Enquiries</span>
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{orders.length} Orders</p>
            <p className="text-xs text-blue-600 font-semibold">Live tracked</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase">Workshop Bookings</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{bookings.length} Bookings</p>
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

        {/* TAB 1: OVERVIEW / DEFAULT */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions Bar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Showroom Management Actions</h3>
                <p className="text-xs text-gray-500">Add new certified stock or create customer reservations instantly.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddVehicleModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> Add New Vehicle
                </button>
                <button
                  onClick={() => setShowAddOrderModal(true)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-gray-200"
                >
                  <ShoppingCart className="w-4 h-4" /> New Order Entry
                </button>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Recent Customer Reservations & Enquiries</h3>
                <span className="text-xs text-gray-500 font-semibold">VIC LMCT Compliant</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-4 rounded-l-xl">Customer Name</th>
                      <th className="p-4">Vehicle / Item</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 rounded-r-xl text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 text-gray-900 font-bold">{ord.customer}</td>
                        <td className="p-4">{ord.item}</td>
                        <td className="p-4">{ord.method}</td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 outline-none cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending Transfer">Pending Transfer</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => handleDeleteOrder(ord.id, e)}
                            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-red-200"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4 pointer-events-none" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VEHICLE INVENTORY */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                />
              </div>
              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" /> Add New Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles
                .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((v) => (
                  <div key={v.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between group">
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                        {v.status}
                      </span>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{v.year} • {v.fuel}</span>
                        <h4 className="text-base font-extrabold text-gray-900 leading-snug">{v.title}</h4>
                        <p className="text-sm text-gray-500 font-medium">{v.mileage} • {v.transmission}</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xl font-extrabold text-gray-900">${v.price.toLocaleString()}</span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteVehicle(v.id, e)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-red-200 shadow-sm"
                          title="Remove Vehicle"
                        >
                          <Trash2 className="w-4 h-4 pointer-events-none" />
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">All Customer Orders & Enquiries</h3>
                <p className="text-xs text-gray-500">Manage payment status, deposit receipts, and delivery schedules.</p>
              </div>
              <button
                onClick={() => setShowAddOrderModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" /> Add Order
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 rounded-l-xl">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Vehicle / Item</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-xs font-bold text-gray-500">{ord.id}</td>
                      <td className="p-4 text-gray-900 font-bold">{ord.customer}</td>
                      <td className="p-4">{ord.item}</td>
                      <td className="p-4">{ord.method}</td>
                      <td className="p-4 text-xs text-gray-500">{ord.date}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 outline-none cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending Transfer">Pending Transfer</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteOrder(ord.id, e)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-red-200"
                        >
                          <Trash2 className="w-4 h-4 pointer-events-none" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WORKSHOP BOOKINGS */}
        {activeTab === 'workshop' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Service & Workshop Bookings</h3>
              <p className="text-xs text-gray-500">120-Point safety inspections and mechanical servicing appointments.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 rounded-l-xl">Booking ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Service Type</th>
                    <th className="p-4">Scheduled Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {bookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-xs font-bold text-gray-500">{bk.id}</td>
                      <td className="p-4 text-gray-900 font-bold">{bk.customer}</td>
                      <td className="p-4">{bk.service}</td>
                      <td className="p-4 text-xs font-medium text-gray-700">{bk.date}</td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          {bk.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookings(bookings.filter(b => b.id !== bk.id));
                            showToast('Booking successfully removed.');
                          }}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-red-200"
                        >
                          <Trash2 className="w-4 h-4 pointer-events-none" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ADD VEHICLE MODAL */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">Add Certified Vehicle</h3>
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
                  placeholder="e.g. 2024 Toyota RAV4 Cruiser Hybrid"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
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
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Year</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.year}
                    onChange={e => setNewVehicle({ ...newVehicle, year: Number(e.target.value) })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mileage</label>
                  <input
                    type="text"
                    value={newVehicle.mileage}
                    onChange={e => setNewVehicle({ ...newVehicle, mileage: e.target.value })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Fuel Type</label>
                  <input
                    type="text"
                    value={newVehicle.fuel}
                    onChange={e => setNewVehicle({ ...newVehicle, fuel: e.target.value })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  value={newVehicle.image}
                  onChange={e => setNewVehicle({ ...newVehicle, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ORDER MODAL */}
      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">New Order & Enquiry</h3>
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
                  value={newOrder.customer}
                  onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })}
                  placeholder="e.g. Liam Smith"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Vehicle / Part Name</label>
                <input
                  type="text"
                  required
                  value={newOrder.item}
                  onChange={e => setNewOrder({ ...newOrder, item: e.target.value })}
                  placeholder="e.g. 2024 Toyota Camry"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Payment Method</label>
                <select
                  value={newOrder.method}
                  onChange={e => setNewOrder({ ...newOrder, method: e.target.value })}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  <option value="Showroom EFTPOS">Showroom EFTPOS</option>
                  <option value="Finance / Car Loan">Finance / Car Loan</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddOrderModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
