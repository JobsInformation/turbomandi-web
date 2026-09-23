'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, CalendarCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleInfo: '',
    serviceType: 'General Maintenance',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ customerName: '', phone: '', vehicleInfo: '', serviceType: 'General Maintenance', date: '' });
      } else {
        alert('Failed to submit booking.');
      }
    } catch (err) {
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Information */}
        <div>
          <Link href="/" className="text-zinc-400 hover:text-white text-sm mb-8 inline-block transition">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
            TurboMandi <span className="text-red-600">Workshop</span>
          </h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Book your service appointment today. From routine oil changes to complex engine diagnostics, our certified technicians ensure your vehicle performs at its peak.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-red-950/30 p-3 rounded-lg text-red-500 border border-red-900/30">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Expert Technicians</h3>
                <p className="text-zinc-500 text-sm">Specialized in both JDM and locally assembled vehicles.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-red-950/30 p-3 rounded-lg text-red-500 border border-red-900/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Genuine Parts</h3>
                <p className="text-zinc-500 text-sm">We only use OEM-approved lubricants and replacement parts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-zinc-400 text-sm mb-6">Our service advisor will call you shortly to confirm the time.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="text-red-500 hover:text-red-400 font-semibold text-sm"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CalendarCheck className="w-6 h-6 text-red-600" /> Schedule Service
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
                  <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600" placeholder="Ali Khan" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Phone Number</label>
                  <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600" placeholder="0300..." />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Vehicle Make & Model</label>
                  <input required type="text" name="vehicleInfo" value={formData.vehicleInfo} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600" placeholder="Honda Civic 2022" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Service Type</label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600">
                      <option>General Maintenance</option>
                      <option>Oil & Filter Change</option>
                      <option>Brake Service</option>
                      <option>Engine Tuning</option>
                      <option>Computer Diagnostics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Preferred Date</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 [color-scheme:dark]" />
                  </div>
                </div>

                <button disabled={loading} type="submit" className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white font-bold py-3.5 rounded-xl transition mt-2">
                  {loading ? 'Submitting...' : 'Confirm Appointment'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
