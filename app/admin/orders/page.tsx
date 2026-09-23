"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, inventoryRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/inventory')
      ]);

      if (!ordersRes.ok) throw new Error('Failed to fetch orders');
      
      const ordersData = await ordersRes.json();
      setOrders(ordersData);

      if (inventoryRes.ok) {
        const inventoryData = await inventoryRes.json();
        setLowStockItems(inventoryData.lowStockProducts || []);
      }

      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      setOrders((prev: any) => 
        prev.map((order: any) => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update order status.');
    } finally {
      setUpdating(null);
    }
  };

  // Filter orders based on search input and active status tab
  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch =
      order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.toLowerCase().includes(search.toLowerCase()) ||
      order.id?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || (order.status || 'PENDING') === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link href="/parts" className="text-sm text-zinc-400 hover:text-white mb-2 inline-block">&larr; Back to Parts Store</Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-red-500">📦</span> PARTS ORDERS
            </h1>
            <p className="text-zinc-400 mt-1">Review, fulfill, and manage customer part deliveries</p>
          </div>
          <button onClick={fetchData} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
            Refresh
          </button>
        </div>

        {/* Inventory Alert Banner */}
        {lowStockItems.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
              <span>⚠️ LOW STOCK WARNING</span>
              <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                {lowStockItems.length} item(s) low
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {lowStockItems.map((item: any) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                  <span className="text-zinc-200 font-medium">{item.name}</span>
                  <span className="text-red-400 font-bold">
                    {item.stock <= 0 ? 'Out of Stock' : `Only ${item.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search by customer name, phone, or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 w-full md:w-auto overflow-x-auto">
            {['ALL', 'PENDING', 'SHIPPED', 'DELIVERED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 flex justify-between items-center text-sm text-zinc-400">
          <span>Showing <strong className="text-white">{filteredOrders.length}</strong> of <strong className="text-white">{orders.length}</strong> total orders</span>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center text-zinc-400">Loading orders...</div>
        ) : error ? (
          <div className="bg-zinc-900 border border-red-900/30 rounded-xl p-10 text-center text-red-500">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center text-zinc-400">No matching orders found.</div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400">
                  <tr>
                    <th className="p-4 font-medium">Order Details</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-xs text-zinc-300">ID: {order.id.slice(0, 8)}...</div>
                        <div className="text-xs text-zinc-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                        <Link href={`/invoice/${order.id}`} className="text-xs text-blue-400 hover:underline mt-1 inline-block">
                          View Invoice &rarr;
                        </Link>
                      </td>
                      <td className="p-4">
                        <div className="text-zinc-200 font-medium">{order.customerName}</div>
                        <div className="text-xs text-zinc-500">{order.phone}</div>
                        <div className="text-xs text-zinc-500">{order.city}</div>
                      </td>
                      <td className="p-4 text-zinc-200 font-bold">PKR {order.total?.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${
                          order.status === 'SHIPPED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          order.status === 'DELIVERED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {order.status || 'PENDING'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button 
                            disabled={updating === order.id}
                            onClick={() => updateStatus(order.id, 'PENDING')}
                            className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg text-xs text-zinc-400 hover:text-amber-400 transition-all disabled:opacity-50"
                          >
                            Pending
                          </button>
                          <button 
                            disabled={updating === order.id}
                            onClick={() => updateStatus(order.id, 'SHIPPED')}
                            className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-lg text-xs text-zinc-400 hover:text-emerald-400 transition-all disabled:opacity-50"
                          >
                            Ship
                          </button>
                          <button 
                            disabled={updating === order.id}
                            onClick={() => updateStatus(order.id, 'DELIVERED')}
                            className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/10 rounded-lg text-xs text-zinc-400 hover:text-blue-400 transition-all disabled:opacity-50"
                          >
                            Deliver
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
