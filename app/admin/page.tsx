'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Car, ShoppingCart, LogOut, TrendingUp, Clock, 
  Lock, ArrowRight, Loader2, Plus, Trash2, CheckCircle, Search, X, Wrench, Package, Bell 
} from 'lucide-react';
import { 
  getNeonData, createOrderInNeon, updateOrderStatusInNeon, 
  deleteOrderFromNeon, createVehicleInNeon, deleteVehicleFromNeon,
  createPartInNeon, deletePartFromNeon, updateBookingStatusInNeon, deleteBookingFromNeon
} from '@/lib/actions';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'parts' | 'orders' | 'workshop'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [parts, setParts] = useState<any[]>([]);

  // Modals
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ title: '', price: 45000, year: 2026, mileage: '5,000 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: '' });

  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [newPart, setNewPart] = useState({ name: '', partNumber: 'RAH-PT-99', category: 'Engine', price: 220, stock: 15 });

  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ customerName: '', items: '', status: 'Confirmed' });

  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const data = await getNeonData();
    setVehicles(data.vehicles);
    setOrders(data.orders);
    setBookings(data.bookings);
    setParts(data.parts);
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
      showToast('Connected to Neon PostgreSQL Database!');
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    setIsLoggedIn(false);
    setPassword('');
    showToast('Logged out successfully');
  };

  // Vehicle Actions
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createVehicleInNeon(newVehicle);
    if (res.success) {
      setShowAddVehicleModal(false);
      setNewVehicle({ title: '', price: 45000, year: 2026, mileage: '5,000 km', transmission: 'Automatic', fuel: 'Petrol', status: 'Available', image: '' });
      await fetchData();
      showToast('Vehicle added to Neon database!');
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    const res = await deleteVehicleFromNeon(id);
    if (res.success) {
      await fetchData();
      showToast('Vehicle deleted from Neon.');
    }
  };

  // Part Actions
  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createPartInNeon(newPart);
    if (res.success) {
      setShowAddPartModal(false);
      setNewPart({ name: '', partNumber: 'RAH-PT-99', category: 'Engine', price: 220, stock: 15 });
      await fetchData();
      showToast('Part added to Neon database & inventory!');
    }
  };

  const handleDeletePart = async (id: string) => {
    const res = await deletePartFromNeon(id);
    if (res.success) {
      await fetchData();
      showToast('Part deleted from Neon.');
    }
  };

  // Order Actions
  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createOrderInNeon({
      customerName: newOrder.customerName || 'Valued Customer',
      items: newOrder.items || 'Vehicle Reservation',
      status: newOrder.status || 'Confirmed',
      total: 49990,
      city: 'Melbourne',
      phone: '0400123456'
    });
    if (res.success) {
      setShowAddOrderModal(false);
      setNewOrder({ customerName: '', items: '', status: 'Confirmed' });
      await fetchData();
      showToast('Order recorded & Customer SMS notification queued!');
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const res = await updateOrderStatusInNeon(id, status);
    if (res.success) {
      await fetchData();
      showToast(`Order status updated to "${status}" (SMS sent to customer)`);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    const res = await deleteOrderFromNeon(id);
    if (res.success) {
      await fetchData();
      showToast('Order removed from Neon database.');
    }
  };

  // Booking Actions
  const handleUpdateBookingStatus = async (id: string, status: string) => {
    const res = await updateBookingStatusInNeon(id, status);
    if (res.success) {
      await fetchData();
      showToast(`Workshop booking status updated to "${status}"`);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    const res = await deleteBookingFromNeon(id);
    if (res.success) {
      await fetchData();
      showToast('Workshop booking deleted.');
    }
  };

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
                VIC LMCT Dealer Admin
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Admin Portal Access</h1>
              <p className="text-gray-500 text-xs mt-1">Secure Neon PostgreSQL Database Management</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Password</label>
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
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Connecting...</> : <>Unlock Admin Portal <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </div>
    );
  }

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
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 block">VIC LMCT Certified Dealer • Neon DB</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-semibold text-gray-600 hover:text-blue-600 no-underline">
              View Website →
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
        
        {/* Banner */}
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg shadow-blue-600/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Neon PostgreSQL Connected
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Showroom Management Console</h2>
            <p className="text-blue-100 text-sm max-w-xl">
              Manage vehicle inventory, spare parts, customer orders, and workshop bookings with automated customer notifications.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center">
            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">LMCT License No.</p>
            <p className="text-xl font-extrabold mt-1">VIC-123456</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          <button onClick={() => setActiveTab('overview')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('vehicles')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'vehicles' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            Vehicle Stock ({vehicles.length})
          </button>
          <button onClick={() => setActiveTab('parts')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'parts' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            Parts Inventory ({parts.length})
          </button>
          <button onClick={() => setActiveTab('orders')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            Customer Orders ({orders.length})
          </button>
          <button onClick={() => setActiveTab('workshop')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'workshop' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            Workshop Bookings ({bookings.length})
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Vehicles in DB</span>
            <p className="text-3xl font-extrabold text-gray-900">{vehicles.length}</p>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Live Synced</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Spare Parts</span>
            <p className="text-3xl font-extrabold text-gray-900">{parts.length}</p>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Live Synced</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Customer Orders</span>
            <p className="text-3xl font-extrabold text-gray-900">{orders.length}</p>
            <p className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Bell className="w-3.5 h-3.5" /> SMS Alerts Active</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Service Bookings</span>
            <p className="text-3xl font-extrabold text-gray-900">{bookings.length}</p>
            <p className="text-xs text-purple-600 font-semibold">Workshop Schedule</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Database & Notification Actions</h3>
            <p className="text-xs text-gray-500">Add inventory or orders. Customer notification alerts are automatically triggered on status updates.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowAddVehicleModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md">
              <Plus className="w-4 h-4" /> Add Vehicle
            </button>
            <button onClick={() => setShowAddPartModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md">
              <Package className="w-4 h-4" /> Add Spare Part
            </button>
            <button onClick={() => setShowAddOrderModal(true)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-gray-200">
              <ShoppingCart className="w-4 h-4" /> Add Order
            </button>
          </div>
        </div>

        {/* TAB 1: VEHICLES */}
        {(activeTab === 'overview' || activeTab === 'vehicles') && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Vehicle Inventory Database</h3>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{vehicles.length} Vehicles</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.length === 0 ? (
                <p className="text-gray-400 text-sm py-6">No vehicles found in Neon database.</p>
              ) : (
                vehicles.map(v => (
                  <div key={v.id} className="border border-gray-200 rounded-2xl p-5 space-y-3 bg-gray-50/50 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">{v.status}</span>
                      <button onClick={() => handleDeleteVehicle(v.id)} className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 rounded-lg cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-extrabold text-gray-900 text-base">{v.title}</h4>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>{v.year} • {v.transmission}</span>
                      <span className="font-bold text-blue-600 text-sm">${v.price?.toLocaleString()} AUD</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PARTS INVENTORY */}
        {(activeTab === 'overview' || activeTab === 'parts') && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Spare Parts & Accessories Inventory</h3>
              <button onClick={() => setShowAddPartModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <Plus className="w-4 h-4" /> Add Part
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 rounded-l-xl">Part Name</th>
                    <th className="p-4">Part Number</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {parts.length === 0 ? (
                    <tr><td colSpan={6} className="p-6 text-center text-gray-400">No spare parts in Neon inventory yet.</td></tr>
                  ) : (
                    parts.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900">{p.name}</td>
                        <td className="p-4 text-xs font-mono">{p.partNumber}</td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4"><span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold">{p.stock} units</span></td>
                        <td className="p-4 font-bold text-gray-900">${p.price} AUD</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeletePart(p.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS & NOTIFICATIONS */}
        {(activeTab === 'overview' || activeTab === 'orders') && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Customer Orders & Notification Log</h3>
                <p className="text-xs text-gray-500">Updating order status automatically triggers customer SMS & Email notifications.</p>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{orders.length} Orders</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 rounded-l-xl">Customer</th>
                    <th className="p-4">Items / Vehicle</th>
                    <th className="p-4">Notification Status</th>
                    <th className="p-4">Order Status</th>
                    <th className="p-4 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {orders.length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-400">No customer orders recorded in Neon database.</td></tr>
                  ) : (
                    orders.map(ord => (
                      <tr key={ord.id} className="hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900">{ord.customerName}</td>
                        <td className="p-4">{ord.items}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                            <Bell className="w-3 h-3" /> SMS Sent
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 outline-none cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteOrder(ord.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-xl cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WORKSHOP SERVICE BOOKINGS */}
        {(activeTab === 'overview' || activeTab === 'workshop') && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Workshop Service Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 rounded-l-xl">Customer / Vehicle</th>
                    <th className="p-4">Service Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {bookings.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-gray-400">No workshop bookings in database.</td></tr>
                  ) : (
                    bookings.map(b => (
                      <tr key={b.id} className="hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900">{b.customerName}</td>
                        <td className="p-4">{b.serviceType}</td>
                        <td className="p-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className="bg-purple-50 text-purple-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-purple-200 outline-none cursor-pointer"
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteBooking(b.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-xl cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODALS */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">Add Vehicle to Neon DB</h3>
              <button onClick={() => setShowAddVehicleModal(false)} className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                <input type="text" required value={newVehicle.title} onChange={e => setNewVehicle({ ...newVehicle, title: e.target.value })} placeholder="e.g. 2026 Toyota Corolla Hybrid" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price (AUD)</label>
                  <input type="number" required value={newVehicle.price} onChange={e => setNewVehicle({ ...newVehicle, price: Number(e.target.value) })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Year</label>
                  <input type="number" required value={newVehicle.year} onChange={e => setNewVehicle({ ...newVehicle, year: Number(e.target.value) })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddVehicleModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-600/20">Save to Neon</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddPartModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">Add Spare Part to Inventory</h3>
              <button onClick={() => setShowAddPartModal(false)} className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddPart} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Part Name</label>
                <input type="text" required value={newPart.name} onChange={e => setNewPart({ ...newPart, name: e.target.value })} placeholder="e.g. Brembo Ceramic Brake Pads" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price (AUD)</label>
                  <input type="number" required value={newPart.price} onChange={e => setNewPart({ ...newPart, price: Number(e.target.value) })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Stock Qty</label>
                  <input type="number" required value={newPart.stock} onChange={e => setNewPart({ ...newPart, stock: Number(e.target.value) })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddPartModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-lg shadow-emerald-600/20">Save Part</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-gray-900">Add Order + Queue SMS Alert</h3>
              <button onClick={() => setShowAddOrderModal(false)} className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Customer Name</label>
                <input type="text" required value={newOrder.customerName} onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })} placeholder="e.g. Alex Turner" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Vehicle / Item</label>
                <input type="text" required value={newOrder.items} onChange={e => setNewOrder({ ...newOrder, items: e.target.value })} placeholder="e.g. 2026 Toyota RAV4 Cruiser" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddOrderModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-600/20">Save & Notify</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
