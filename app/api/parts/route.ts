import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/adminAuth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category && category !== 'All') {
      whereClause.category = category;
    }

    const parts = await prisma.part.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(parts);
  } catch (error) {
    console.error('Failed to fetch parts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req.cookies.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, sku, category, price, stock } = body;

    if (!name || price === undefined || price === null) {
      return NextResponse.json(
        { error: 'Part name and price are required' },
        { status: 400 }
      );
    }

    const newPart = await prisma.part.create({
      data: {
        name,
        sku: sku || null,
        category: category || 'General',
        price: Number(price),
        stock: stock !== undefined && stock !== null ? Number(stock) : 10,
      },
    });

    return NextResponse.json(newPart, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create part:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create part' },
      { status: 500 }
    );
  }
}
