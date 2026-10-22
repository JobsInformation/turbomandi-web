'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FinanceAdmin() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Finance Applications</h1>
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
          <p className="text-lg">Secure finance applications will route to this portal.</p>
          <p className="text-sm mt-2">Use this section to review applicant details before sending to lenders.</p>
        </div>
      </div>
    </div>
  );
}
