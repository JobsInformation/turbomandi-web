import './globals.css';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export const metadata = {
  title: 'Royal Auto Hub | VIC LMCT Certified Dealer',
  description: 'Premium Victorian used vehicles. Built on Trust. Focused on You.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-slate-800">
        {/* Top Announcement Bar */}
        <div className="bg-blue-800 text-white text-xs py-2 px-6 flex justify-center md:justify-between items-center">
          <span className="hidden md:inline">📍 Victoria, Australia | LMCT Certified Dealer</span>
          <span className="font-medium tracking-wide">Built on Trust. Focused on You.</span>
        </div>

        {/* Main Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/logo.jpg" alt="Royal Auto Hub Logo" className="h-14 object-contain" />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
              <Link href="/vehicles" className="hover:text-blue-700 transition-colors">Vehicles & Stock</Link>
              <Link href="/finance" className="hover:text-blue-700 transition-colors">Finance</Link>
              <Link href="/sell" className="hover:text-blue-700 transition-colors">Sell Your Car</Link>
              <Link href="/about" className="hover:text-blue-700 transition-colors">Why Us</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
                <Phone className="w-4 h-4" /> Contact
              </Link>
              <Link href="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-blue-600">Admin</Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/logo.jpg" alt="Royal Auto Hub Logo" className="h-12 bg-white px-2 py-1 rounded mb-4 object-contain" />
              <p className="text-sm text-slate-400">Premium quality vehicles, fair deals, and transparency you can trust. Australian owned and operated.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Dealership</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>123 Auto Hub Drive, Victoria</li>
                <li>LMCT: [Add LMCT Number]</li>
                <li>ABN: [Add ABN]</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/vehicles" className="hover:text-white transition-colors">Search Stock</Link></li>
                <li><Link href="/finance" className="hover:text-white transition-colors">Finance Options</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Mon - Fri: 9:00 AM - 5:30 PM</li>
                <li>Saturday: 9:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
