import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const validPassword = process.env.ADMIN_PASSWORD || 'RoyalAuto#2026!';
    
    if (password === validPassword) {
      // Await the cookies object before setting it (Next.js 15 requirement)
      const cookieStore = await cookies();
      cookieStore.set('royal_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
