'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function SettingsAdmin() {
  const [authorized, setAuthorized] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setAuthorized(true);
    } else {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dealership Settings</h1>
          {saved && <span className="text-green-600 font-medium text-sm">Changes saved successfully!</span>}
        </div>
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Dealership Name</label>
            <input type="text" defaultValue="Royal Auto Hub" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">LMCT Number</label>
              <input type="text" defaultValue="LMCT 12345" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">ABN</label>
              <input type="text" defaultValue="12 345 678 901" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email for Enquiries</label>
            <input type="email" defaultValue="sales@royalautohub.com.au" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <button type="submit" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold transition-colors">
            <Save className="w-5 h-5" /> Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}
