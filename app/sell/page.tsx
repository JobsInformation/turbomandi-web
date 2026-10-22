'use client';
import { useState } from 'react';
import { Car, CheckCircle, ShieldCheck } from 'lucide-react';

export default function SellCarPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "YOUR_WEB3FORMS_KEY_HERE"); 
    formData.append("subject", "New Trade-In / Sell My Car Valuation Request");
    formData.append("from_name", "Royal Auto Hub Valuation Portal");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) setIsSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch (error) {
      alert("Connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <div className="bg-blue-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Sell Your Car or Trade-In</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Get a fast, fair valuation for your vehicle or trade it in towards your next upgrade.</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Vehicle Valuation Request</h2>
          {isSubmitted ? (
            <div className="p-8 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <p className="text-xl font-bold mb-2">Valuation Request Sent!</p>
              <p className="text-slate-600">Our acquisitions team will evaluate your details and provide an estimated offer shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="make" placeholder="Make (e.g. Mazda)" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="text" name="model" placeholder="Model (e.g. CX-5)" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="text" name="year" placeholder="Year (e.g. 2021)" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="odometer" placeholder="Odometer reading (km)" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="text" name="condition" placeholder="Overall Condition (Excellent / Good / Fair)" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your Name" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="email" name="email" placeholder="Email Address" required className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              </div>
              <input type="tel" name="phone" placeholder="Phone Number" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-3 rounded-lg font-bold transition-colors">
                {isSubmitting ? 'Calculating Valuation...' : 'Get Valuation Offer'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
