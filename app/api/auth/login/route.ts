import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

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

    // Auto-provision default admin if not found
    if (!user && email === 'admin@turbomandi.com') {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      user = await prisma.user.create({
        data: {
          email: 'admin@turbomandi.com',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { password: _, ...userInfo } = user;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userInfo
    }, { status: 200 });

  } catch (error: any) {
    console.error('Auth Login Fatal Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
