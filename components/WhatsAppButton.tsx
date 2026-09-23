'use client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-emerald-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50">
      <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
    </a>
  );
}
