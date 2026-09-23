import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Seed endpoint active. Run seed CLI script for database populations.' });
}
