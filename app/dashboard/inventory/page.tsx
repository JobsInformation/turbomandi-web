'use client';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

export default function InventoryAdmin() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Vehicle Inventory</h1>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
          <p className="text-lg">Your vehicle database will be connected here.</p>
          <p className="text-sm mt-2">You will be able to add, edit, and remove stock from the public website.</p>
        </div>
      </div>
    </div>
  );
}
