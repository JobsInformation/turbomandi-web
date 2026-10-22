'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Leaf, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Using the same sample data to match the public stock page
const sampleStock = [
  { id: 1, year: 2022, make: 'Toyota', model: 'RAV4', variant: 'Cruiser', price: 45990, body: 'SUV', fuel: 'Hybrid', odometer: 24000, trans: 'Auto', status: 'Just Arrived' },
  { id: 2, make: 'Ford', model: 'Ranger', variant: 'Wildtrak', price: 58500, body: 'Ute', fuel: 'Diesel', odometer: 41000, trans: 'Auto', status: 'Popular' },
  { id: 3, year: 2023, make: 'Toyota', model: 'Camry', variant: 'Ascent', price: 34990, body: 'Sedan', fuel: 'Hybrid', odometer: 12000, trans: 'Auto', status: 'Under Offer' },
];

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = Number(params.id);
  const vehicle = sampleStock.find(v => v.id === vehicleId) || sampleStock[0]; // Fallback for preview
  
  const [formType, setFormType] = useState('enquiry');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true); // Shows the spec-required "successful preview message"
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/vehicles" className="text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Vehicle Details & Images */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-96 bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center text-slate-400">
            [Vehicle Image Gallery Placeholder]
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Vehicle Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-slate-500 mb-1">Odometer</div>
                <div className="font-semibold">{vehicle.odometer.toLocaleString()} km</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-slate-500 mb-1">Transmission</div>
                <div className="font-semibold">{vehicle.trans}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-slate-500 mb-1">Body Type</div>
                <div className="font-semibold">{vehicle.body}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-slate-500 mb-1">Fuel Type</div>
                <div className="font-semibold flex items-center gap-1">
                  {vehicle.fuel === 'Hybrid' ? <><Leaf className="w-4 h-4 text-green-600"/> Hybrid</> : vehicle.fuel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Forms */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-3xl font-bold text-blue-700 mb-1">${vehicle.price.toLocaleString()}</div>
            <div className="text-sm text-slate-500 mb-6">Excludes Government Charges</div>
            
            <div className="flex gap-2 mb-6">
              <button onClick={() => {setFormType('enquiry'); setIsSubmitted(false);}} className={`flex-1 py-2 text-sm font-semibold rounded-lg border ${formType === 'enquiry' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>Enquire</button>
              <button onClick={() => {setFormType('testdrive'); setIsSubmitted(false);}} className={`flex-1 py-2 text-sm font-semibold rounded-lg border ${formType === 'testdrive' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>Test Drive</button>
            </div>

            {isSubmitted ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-semibold">Message Preview Successful!</p>
                <p className="text-sm mt-1">This form is ready to be connected to the dealership CRM.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Full Name" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="email" placeholder="Email Address" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="tel" placeholder="Phone Number" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                {formType === 'testdrive' && (
                  <input type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                )}
                <textarea placeholder="How can we help you?" rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none"></textarea>
                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition-colors">
                  {formType === 'enquiry' ? 'Send Enquiry' : 'Request Test Drive'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
