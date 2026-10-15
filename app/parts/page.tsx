'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, ShieldCheck, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function PartsPage() {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const parts = [
    {
      id: 'civic-suspension',
      name: 'Civic Turbo Suspension Kit',
      category: 'Suspension',
      sku: 'HON-CIV-1234',
      stock: 13,
      price: 1599,
      displayPrice: '$1,599 AUD',
    },
    {
      id: 'ngk-spark-plugs',
      name: 'NGK Iridium Spark Plugs',
      category: 'Engine Maintenance',
      sku: 'NGK-SPK-9988',
      stock: 49,
      price: 145,
      displayPrice: '$145 AUD',
    },
    {
      id: 'liqui-moly-oil',
      name: 'Liqui Moly 5W-40 Engine Oil',
      category: 'Fluids & Lubricants',
      sku: 'LQM-OIL-5544',
      stock: 29,
      price: 120,
      displayPrice: '$120 AUD',
    },
  ];

  const handleAddToCart = (part: typeof parts[0]) => {
    addToCart({
      id: part.id,
      name: part.name,
      specs: `SKU: ${part.sku} • ${part.category}`,
      price: part.price,
      displayPrice: part.displayPrice,
      type: 'part',
    });

    setAddedIds(prev => ({ ...prev, [part.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [part.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            OEM Certified Parts & Accessories
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Genuine Auto Parts Store
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            High-quality OEM replacement parts, lubricants, and accessories guaranteed for your vehicle.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {parts.map(part => {
            const isAdded = addedIds[part.id];
            return (
              <div key={part.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-6">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {part.category}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">SKU: {part.sku}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{part.name}</h3>
                  <p className="text-xs text-emerald-600 font-semibold mb-4">✓ Stock Remaining: {part.stock}</p>
                  <p className="text-2xl font-extrabold text-blue-600 mb-6">{part.displayPrice}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(part)}
                  className={`w-full font-semibold py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
