import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Allow the login page itself to pass through
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 2. Check for the admin session cookie
  const authCookie = req.cookies.get('admin_session');

  if (!authCookie || authCookie.value !== 'authenticated') {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
