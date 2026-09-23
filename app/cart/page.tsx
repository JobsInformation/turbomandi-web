'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('turbomandi_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeFromCart = (id: number) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('turbomandi_cart', JSON.stringify(newCart));
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/parts" className="text-zinc-400 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Parts Store
        </Link>
        
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
          <ShoppingBag className="text-red-600 w-8 h-8" /> Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-500 mb-4">Your cart is currently empty.</p>
            <Link href="/parts" className="text-red-500 font-semibold hover:text-red-400 inline-flex items-center gap-1">
              Browse Auto Parts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-zinc-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-black text-red-500 text-lg">PKR {(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Amount</p>
                <p className="text-2xl font-black text-white">PKR {totalAmount.toLocaleString()}</p>
              </div>
              <Link 
                href="/checkout" 
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-base transition shadow-lg shadow-red-600/20 inline-flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
