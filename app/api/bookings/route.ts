import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.serviceBooking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { customerName, phone, vehicleInfo, serviceType, preferredDate, date, notes } = data;

    if (!customerName || !phone) {
      return NextResponse.json(
        { error: 'Customer name and phone number are required.' },
        { status: 400 }
      );
    }

    const newBooking = await prisma.serviceBooking.create({
      data: {
        customerName,
        phone,
        vehicleInfo: vehicleInfo || 'Vehicle',
        serviceType: serviceType || 'General Maintenance',
        preferredDate: preferredDate || date || 'Soonest Available',
        notes: notes || null,
        status: 'CONFIRMED',
      },
    });

    console.log('✅ New Workshop Booking Saved:', newBooking.id);

    return NextResponse.json(
      { success: true, message: 'Booking created successfully.', booking: newBooking }, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Booking Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process booking request' }, 
      { status: 500 }
    );
  }
}
