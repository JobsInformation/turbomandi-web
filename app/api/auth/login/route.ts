import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import { adminToken } from '@/lib/adminAuth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
    } catch (dbErr) {
      console.error('Database query error (Did you run prisma db push?):', dbErr);
      return NextResponse.json({ error: 'Database table missing or uninitialized.' }, { status: 500 });
    }


    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { password: _, ...userInfo } = user;

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userInfo
    }, { status: 200 });

    if (user.role === 'ADMIN') {
      response.cookies.set('admin_session', adminToken(), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 8,
      });
    }

    return response;

  } catch (error: any) {
    console.error('Auth Login Fatal Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
