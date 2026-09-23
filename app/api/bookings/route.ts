import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a fully complete app, you would save this to your database via Prisma here.
    // e.g., const newBooking = await prisma.booking.create({ data });
    
    console.log('✅ New Workshop Booking Received:', data);

    // Simulate a slight database processing delay so the loading state feels natural
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return a success status to the frontend
    return NextResponse.json(
      { success: true, message: 'Booking created successfully.' }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request' }, 
      { status: 500 }
    );
  }
}
