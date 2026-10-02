import Link from 'next/link';

// SEO Metadata for Google
export const metadata = {
  title: 'TurboMandi | Pakistan\'s Premium Hub for Vehicles & Parts',
  description: 'Buy, sell, and trade high-performance cars, bikes, and auto parts in Pakistan.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tight mb-6">
          PAKISTAN'S <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">PREMIUM HUB</span> <br /> 
          FOR PERFORMANCE
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Rev up your ride. Discover exclusive cars, bikes, and premium parts, or list your own in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/vehicles" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors w-full sm:w-auto">
            Explore Inventory
          </Link>
          <Link href="/vehicles/new" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors w-full sm:w-auto">
            Post an Ad
          </Link>
        </div>
        
        {/* Trust Signal Microcopy */}
        <p className="text-zinc-500 text-sm mt-4">
          ✓ 100% Free to list &nbsp; ✓ Verified Sellers &nbsp; ✓ Secure Platform
        </p>
      </section>
    </main>
  );
}
