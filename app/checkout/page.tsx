'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, Truck, Wallet } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');

  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    accountNumber: ''
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('turbomandi_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 500 : 0;
  const grandTotal = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: cart,
          totalAmount: grandTotal,
          paymentMethod
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('turbomandi_cart');
        router.push(`/invoice/${data.orderId}`);
      } else {
        alert(data.error || 'Failed to place order.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Network error placing order.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/cart" className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-2 mb-8 transition w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Secure Checkout</h1>
        <p className="text-zinc-500 text-sm mb-8">Complete your order with Pakistan's trusted local payment gateways.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer & Shipping Details */}
          <div className="space-y-6 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold uppercase tracking-wider text-red-500">Shipping Information</h2>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={form.customerName}
                onChange={e => setForm({...form, customerName: e.target.value})}
                placeholder="Syed Iqrar Ali"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="user@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="0300-1234567"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Delivery Address</label>
              <textarea 
                required
                rows={3}
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
                placeholder="House #, Street, City, Pakistan"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 resize-none"
              />
            </div>
          </div>

          {/* Payment Gateway Simulation */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
              <h2 className="text-lg font-bold uppercase tracking-wider text-red-500">Payment Method</h2>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'jazzcash', name: 'JazzCash', desc: 'Mobile Wallet' },
                  { id: 'easypaisa', name: 'EasyPaisa', desc: 'Mobile Wallet' },
                  { id: 'bank', name: 'Bank Transfer', desc: 'Direct IBFT' },
                  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay on arrival' }
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-2xl border text-left transition ${
                      paymentMethod === method.id 
                        ? 'bg-red-950/40 border-red-600 text-white shadow-lg shadow-red-600/10' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase">{method.name}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{method.desc}</div>
                  </button>
                ))}
              </div>

              {/* Official Store Merchant Info Box */}
              {paymentMethod !== 'cod' && (
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-xs space-y-1.5 text-zinc-300">
                  <span className="font-bold text-red-500 uppercase tracking-wide block mb-1">Store Official Account Details:</span>
                  {paymentMethod === 'jazzcash' && (
                    <>
                      <p>Send payment to JazzCash: <span className="text-white font-mono font-bold">0300-1234567</span></p>
                      <p className="text-[10px] text-zinc-500">Account Title: TurboMandi Official</p>
                    </>
                  )}
                  {paymentMethod === 'easypaisa' && (
                    <>
                      <p>Send payment to EasyPaisa: <span className="text-white font-mono font-bold">0301-7654321</span></p>
                      <p className="text-[10px] text-zinc-500">Account Title: TurboMandi Official</p>
                    </>
                  )}
                  {paymentMethod === 'bank' && (
                    <>
                      <p>Direct IBFT (Meezan Bank): <span className="text-white font-mono font-bold">PK36MEZN0000001234567890</span></p>
                      <p className="text-[10px] text-zinc-500">Account Title: TurboMandi SMC-Pvt Ltd</p>
                    </>
                  )}
                </div>
              )}

              {/* Customer Account / Transaction Number Input */}
              {paymentMethod !== 'cod' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">
                    {paymentMethod === 'bank' ? 'Your Sender IBAN / Account Number' : 'Your Sender Mobile Number'}
                  </label>
                  <input 
                    type="text" 
                    value={form.accountNumber}
                    onChange={e => setForm({...form, accountNumber: e.target.value})}
                    placeholder={paymentMethod === 'bank' ? 'PK...' : '0300-9876543'}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              )}

              {/* Order Summary breakdown */}
              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Express Shipping:</span>
                  <span>PKR {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl uppercase tracking-wider text-xs transition shadow-xl shadow-red-600/30 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> {loading ? 'Processing Order...' : 'Confirm & Place Order'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
