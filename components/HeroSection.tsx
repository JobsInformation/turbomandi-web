'use client';
import { Car, Package, Wrench, Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-zinc-950 text-white py-16 px-4 text-center border-b border-zinc-800">
      <h1 className="text-4xl sm:text-6xl font-black uppercase mb-4">
        Drive, Maintain & Upgrade <br />
        <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">All In One Mandi</span>
      </h1>
      <p className="text-zinc-400 max-w-xl mx-auto mb-8">Browse certified cars, bikes, auto parts, and workshop services.</p>
    </section>
  );
}
