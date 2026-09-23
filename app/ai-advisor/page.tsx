'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Bot, User, ArrowLeft, Car, Box, Gauge, Tag, ShieldCheck } from 'lucide-react';

export default function AIAdvisorPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your TurboMandi AI Advisor. Ask me for complete vehicle information, technical specs, or matching spare parts.',
      parts: [],
      vehicles: []
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage = query;
    setQuery('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });

      const data = await res.json();
      if (res.ok) {
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'ai',
            text: data.response,
            parts: data.parts,
            vehicles: data.vehicles
          }
        ]);
      } else {
        setChatHistory(prev => [
          ...prev,
          { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' }
        ]);
      }
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: 'Network connection error.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-2 mb-8 transition w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Store Home
        </Link>

        <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-6">
          <div className="w-12 h-12 bg-red-600/10 border border-red-900/40 text-red-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">TurboMandi AI Advisor</h1>
            <p className="text-zinc-500 text-sm">Comprehensive vehicle specs & parts intelligence</p>
          </div>
        </div>

        {/* Chat Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 min-h-[450px] max-h-[650px] overflow-y-auto mb-6 space-y-6 flex flex-col">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-2xl w-full rounded-2xl p-5 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-red-600 text-white rounded-br-none max-w-xl' 
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-bl-none'
              }`}>
                <p className="leading-relaxed mb-4">{msg.text}</p>

                {/* Complete Vehicle Information Cards */}
                {msg.vehicles && msg.vehicles.length > 0 && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-zinc-800">
                    <span className="text-xs font-bold uppercase text-red-500 tracking-wider flex items-center gap-1.5">
                      <Car className="w-4 h-4" /> Complete Vehicle Specifications:
                    </span>
                    {msg.vehicles.map((v: any) => (
                      <div key={v.id} className="bg-zinc-900 border border-zinc-800/90 p-5 rounded-2xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-black text-white tracking-wide">{v.make} {v.model}</h3>
                            <p className="text-zinc-400 text-xs mt-0.5">Model Year: <span className="text-zinc-200 font-bold">{v.year}</span> • Body Type: <span className="text-zinc-200 font-bold">{v.type}</span></p>
                          </div>
                          <span className="bg-red-950/60 border border-red-900/50 text-red-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                            {v.tag}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                          <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60">
                            <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold"><Gauge className="w-3 h-3 text-red-500"/> Mileage</div>
                            <div className="text-xs font-bold text-zinc-200 mt-1">{v.mileage}</div>
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60">
                            <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold"><ShieldCheck className="w-3 h-3 text-red-500"/> Transmission</div>
                            <div className="text-xs font-bold text-zinc-200 mt-1">{v.transmission}</div>
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60 col-span-2 md:col-span-1">
                            <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold"><Tag className="w-3 h-3 text-red-500"/> Listing Price</div>
                            <div className="text-xs font-black text-emerald-400 mt-1">PKR {v.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matching Parts */}
                {msg.parts && msg.parts.length > 0 && (
                  <div className="space-y-2 mt-4 pt-4 border-t border-zinc-800">
                    <span className="text-xs font-bold uppercase text-red-500 tracking-wider flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5" /> Compatible Spare Parts in Store:
                    </span>
                    {msg.parts.map((p: any) => (
                      <div key={p.id} className="bg-zinc-900 border border-zinc-800/80 p-3 rounded-xl flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white text-xs">{p.name}</div>
                          <div className="text-zinc-500 text-[10px]">Category: {p.category} | SKU: {p.sku || 'N/A'} | Stock: {p.stock} units</div>
                        </div>
                        <div className="text-emerald-400 font-bold text-xs">PKR {p.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 items-center text-zinc-500 text-sm">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white animate-spin" />
              </div>
              <span>Retrieving complete vehicle specifications and store records...</span>
            </div>
          )}
        </div>

        {/* Query Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask e.g. 'Tell me about Honda Civic' or 'Fortuner specs and parts'"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-2xl font-bold flex items-center gap-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </main>
  );
}
