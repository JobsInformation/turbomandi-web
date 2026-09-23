'use client';

import { useState } from 'react';
import { Search, Car } from 'lucide-react';

const MAKES = ['Toyota', 'Honda', 'Suzuki', 'Kia', 'Hyundai'];
const MODELS: Record<string, string[]> = {
  Toyota: ['Corolla', 'Yaris', 'Fortuner', 'Hilux', 'Vitz'],
  Honda: ['Civic', 'City', 'BR-V', 'HR-V'],
  Suzuki: ['Alto', 'Cultus', 'Swift', 'Wagon R'],
  Kia: ['Sportage', 'Picanto', 'Stonic'],
  Hyundai: ['Tucson', 'Elantra', 'Sonata'],
};

const YEARS = Array.from({ length: 25 }, (_, i) => 2026 - i);

export default function FitmentSearch() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMake || !selectedModel || !selectedYear) return;
    window.location.href = `/parts?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}`;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Car className="text-red-600 w-6 h-6" />
        <h3 className="text-white font-bold text-lg">Find Parts That Fit Your Vehicle</h3>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={selectedMake}
          onChange={(e) => {
            setSelectedMake(e.target.value);
            setSelectedModel('');
          }}
          className="bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-red-500 outline-none"
        >
          <option value="">Select Make</option>
          {MAKES.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedModel}
          disabled={!selectedMake}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-red-500 outline-none disabled:opacity-50"
        >
          <option value="">Select Model</option>
          {selectedMake &&
            MODELS[selectedMake]?.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-red-500 outline-none"
        >
          <option value="">Select Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!selectedMake || !selectedModel || !selectedYear}
          className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold p-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <Search className="w-5 h-5" />
          Find Parts
        </button>
      </form>
    </div>
  );
}
