import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, city, address, items, total } = body;

    if (!customerName || !phone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required customer details or items' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Validate and deduct stock for each item in cart
      for (const item of items) {
        // Convert ID to match schema type (number if integer ID, otherwise string)
        const targetId = isNaN(Number(item.id)) ? item.id : Number(item.id);

        const part = await tx.part.findUnique({
          where: { id: targetId },
        });

        if (!part) {
          throw new Error(`Part "${item.name || item.id}" not found.`);
        }

        const qty = item.quantity || 1;
        if (part.stock < qty) {
          throw new Error(`Insufficient stock for "${part.name}". Available: ${part.stock}`);
        }

        // Deduct stock
        await tx.part.update({
          where: { id: targetId },
          data: {
            stock: {
              decrement: qty,
            },
          },
        });
      }

      // Record order in database
      const newOrder = await tx.order.create({
        data: {
          customerName,
          phone,
          city: city || 'N/A',
          address: address || 'N/A',
          items: JSON.stringify(items),
          total: parseFloat(total) || 0,
          status: 'PENDING',
        },
      });

      return newOrder;
    });

    return NextResponse.json({ success: true, order: result }, { status: 201 });
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to place order' },
      { status: 400 }
    );
  }
}
