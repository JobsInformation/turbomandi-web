'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function InventoryPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('royal_admin_auth');
    if (auth === 'true') {
      setIsAuthorized(true);
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  if (!isAuthorized) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Vehicle Inventory</h1>
      <p className="text-slate-600">Connecting live to Neon Database...</p>
    </div>
  );
}
