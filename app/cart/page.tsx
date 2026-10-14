import Link from 'next/link';
import { ShoppingCart, ShieldCheck, ArrowRight, Trash2, Car, CheckCircle2, Calculator } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <ShoppingCart className="w-4 h-4 text-blue-600" />
            Secure Reservation & Enquiries
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Vehicle Cart & Summary
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Review your shortlisted vehicles, check drive-away cost breakdowns, and secure your test drive booking.
          </p>
        </div>
      </section>

      {/* Main Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              Shortlisted Vehicles (1)
            </h2>

            {/* Cart Item Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0 border border-gray-200">
                  <Car className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-200">
                    VIC Certified
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-1">Toyota Camry Ascent Hybrid</h3>
                  <p className="text-xs text-gray-500">2023 • Automatic • 45,000 km</p>
                  <p className="text-blue-600 font-extrabold text-lg mt-1">$32,990 <span className="text-xs text-gray-400 font-normal">Drive Away</span></p>
                </div>
              </div>

              <button className="text-gray-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition-colors self-end sm:self-center cursor-pointer" title="Remove item">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Inclusions Box */}
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                All Royal Auto Hub Purchases Include:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Roadworthy Certificate (RWC)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> PPSR Clear Title Guarantee</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> VIC Stamp Duty & Transfer Included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> 3-Month Statutory Warranty</li>
              </ul>
            </div>
          </div>

          {/* Order Summary & Checkout Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-bold text-gray-900 text-base pb-4 border-b border-gray-100 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                Price Breakdown
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Vehicle Price</span>
                  <span className="font-semibold text-gray-900">$32,990</span>
                </div>
                <div className="flex justify-between">
                  <span>VIC Stamp Duty</span>
                  <span className="font-semibold text-emerald-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Roadworthy & Inspection</span>
                  <span className="font-semibold text-emerald-600">Included</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between text-base font-extrabold text-gray-900">
                  <span>Total Drive Away</span>
                  <span className="text-blue-600">$32,990</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 no-underline shadow-md shadow-blue-600/20"
                >
                  Proceed to Enquiry / Hold <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/vehicles"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-2xl text-sm transition-colors flex items-center justify-center no-underline border border-gray-200"
                >
                  Continue Browsing
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
