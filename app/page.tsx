import Link from 'next/link';
import { Car, ShieldCheck, ArrowRight, Search, FileText, Calculator, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Hero Banner (Royal Blue per specification) */}
      <section 
        className="text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-lg"
        style={{ backgroundColor: '#1e3a8a' }}
      >
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-800 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-700 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-300" />
              VIC Licensed Motor Car Trader (LMCT)
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
              Built on Trust. <span className="text-blue-200 block mt-1">Focused on You.</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed font-normal">
              Explore certified Victorian used vehicles, transparent pricing, guaranteed quality, and seamless financing tailored to your needs[cite: 2].
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/inventory"
                className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
              >
                Browse Vehicles
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sell-car"
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl border border-blue-600 transition-all flex items-center justify-center gap-2 text-base shadow-md"
              >
                Value My Car
              </Link>
            </div>
          </div>

          {/* Hero Quick Search Box */}
          <div className="w-full max-w-md bg-white text-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Find Your Next Vehicle
            </h3>
            <form action="/inventory" method="GET" className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Make / Keyword</label>
                <input
                  type="text"
                  name="search"
                  placeholder="e.g. Toyota, Mazda, SUV"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none text-gray-900 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Maximum Price ($ AUD)</label>
                <select
                  name="maxPrice"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none bg-white text-gray-900"
                >
                  <option value="">Any Budget</option>
                  <option value="20000">Under $20,000</option>
                  <option value="35000">Under $35,000</option>
                  <option value="50000">Under $50,000</option>
                  <option value="75000">Under $75,000</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm cursor-pointer"
              >
                Search Stock Inventory
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Trust & Value Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            The Royal Auto Hub Standard
          </h2>
          <p className="text-base text-gray-600">
            We deliver complete transparency, rigorous vehicle inspection standards, and a customer-first purchasing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Victorian LMCT Certified</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fully licensed dealer complying with all Victorian consumer protection and statutory vehicle standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Inspected Quality</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every vehicle undergoes rigorous mechanical inspection and history verification before being listed for sale.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Pricing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Clear advertised pricing with upfront details regarding government charges and transfer requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Action CTA Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Finance Options</h3>
              <p className="text-gray-600 text-sm mb-6">
                Estimate your borrowing power and request a finance callback tailored to your personal or business requirements.
              </p>
            </div>
            <Link
              href="/finance"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm"
            >
              Explore Finance Calculator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sell or Trade-In Your Car</h3>
              <p className="text-gray-600 text-sm mb-6">
                Submit your vehicle details for an indicative valuation and fast appraisal from our acquisitions team.
              </p>
            </div>
            <Link
              href="/sell-car"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm"
            >
              Request Trade-In Valuation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
