import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/auth/login')) {
    const isAuthenticated = request.cookies.get('token')?.value === 'mock-token'
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/authenticated/dashboard', request.url))
    }
  }

  if (pathname.startsWith('/authenticated')) {
    const isAuthenticated = request.cookies.get('token')?.value === 'mock-token'
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/authenticated/:path*'
  ]
}