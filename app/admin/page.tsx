'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard'; // Assuming this is your dashboard component

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authorized by looking for the token we set in login
    const auth = localStorage.getItem('royal_admin_auth');
    
    if (auth === 'true') {
      setIsAuthorized(true);
    } else {
      // If no token is found, redirect back to login
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('royal_admin_auth');
    // Also clear the cookie we set earlier as backup
    document.cookie = "royal_admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Don't flash the admin panel before redirecting
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Top Navigation Bar with Logout Button */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center z-10 relative">
         <h1 className="text-xl font-bold text-slate-800">Royal Auto Hub Admin</h1>
         <button 
           onClick={handleLogout}
           className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
         >
           Logout
         </button>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-6">
        <AdminDashboard />
      </div>
    </div>
  );
}
