"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PartsDisplay({ initialParts }: { initialParts: any[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Cart & Checkout state
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: '',
    address: '',
  });

  const categories = ['All', ...Array.from(new Set(initialParts.map((p) => p.category).filter(Boolean)))];

  const filteredParts = initialParts.filter((part) => {
    const matchesSearch =
      part.name?.toLowerCase().includes(search.toLowerCase()) ||
      part.sku?.toLowerCase().includes(search.toLowerCase()) ||
      part.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (part: any) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === part.id);
      if (existing) {
        if (existing.quantity >= part.stock) return prevCart;
        return prevCart.map((item) =>
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: part.id, name: part.name, price: part.price, quantity: 1, stock: part.stock }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: any, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty > item.stock) return item;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: cart,
          total: cartTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Checkout failed');

      // Clear cart and navigate to invoice
      setCart([]);
      setIsCartOpen(false);
      setIsCheckingOut(false);
      router.push(`/invoice/${data.order.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">PARTS STORE</h1>
            <p className="text-zinc-400 text-sm mt-1">Browse genuine auto parts and order with real-time stock</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
            >
              <span>🛒 Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-red-600 text-xs px-2 py-0.5 rounded-full font-extrabold">
                  {totalCartCount}
                </span>
              )}
            </button>

            <Link 
              href="/admin/orders" 
              className="text-xs bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-2.5 rounded-xl text-zinc-300 transition-colors"
            >
              Admin &rarr;
            </Link>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3 relative">
            <input
              type="text"
              placeholder="Search parts by name, category, or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => {
            const stockCount = part.stock ?? 0;
            return (
              <div key={part.id} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full font-semibold">
                      {part.category || 'General'}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">SKU: {part.sku || 'N/A'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{part.name}</h3>

                  <div className="mb-6">
                    {stockCount <= 0 ? (
                      <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg font-semibold">🔴 Out of Stock</span>
                    ) : stockCount <= 3 ? (
                      <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg font-semibold animate-pulse">⚠️ Low Stock: {stockCount} left</span>
                    ) : (
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-medium">📦 Stock Remaining: {stockCount}</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-medium">Price</p>
                    <p className="text-lg font-extrabold text-red-500">PKR {part.price?.toLocaleString()}</p>
                  </div>

                  <button
                    onClick={() => addToCart(part)}
                    disabled={stockCount <= 0}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      stockCount <= 0
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-zinc-200 active:scale-95'
                    }`}
                  >
                    {stockCount <= 0 ? 'Unavailable' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Slide-out Cart & Checkout Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-md h-full p-6 flex flex-col justify-between overflow-y-auto">
            
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  🛒 {isCheckingOut ? 'Checkout' : 'Your Shopping Cart'}
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white text-lg">&times;</button>
              </div>

              {errorMsg && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {!isCheckingOut ? (
                /* CART ITEM LIST */
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-zinc-500 py-10">Your cart is empty.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                          <p className="text-xs text-red-400 font-bold mt-1">PKR {item.price}</p>
                        </div>

                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-xs text-zinc-400 hover:text-white px-1">-</button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-xs text-zinc-400 hover:text-white px-1">+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* CHECKOUT FORM */
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Syed Iqrar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm mt-1 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Phone Number *</label>
                    <input
                      required
                      type="text"
                      placeholder="03001234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm mt-1 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 uppercase font-semibold">City *</label>
                    <input
                      required
                      type="text"
                      placeholder="Hyderabad / Karachi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm mt-1 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Street details..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm mt-1 focus:border-red-500 outline-none"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Total Amount</span>
                  <span className="text-xl font-extrabold text-red-500">PKR {cartTotal.toLocaleString()}</span>
                </div>

                {!isCheckingOut ? (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                  >
                    Proceed to Checkout &rarr;
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-1/3 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl text-xs hover:bg-zinc-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={loading}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Placing Order...' : 'Confirm Order'}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
