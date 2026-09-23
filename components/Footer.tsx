import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="text-xl font-black italic tracking-wider bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent block mb-3">
            TURBOMANDI
          </span>
          <p className="text-xs text-zinc-500">
            Pakistan's premier digital automotive marketplace for verified vehicles, OEM auto parts, and workshop services.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">Marketplace</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/vehicles?type=CAR" className="hover:text-red-500 transition-colors">Used Cars</Link></li>
            <li><Link href="/vehicles?type=BIKE" className="hover:text-red-500 transition-colors">Motorbikes</Link></li>
            <li><Link href="/parts" className="hover:text-red-500 transition-colors">Genuine Parts</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition-colors">Workshop Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">Admin Portal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/admin" className="hover:text-red-500 transition-colors">Dashboard Overview</Link></li>
            <li><Link href="/vehicles/new" className="hover:text-red-500 transition-colors">Post Vehicle</Link></li>
            <li><Link href="/parts/new" className="hover:text-red-500 transition-colors">Add Auto Part</Link></li>
            <li><Link href="/admin/bookings" className="hover:text-red-500 transition-colors">Service Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">Support</h4>
          <p className="text-xs text-zinc-500 mb-2">Need immediate assistance with an order or booking?</p>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-zinc-900 border border-zinc-800 text-emerald-400 hover:bg-emerald-600 hover:text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
          >
            Direct WhatsApp Support
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-zinc-900/80 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} TurboMandi. All rights reserved.
      </div>
    </footer>
  );
}
