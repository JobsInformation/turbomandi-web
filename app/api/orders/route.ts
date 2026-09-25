import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchId = searchParams.get('id') || searchParams.get('search');

    if (searchId) {
      const order = await prisma.order.findUnique({
        where: { id: searchId.trim() },
      });
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, city, address, items, total, totalAmount } = body;

    if (!customerName || !phone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required customer details or items' },
        { status: 400 }
      );
    }

    const orderTotal = parseFloat(total || totalAmount) || 0;

    const newOrder = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const numericId = Number(item.id);
        if (!isNaN(numericId)) {
          const part = await tx.part.findUnique({
            where: { id: numericId },
          });

          if (part) {
            const qty = Number(item.quantity) || 1;
            if (part.stock < qty) {
              throw new Error(`Insufficient stock for "${part.name}". Available: ${part.stock}`);
            }
            await tx.part.update({
              where: { id: numericId },
              data: { stock: { decrement: qty } },
            });
          }
        }
      }

      return await tx.order.create({
        data: {
          customerName,
          email: email || null,
          phone,
          city: city || 'N/A',
          address: address || 'N/A',
          items: JSON.stringify(items),
          total: orderTotal,
          status: 'PENDING',
        },
      });
    });

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      order: newOrder,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to place order' },
      { status: 400 }
    );
  }
}
