'use client';
import { ShieldCheck, Award, ThumbsUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <div className="bg-blue-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Why Choose Royal Auto Hub?</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Victoria's trusted LMCT certified dealer dedicated to transparency and quality vehicles.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">LMCT Certified</h3>
          <p className="text-slate-600 text-sm">Fully licensed Victorian motor car trader ensuring complete consumer protection and peace of mind.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-14 h-14 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Quality Inspected</h3>
          <p className="text-slate-600 text-sm">Every vehicle undergoes a rigorous multi-point mechanical inspection before hitting our showroom floor.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-14 h-14 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Transparent Pricing</h3>
          <p className="text-slate-600 text-sm">Clear, honest pricing with zero hidden dealer fees or unexpected surprises.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center bg-blue-50 border border-blue-100 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to find your next car?</h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">Browse our current stock or get in touch with our friendly team today.</p>
        <div className="flex justify-center gap-4">
          <Link href="/vehicles" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-colors">View Stock</Link>
          <Link href="/contact" className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
