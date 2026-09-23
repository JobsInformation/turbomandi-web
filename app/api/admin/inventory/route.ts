import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Querying the 'Part' table where stock is 3 or less
    const lowStockParts = await prisma.part.findMany({
      where: {
        stock: {
          lte: 3,
        },
      },
      orderBy: {
        stock: 'asc',
      },
    });

    return NextResponse.json({ lowStockProducts: lowStockParts }, { status: 200 });
  } catch (error) {
    console.error('Inventory check error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory status' },
      { status: 500 }
    );
  }
}
