'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, User, Calendar, Phone, Clock, Car, Bike, Wrench, Package, PlusCircle, MessageCircle } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load data from Local Storage when the page loads
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('turbomandi_admin_bookings');
    
    if (saved) {
      setBookings(JSON.parse(saved));
    } else {
      // If no data exists, load the default mock data and save it
      const defaultData = [{
        id: 1,
        customerName: 'Muhammad Aslam',
        serviceType: 'General Maintenance',
        date: 'Today', 
        phone: '03003067553',
        status: 'CONFIRMED'
      }];
      setBookings(defaultData);
      localStorage.setItem('turbomandi_admin_bookings', JSON.stringify(defaultData));
    }
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    setIsDeleting(id);
    
    try {
      // Still hitting our API route
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Update both the screen AND Local Storage so it survives a refresh
        const updatedBookings = bookings.filter(b => b.id !== id);
        setBookings(updatedBookings);
        localStorage.setItem('turbomandi_admin_bookings', JSON.stringify(updatedBookings));
      } else {
        alert('Failed to delete booking.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setIsDeleting(null);
    }
  };

  // Prevent UI flashing/hydration errors while local storage loads
  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-black italic tracking-tighter text-red-600">
          TURBOMANDI
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="#" className="flex items-center gap-2 hover:text-red-500 transition"><Car className="w-4 h-4 text-red-600" /> Cars</Link>
          <Link href="#" className="flex items-center gap-2 hover:text-orange-500 transition"><Bike className="w-4 h-4 text-orange-500" /> Bikes</Link>
          <Link href="/parts" className="flex items-center gap-2 hover:text-yellow-500 transition"><Package className="w-4 h-4 text-yellow-500" /> Parts</Link>
          <Link href="/workshop" className="flex items-center gap-2 hover:text-red-500 transition"><Wrench className="w-4 h-4 text-red-600" /> Services</Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition">
            <PlusCircle className="w-4 h-4" /> Sell
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="flex justify-between items-end mb-10 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Service Appointments Admin</h1>
            <p className="text-zinc-500 text-sm">Manage workshop reservations and customer requests</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm font-semibold text-zinc-300">
            Total Bookings: {bookings.length}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Scheduled Date</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No active bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-zinc-800/50 transition">
                    <td className="px-6 py-4 font-bold flex items-center gap-3">
                      <User className="w-4 h-4 text-zinc-500" /> {booking.customerName}
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{booking.serviceType}</td>
                    <td className="px-6 py-4 text-zinc-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {booking.date}
                    </td>
                    <td className="px-6 py-4 text-emerald-500 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {booking.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-950/40 text-yellow-500 border border-yellow-900/50 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(booking.id)}
                        disabled={isDeleting === booking.id}
                        className="p-2 bg-zinc-800 hover:bg-red-900/50 hover:text-red-500 text-zinc-400 rounded-lg transition disabled:opacity-50"
                      >
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
    </main>
  );
}
