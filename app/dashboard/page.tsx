'use client';

import { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Car, Users, FileText, Settings, LogOut } from 'lucide-react';

export default function UnifiedDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('royal_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        localStorage.setItem('royal_admin_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setError('Invalid password. Try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-600"><ShieldCheck className="w-8 h-8" /></div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Portal Access</h1>
          {error && <div className="mb-4 p-3 bg-red-500/10 text-red-600 text-sm rounded-lg text-center">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" required />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
         <h1 className="text-xl font-bold text-slate-800">Royal Auto Hub Admin</h1>
         <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"><LogOut className="w-4 h-4" /> Lock Portal</button>
      </div>
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Dealership Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/dashboard/inventory" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 flex flex-col items-center gap-4 group transition-all">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform"><Car className="w-8 h-8" /></div>
                <span className="font-semibold text-slate-700">Vehicle Inventory</span>
            </a>
            <a href="/dashboard/leads" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-200 flex flex-col items-center gap-4 group transition-all">
                <div className="p-4 bg-green-50 text-green-600 rounded-full group-hover:scale-110 transition-transform"><Users className="w-8 h-8" /></div>
                <span className="font-semibold text-slate-700">Customer Leads</span>
            </a>
            <a href="/dashboard/finance" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 flex flex-col items-center gap-4 group transition-all">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-full group-hover:scale-110 transition-transform"><FileText className="w-8 h-8" /></div>
                <span className="font-semibold text-slate-700">Finance Apps</span>
            </a>
            <a href="/dashboard/settings" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 flex flex-col items-center gap-4 group transition-all">
                <div className="p-4 bg-slate-100 text-slate-600 rounded-full group-hover:scale-110 transition-transform"><Settings className="w-8 h-8" /></div>
                <span className="font-semibold text-slate-700">Settings</span>
            </a>
        </div>
      </div>
    </div>
  );
}
