'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wrench, Calendar, Car, Phone, User, CheckCircle } from 'lucide-react';

export default function WorkshopPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleInfo: '',
    serviceType: 'General Maintenance',
    preferredDate: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming your backend API for bookings is at /api/bookings
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Failed to submit booking. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">Request Received!</h2>
          <p className="text-zinc-400 mb-8">Your workshop appointment request has been submitted. Our team will call you shortly to confirm your time slot.</p>
          <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition block w-full">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight flex items-center gap-4 mb-4">
            <div className="bg-red-600 p-3 rounded-2xl">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            Workshop Services
          </h1>
          <p className="text-zinc-400 text-lg">Book an appointment for maintenance, performance tuning, or expert repairs.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-500" /> Full Name
                </label>
                <input required type="text" placeholder="Syed Ali" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" /> Phone Number
                </label>
                <input required type="tel" placeholder="0300 1234567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4 text-red-500" /> Vehicle Make & Model
                </label>
                <input required type="text" placeholder="e.g. Honda Civic 2022" value={formData.vehicleInfo} onChange={e => setFormData({...formData, vehicleInfo: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition" />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" /> Preferred Date
                </label>
                <input required type="date" value={formData.preferredDate} onChange={e => setFormData({...formData, preferredDate: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition [color-scheme:dark]" />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Service Required</label>
              <select value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition">
                <option value="General Maintenance">General Maintenance (Oil, Filters, Brakes)</option>
                <option value="Engine Repair">Engine Diagnostics & Repair</option>
                <option value="Performance Tuning">Performance Tuning & Upgrades</option>
                <option value="Suspension & Alignment">Suspension & Wheel Alignment</option>
                <option value="Electrical Troubleshooting">Electrical Troubleshooting</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Additional Notes (Optional)</label>
              <textarea rows={3} placeholder="Describe the issue or specify any particular parts you want us to use..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition"></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white px-6 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-red-600/20 mt-4 flex justify-center items-center gap-2">
              {loading ? 'Submitting Request...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
