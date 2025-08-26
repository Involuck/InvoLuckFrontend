import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*   if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } */

  if (pathname.startsWith('/auth/login')) {
    const isAuthenticated =
      request.cookies.get('token')?.value === 'mock-token';
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL('/dashboard', request.url)
      );
    }
  }

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/clients') || pathname.startsWith('/invoices') || pathname.startsWith('/reports') || pathname.startsWith('/settings') || pathname.startsWith('/users')) {
    const isAuthenticated =
      request.cookies.get('token')?.value === 'mock-token';
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*', '/dashboard', '/clients/:path*', '/invoices/:path*', '/reports/:path*', '/settings/:path*', '/users/:path*']
};
