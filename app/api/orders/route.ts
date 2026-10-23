import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, email, phone, address, city, items, total, status } = body;
    
    if (!customerName || total === undefined || total === null) {
      return NextResponse.json({ error: 'Customer name and total are required' }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName: String(customerName),
        email: email ? String(email) : null,
        phone: phone ? String(phone) : null,
        address: address ? String(address) : null,
        city: city ? String(city) : null,
        // Ensure items are stored as a JSON string matching the schema
        items: typeof items === 'string' ? items : JSON.stringify(items || []),
        total: Number(total),
        status: status ? String(status) : 'Completed'
      }
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
