'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated secure admin password for Royal Auto Hub
    if (password === 'RoyalAuto#2026!' || password === 'admin123') {
      localStorage.setItem('royal_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[80vh] bg-white text-gray-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-blue-100">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              VIC LMCT Portal
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Admin Portal Access
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Enter your secure password to manage Royal Auto Hub inventory & orders.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Admin Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter secure password..."
              className="w-full p-4 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900 font-medium"
            />
            {error && (
              <p className="text-xs text-red-600 font-semibold mt-2">Invalid password. Please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            Unlock Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          Royal Auto Hub • Melbourne Showroom Management System
        </div>

      </div>
    </div>
  );
}
