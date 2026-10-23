import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const parts = await prisma.part.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(parts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch parts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, sku, category, price, stock } = body;
    
    if (!name || price === undefined || price === null) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const newPart = await prisma.part.create({
      data: {
        name,
        sku,
        category: category || 'General',
        partNumber: `PN-${Date.now()}`,
        price: Number(price),
        stock: Number(stock) || 0
      }
    });

    return NextResponse.json(newPart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create part' }, { status: 500 });
  }
}
