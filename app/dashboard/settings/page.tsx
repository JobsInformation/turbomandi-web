'use client';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function SettingsAdmin() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Dealership Settings</h1>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
          <p className="text-lg">Global dealership configuration</p>
          <p className="text-sm mt-2">Update your LMCT Number, ABN, operating hours, and contact details from here.</p>
        </div>
      </div>
    </div>
  );
}
