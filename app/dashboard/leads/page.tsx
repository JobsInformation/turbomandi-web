'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function LeadsAdmin() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setAuthorized(true);
    } else {
      window.location.href = '/dashboard';
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Customer Leads & Enquiries</h1>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-700 rounded-full"><Users className="w-6 h-6"/></div>
                <div>
                  <h3 className="font-bold text-slate-800">John Smith (Enquiry on Toyota RAV4)</h3>
                  <p className="text-sm text-slate-600">Email: john.smith@example.com | Phone: 0400 123 456</p>
                  <p className="text-sm text-slate-500 mt-1">"Is this vehicle still available for a weekend test drive?"</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
