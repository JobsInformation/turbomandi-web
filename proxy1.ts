import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Let people access the login page
  const isPublicPath = path === '/admin/login';
  // Check if they have the token we set during login
  const token = request.cookies.get('admin_token')?.value || '';

  // If they are trying to access /admin pages without a token, redirect to login
  if (path.startsWith('/admin') && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
  }
}

// Only run this middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
}
