'use client';

import { useState } from 'react';
import { X, Calendar, User, Phone, CheckCircle } from 'lucide-react';

interface Props {
  serviceTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceBookingModal({ serviceTitle, isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    bookingDate: new Date().toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: serviceTitle,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit booking. Please check details.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">Booking Received!</h3>
            <p className="text-xs text-zinc-400 mb-6">Our workshop advisor will contact you on WhatsApp/Phone to confirm your appointment.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-white mb-1">Book Workshop Service</h3>
            <p className="text-xs text-red-500 font-semibold mb-6">{serviceTitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ali Khan"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 p-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">WhatsApp / Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="03001234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 p-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Preferred Service Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={formData.bookingDate}
                    onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 p-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Confirm Appointment'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
