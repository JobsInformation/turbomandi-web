import Link from 'next/link';
import { Car, ShieldCheck, CheckCircle2, ArrowRight, Calendar, Phone, Mail, MapPin, ShoppingCart } from 'lucide-react';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  // Format the vehicle title nicely from the URL slug
  const vehicleName = params.id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Header / Breadcrumb */}
      <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link href="/vehicles" className="text-xs font-semibold text-blue-600 hover:text-blue-700 no-underline inline-flex items-center gap-1 mb-4">
            ← Back to All Stock
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                VIC LMCT Certified & Inspected
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {vehicleName || 'Toyota Camry Ascent'}
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                2023 Model • Automatic • Hybrid • 45,000 km • Melbourne Showroom
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-blue-600">$32,990</p>
              <p className="text-xs text-gray-500 font-medium">Drive Away (Includes VIC Stamp Duty & RWC)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left / Main Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Vehicle Image Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center relative border border-gray-200 shadow-sm overflow-hidden">
              <Car className="w-24 h-24 text-gray-400" />
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                120-Point Inspected
              </span>
            </div>

            {/* Inspection & Guarantee Highlights */}
            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                Royal Auto Hub Certified Guarantee
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This vehicle has successfully passed our rigorous 120-point mechanical inspection and comes fully prepared for immediate Victorian registration transfer.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 font-medium pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Certified Roadworthy Certificate (RWC)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> PPSR Clear Title Verification</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> VIC Stamp Duty & Transfer Included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> 3-Month Statutory Warranty</li>
              </ul>
            </div>

            {/* Vehicle Specifications */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Vehicle Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Make / Model</span>
                  <span className="font-bold text-gray-900 mt-1 block">Toyota Camry</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Year</span>
                  <span className="font-bold text-gray-900 mt-1 block">2023</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Transmission</span>
                  <span className="font-bold text-gray-900 mt-1 block">Automatic</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Odometer</span>
                  <span className="font-bold text-gray-900 mt-1 block">45,000 km</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Fuel Type</span>
                  <span className="font-bold text-gray-900 mt-1 block">Hybrid (Petrol / Electric)</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Color</span>
                  <span className="font-bold text-gray-900 mt-1 block">Glacier White</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar / Booking & Enquiries */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Book Test Drive / Enquire
              </h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full p-3 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +61 400 000 000"
                    className="w-full p-3 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-2xl border border-gray-300 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Confirm Test Drive Booking <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/cart"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 no-underline border border-gray-200"
                >
                  <ShoppingCart className="w-4 h-4 text-blue-600" /> Add to Enquiries Cart
                </Link>
              </form>

              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-600" /> Showroom: +61 3 9000 0000</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> Melbourne, Victoria, Australia</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
