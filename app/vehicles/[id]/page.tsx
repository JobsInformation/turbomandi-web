import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: Number(id) },
  });

  if (!vehicle) {
    notFound();
  }

  const v = vehicle as any;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/vehicles" className="text-zinc-400 hover:text-white text-sm mb-6 inline-block">
          &larr; Back to Marketplace
        </Link>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs text-red-500 font-semibold uppercase tracking-wider">{v.make || 'Vehicle'}</span>
              <h1 className="text-3xl font-bold text-white mt-1">{v.title || `${v.year || ''} ${v.make || ''} ${v.model || ''}`}</h1>
            </div>
            <div className="text-2xl font-bold text-red-500">PKR {v.price?.toLocaleString()}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-zinc-800 my-6 text-sm">
            <div><span className="text-zinc-500 block">Year</span><span className="font-semibold">{v.year}</span></div>
            <div><span className="text-zinc-500 block">Mileage</span><span className="font-semibold">{v.mileage}</span></div>
            <div><span className="text-zinc-500 block">Transmission</span><span className="font-semibold">{v.transmission}</span></div>
            <div><span className="text-zinc-500 block">Fuel Type</span><span className="font-semibold">{v.fuelType || 'Petrol'}</span></div>
          </div>

          {v.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-zinc-300 mb-2">Description</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{v.description}</p>
            </div>
          )}

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-xs text-zinc-500">Contact Seller</p>
              <p className="text-sm font-semibold text-zinc-200">{v.sellerPhone || 'Contact Dealer'}</p>
            </div>
            {v.sellerPhone && (
              <a
                href={`tel:${v.sellerPhone}`}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Call Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
