import Link from 'next/link';
import { Car, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">Royal Auto Hub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Victoria's premier licensed motor car trader offering certified pre-owned vehicles, rigorous multi-point inspections, and transparent drive-away pricing.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors no-underline text-gray-400">Home</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors no-underline text-gray-400">Verified Inventory</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors no-underline text-gray-400">My Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors no-underline text-gray-400">Cart & Enquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Certification</h4>
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700/60 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                VIC LMCT Compliant
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                All vehicles undergo strict Roadworthy Certification (RWC) and PPSR clear title verification before delivery.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact & Location</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Melbourne Showroom, Victoria, Australia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+61 3 9000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>sales@royalautohub.com.au</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Royal Auto Hub (LMCT Certified). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
