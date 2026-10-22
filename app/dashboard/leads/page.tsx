'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LeadsAdmin() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Customer Leads</h1>
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
          <p className="text-lg">Customer enquiries and test drive requests will appear here.</p>
          <p className="text-sm mt-2">Currently, all submissions are being routed directly to your email via Web3Forms.</p>
        </div>
      </div>
    </div>
  );
}
