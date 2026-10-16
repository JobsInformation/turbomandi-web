'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'RoyalAuto#2026!') {
      localStorage.setItem('royal_admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid admin password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Admin Portal Login</h1>
        <p className="text-slate-500 text-center text-sm mb-6">Royal Auto Hub Management - VIC LMCT</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/20"
          >
            Access Portal
          </button>
        </form>
      </div>
    </div>
  );
}
