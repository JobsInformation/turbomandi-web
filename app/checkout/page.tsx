'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Car, CreditCard, Building2, Wallet } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'eftpos' | 'transfer'>('card');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    vicLicence: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white text-gray-900 py-20 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-xl max-w-xl w-full text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-gray-900">Order / Reservation Successful!</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Thank you, <span className="font-semibold text-gray-900">{formData.fullName}</span>. Your order & VIC LMCT compliance paperwork have been securely submitted to Royal Auto Hub.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-left space-y-3 text-sm text-gray-700">
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold text-blue-600">${totalPrice.toLocaleString()} AUD</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Showroom Location:</span>
              <span className="font-semibold text-gray-900">Melbourne Showroom, VIC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-semibold text-emerald-600">Pending Inspection / Dispatch</span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-colors shadow-lg shadow-blue-600/25 no-underline"
          >
            Return to Homepage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            VIC LMCT Secure Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Finalize Your Purchase & Hold
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Complete your order with Australian trusted payment methods and VIC registration transfer details.
          </p>
        </div>
      </section>

      {/* Main Form Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Form Sections */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Buyer Information */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                Purchaser Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Smith"
                    className="w-full p-3.5 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com.au"
                    className="w-full p-3.5 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +61 400 000 000"
                    className="w-full p-3.5 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">VIC Drivers Licence No. (Optional)</label>
                  <input
                    type="text"
                    value={formData.vicLicence}
                    onChange={e => setFormData({ ...formData, vicLicence: e.target.value })}
                    placeholder="e.g. 12345678"
                    className="w-full p-3.5 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Delivery / Residential Address</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, Suburb, Victoria, Postcode"
                  className="w-full p-3.5 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Secure Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-blue-600 mb-3" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Credit / Debit Card</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Visa, Mastercard, EFTPOS</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('eftpos')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'eftpos'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Wallet className="w-6 h-6 text-blue-600 mb-3" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Showroom EFTPOS</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Pay upon pickup in Melbourne</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'transfer'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Building2 className="w-6 h-6 text-blue-600 mb-3" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Direct Bank Transfer</h4>
                    <p className="text-xs text-gray-500 mt-0.5">CBA / NAB Secure IBFT</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'transfer' && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-2 text-sm text-gray-700">
                  <h4 className="font-bold text-gray-900">Royal Auto Hub Trust Account Details:</h4>
                  <p><span className="text-gray-500">Bank:</span> Commonwealth Bank of Australia (CBA)</p>
                  <p><span className="text-gray-500">BSB:</span> 063-000 • <span className="text-gray-500">Account:</span> 1234 5678</p>
                  <p><span className="text-gray-500">Reference:</span> Use your Full Name as payment reference</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-bold text-gray-900 text-base pb-4 border-b border-gray-100">
                Order Summary ({cart.length} items)
              </h2>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cart.length === 0 ? (
                  <p className="text-xs text-gray-500">Your cart is currently empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm pb-3 border-b border-gray-100">
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.displayPrice}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-2.5 text-sm text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${totalPrice.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between">
                  <span>VIC Roadworthy & Stamp Duty</span>
                  <span className="font-semibold text-emerald-600">Included</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-extrabold text-gray-900">
                  <span>Total Due</span>
                  <span className="text-blue-600">${totalPrice.toLocaleString()} AUD</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                Complete Secure Order <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Lock className="w-4 h-4 text-blue-600" />
                256-Bit SSL Encrypted Checkout
              </div>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
}
