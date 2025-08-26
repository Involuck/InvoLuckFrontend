import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated by looking for the token cookie
  const isAuthenticated = request.cookies.get('token')?.value === 'mock-token';

  // Redirect to login if accessing root without authentication
  /*   if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } */

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register')
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Protect authenticated routes
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/clients') ||
    pathname.startsWith('/invoices') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/users')
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/dashboard',
    '/clients/:path*',
    '/invoices/:path*',
    '/reports/:path*',
    '/settings/:path*',
    '/users/:path*'
  ]
};
