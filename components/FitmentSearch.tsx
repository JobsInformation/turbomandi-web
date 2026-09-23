'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Car } from 'lucide-react';

export default function FitmentSearch() {
  const router = useRouter();
  const [make, setMake] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (make) {
      router.push(`/parts?make=${encodeURIComponent(make)}`);
    } else {
      router.push('/parts');
    }
  };

  return (
    <form onSubmit={handleSearch} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Car className="text-red-600 w-6 h-6" />
        <h3 className="text-white font-bold text-lg">Find Compatible Parts</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select value={make} onChange={(e) => setMake(e.target.value)} className="bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 text-sm">
          <option value="">All Makes</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Suzuki">Suzuki</option>
        </select>
        <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-lg flex items-center justify-center gap-2 sm:col-span-2 transition-all text-sm">
          <Search className="w-5 h-5" /> Search Compatible Parts
        </button>
      </div>
    </form>
  );
}
