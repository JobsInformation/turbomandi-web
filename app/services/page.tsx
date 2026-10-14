import Link from 'next/link';
import { Wrench, ShieldCheck, Calendar } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            VIC Licensed Workshop & Service Centre
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Royal Auto Hub Workshop
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Book your service appointment today. From routine oil changes to complex engine diagnostics, our certified technicians ensure your vehicle performs at its peak.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Expert Care & Maintenance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our state-of-the-art Melbourne workshop is equipped with advanced diagnostic tools and staffed by factory-trained technicians specializing in both imported and domestic vehicles.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Certified Technicians</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Specialized in hybrid systems, engine tune-ups, and logbook servicing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Genuine OEM Parts</h4>
                    <p className="text-xs text-gray-500 mt-0.5">We exclusively use manufacturer-approved lubricants and replacement parts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Side */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Schedule Service Appointment</h3>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Smith"
                  className="w-full p-3 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +61 400 000 000"
                  className="w-full p-3 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Vehicle Make & Model</label>
                <input
                  type="text"
                  placeholder="e.g. Toyota Camry 2023"
                  className="w-full p-3 rounded-2xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Service Type</label>
                  <select className="w-full p-3 rounded-2xl border border-gray-300 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="general">General Maintenance</option>
                    <option value="logbook">Logbook Servicing</option>
                    <option value="rwc">Roadworthy Inspection (RWC)</option>
                    <option value="diagnostics">Engine Diagnostics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-2xl border border-gray-300 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                Confirm Appointment
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
