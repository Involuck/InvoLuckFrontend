import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- EXISTING LOGIC ---
  // Check if user is authenticated by looking for the token cookie.
  // NOTE: This 'mock-token' should be replaced with a real token validation logic.
  const isAuthenticated = request.cookies.get('token')?.value === 'mock-token';

  // --- EXISTING LOGIC ---
  // If user is authenticated and tries to access auth pages, redirect to dashboard.
  // This prevents logged-in users from seeing the login/register pages again.
  if (
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register')
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // --- MODIFIED LOGIC FOR PROTECTED ROUTES ---

  // Define the routes that require authentication.
  const protectedRoutes = [
    '/dashboard',
    '/clients',
    '/invoices',
    '/reports',
    '/settings',
    '/users'
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // 1. Handle Unauthenticated Users (401 Unauthorized)
    if (!isAuthenticated) {
      // MODIFICATION: Instead of redirecting directly to login,
      // we now redirect to the custom 401 unauthorized page.
      // This provides a better user experience by explaining why they were redirected.
      return NextResponse.redirect(new URL('/error/unauthorized', request.url));
    }

    // 2. Handle Unauthorized Access based on Role (403 Forbidden) - Placeholder
    // This is where you would add logic to check user roles/permissions.
    // The following block is a placeholder. When you implement real user roles,
    // you can uncomment and complete this logic.
    /*
    const userRole = 'user'; // This should be decoded from the token in a real app.

    if (pathname.startsWith('/users') && userRole !== 'admin') {
      // If a non-admin user tries to access the user management page,
      // redirect them to the custom 403 forbidden page.
      return NextResponse.redirect(new URL('/error/forbidden', request.url));
    }
    */
  }

  // --- EXISTING LOGIC ---
  // If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next();
}

// --- CONFIGURATION (NO CHANGES NEEDED) ---
// The matcher defines which paths the middleware will run on.
// This configuration is correct and doesn't need to be changed for our new logic.
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
