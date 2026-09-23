'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Car, Box, Wrench, Sparkles, ShieldAlert, ClipboardList, 
  ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Gauge, Tag 
} from 'lucide-react';

const slideshowItems = [
  {
    id: 1,
    title: 'Honda Civic RS 1.5 Turbo',
    category: 'Authorized Inventory • Hot Deal',
    price: 'PKR 9,500,000',
    specs: { year: '2023', mileage: '12,000 km', trans: 'Automatic' },
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    title: 'Toyota Fortuner Legender',
    category: 'Luxury SUV • Brand New',
    price: 'PKR 19,500,000',
    specs: { year: '2024', mileage: '0 km', trans: 'Automatic' },
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    title: 'Yamaha R1 / Heavy Superbike',
    category: 'Performance Bikes • Certified',
    price: 'PKR 4,200,000',
    specs: { year: '2023', mileage: '3,500 km', trans: 'Manual 6-Speed' },
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 4,
    title: 'Suzuki Swift GLX CVT',
    category: 'Compact Hatchback • Like New',
    price: 'PKR 4,700,000',
    specs: { year: '2024', mileage: '5,000 km', trans: 'CVT Automatic' },
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const session = localStorage.getItem('turbomandi_user');
    if (session) {
      try {
        const user = JSON.parse(session);
        if (user.role === 'ADMIN') setIsAdmin(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Auto advance slideshow every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideshowItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slideshowItems.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + slideshowItems.length) % slideshowItems.length);

  const activeItem = slideshowItems[currentSlide];

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-red-600 selection:text-white font-sans">
      {/* Top Notification Bar */}
      <div className="bg-red-600 text-white text-xs font-bold py-2 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        Pakistan's Premier Single-Dealer Automotive & Workshop Platform • Certified Quality Assured
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter uppercase">Turbo<span className="text-red-600">Mandi</span></span>
            <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Authorized Dealership</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <Link href="/vehicles" className="hover:text-white transition">Vehicles</Link>
          <Link href="/parts" className="hover:text-white transition">Parts Store</Link>
          <Link href="/workshop" className="hover:text-white transition">Workshop Booking</Link>
          <Link href="/track" className="hover:text-white transition">Order Tracking</Link>
          <Link href="/ai-advisor" className="text-red-500 hover:text-red-400 flex items-center gap-1.5 transition">
            <Sparkles className="w-3.5 h-3.5" /> AI Advisor
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <Link href="/admin" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition shadow-lg shadow-red-600/20 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Admin Panel
            </Link>
          ) : (
            <Link href="/login" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition">
              Sign In
            </Link>
          )}
          <Link href="/cart" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-2.5 rounded-xl relative transition">
            <Box className="w-4 h-4 text-zinc-300" />
          </Link>
        </div>
      </header>

      {/* Hero Section with Interactive Slideshow */}
      <section className="relative px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-900/40 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Authorized Inventory & Expert Care
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
            Drive the Future with <span className="text-red-600">TurboMandi</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Explore certified dealership vehicles, heavy superbikes, genuine OEM parts, professional workshop appointment scheduling, and instant AI automotive advice.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/vehicles" className="bg-red-600 hover:bg-red-700 text-white font-black px-7 py-4 rounded-2xl uppercase tracking-wider text-xs transition flex items-center gap-2 shadow-xl shadow-red-600/35">
              Browse Vehicles <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ai-advisor" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-black px-7 py-4 rounded-2xl uppercase tracking-wider text-xs transition flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" /> Ask AI Advisor
            </Link>
          </div>
        </div>

        {/* Slideshow Card Visual Banner */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden relative shadow-2xl group">
          <div className="relative h-72 sm:h-80 w-full overflow-hidden">
            <img 
              src={activeItem.image} 
              alt={activeItem.title} 
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
            
            {/* Top Badge */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                {activeItem.category}
              </span>
              <span className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-lg">
                {activeItem.price}
              </span>
            </div>

            {/* Slideshow Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-zinc-950/70 hover:bg-zinc-900 text-white p-2 rounded-xl border border-zinc-800 transition backdrop-blur-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-950/70 hover:bg-zinc-900 text-white p-2 rounded-xl border border-zinc-800 transition backdrop-blur-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 bg-zinc-900 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black uppercase text-white">{activeItem.title}</h3>
              <div className="flex gap-1.5">
                {slideshowItems.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-red-600' : 'w-1.5 bg-zinc-700'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800/80">
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60 text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-bold">Year</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeItem.specs.year}</div>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60 text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-bold">Mileage</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeItem.specs.mileage}</div>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60 text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-bold">Trans</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeItem.specs.trans}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-3">Enterprise Ecosystem</h2>
          <p className="text-zinc-500 text-sm">Everything you need for your vehicle under one unified roof.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/vehicles" className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 bg-red-600/10 border border-red-900/40 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Vehicle Catalog</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Browse inspected sedans, SUVs, and superbikes with verified pricing.</p>
            <span className="text-xs font-bold text-red-500 flex items-center gap-1 group-hover:gap-2 transition">Explore Inventory &rarr;</span>
          </Link>

          <Link href="/parts" className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 bg-red-600/10 border border-red-900/40 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Parts E-Commerce</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Genuine OEM filters, spark plugs, fluids, and suspension parts with secure checkout.</p>
            <span className="text-xs font-bold text-red-500 flex items-center gap-1 group-hover:gap-2 transition">Shop Parts &rarr;</span>
          </Link>

          <Link href="/workshop" className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 bg-red-600/10 border border-red-900/40 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Workshop Bookings</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Schedule expert maintenance, oil changes, and diagnostics slots online.</p>
            <span className="text-xs font-bold text-red-500 flex items-center gap-1 group-hover:gap-2 transition">Book Appointment &rarr;</span>
          </Link>

          <Link href="/ai-advisor" className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 bg-red-600/10 border border-red-900/40 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">AI Advisor</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">Chat with our intelligent assistant for instant vehicle specs and part matching.</p>
            <span className="text-xs font-bold text-red-500 flex items-center gap-1 group-hover:gap-2 transition">Start Chat &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 px-6 lg:px-12 py-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-black uppercase tracking-tight text-white">
            <Car className="w-4 h-4 text-red-600" /> TurboMandi Pakistan
          </div>
          <div>&copy; {new Date().getFullYear()} TurboMandi. All rights reserved. Single-Dealer Architecture.</div>
        </div>
      </footer>
    </main>
  );
}
