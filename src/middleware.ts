import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('token')?.value === 'mock-token'

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Proteger rutas autenticadas
  if (pathname.startsWith('/authenticated')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Redirigir usuarios autenticados fuera de páginas de auth
  if (isAuthenticated && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/authenticated/dashboard', request.url))
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