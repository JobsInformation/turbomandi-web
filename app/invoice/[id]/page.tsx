import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params to properly extract the ID
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  // 2. Fetch the order using the resolved ID
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  // 3. Handle missing order
  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Invoice Not Found</h1>
        <Link href="/" className="text-red-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  // 4. SAFELY parse items
  let parsedItems = [];
  try {
    if (order.items) {
      parsedItems = typeof order.items === 'string' 
        ? JSON.parse(order.items) 
        : order.items;
    }
  } catch (e) {
    console.warn('Malformed items JSON detected:', e);
    parsedItems = [];
  }

  if (!Array.isArray(parsedItems)) {
    parsedItems = [];
  }

  // 5. Render the UI
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">INVOICE</h1>
            <p className="text-zinc-400 font-mono text-xs">#{order.id}</p>
          </div>
          <div className="text-right">
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              order.status === 'SHIPPED'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {order.status || 'PENDING'}
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">Billed To:</h3>
            <p className="text-white font-medium">{order.customerName || 'Guest'}</p>
            {order.email && <p className="text-zinc-400 text-sm">{order.email}</p>}
            {order.phone && <p className="text-zinc-400 text-sm">{order.phone}</p>}
          </div>
          <div className="text-right">
            <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">Shipped To:</h3>
            <p className="text-zinc-300 text-sm">{order.address}</p>
            {order.city && <p className="text-zinc-300 text-sm">{order.city}</p>}
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-4">Order Items</h3>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-900/50 border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase">Item</th>
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {parsedItems.length > 0 ? (
                  parsedItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="py-3 px-4 text-sm text-zinc-200">{item.name || 'Unknown Item'}</td>
                      <td className="py-3 px-4 text-sm text-zinc-200 text-right">Rs. {item.price || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-6 text-center text-zinc-500 text-sm">
                      No items found or items data is corrupted.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer & Total */}
        <div className="flex justify-between items-center border-t border-zinc-800 pt-6">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            &larr; Return to Store
          </Link>
          <div className="text-right">
            <p className="text-zinc-400 text-sm mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-white">Rs. {order.total?.toLocaleString() || 0}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
