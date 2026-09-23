import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TurboMandi - Auto Marketplace & Workshop Services',
  description: 'Verified Vehicles, Auto Parts, and Mechanics in Pakistan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col justify-between`}>
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
