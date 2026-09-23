import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
      data: {
        make: body.make,
        model: body.model,
        year: Number(body.year),
        price: Number(body.price),
        mileage: String(body.mileage || '0'),
        transmission: body.transmission || 'Automatic',
        type: body.type || 'Car',
        tag: body.tag || 'USED',
      },
    });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
