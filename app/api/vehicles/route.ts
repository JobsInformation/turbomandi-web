import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, odometer, status, body: bodyType, fuel, trans } = body;
    
    const newVehicle = await prisma.vehicle.create({
      data: {
        name,
        price: Number(price),
        odometer: odometer || '10,000 km',
        status: status || 'Available',
        body: bodyType || 'SUV',
        fuel: fuel || 'Petrol',
        trans: trans || 'Auto'
      }
    });

    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
