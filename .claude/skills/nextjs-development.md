# Next.js Development - InvoLuck Frontend

## Overview

This skill covers Next.js 15 App Router patterns, file conventions, and best
practices used in InvoLuck.

## Project Configuration

### Next.js Version

- Next.js 15.5.0
- React 18.2.0
- App Router (not Pages Router)

### Next.js Config

Location: `next.config.mjs`

```javascript
const nextConfig = {
  reactStrictMode: true,

  // SVG handling with security
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ];
  }
};
```

## App Router Structure

```
src/app/
├── (authenticated)/          # Route group - requires auth
│   ├── dashboard/
│   │   └── page.tsx
│   ├── invoices/
│   │   └── page.tsx
│   ├── clients/
│   │   └── page.tsx
│   ├── reports/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── layout.tsx            # Shared layout with DashboardLayout
├── auth/                     # Public auth routes
│   ├── login/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── register/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── layout.tsx
├── api/                      # API Routes
│   └── logo/
│       └── route.ts
├── error/                    # Error pages
│   ├── forbidden/page.tsx    # 403
│   ├── unauthorized/page.tsx # 401
│   └── internal-server-error/page.tsx # 500
├── layout.tsx                # Root layout
├── page.tsx                  # Home/Landing page
├── not-found.tsx             # 404 page
├── loading.tsx               # Loading UI
├── globals.css               # Global styles
├── robots.ts                 # Dynamic robots.txt
└── sitemap.ts                # Dynamic sitemap
```

## File Conventions

### page.tsx

Each route needs a `page.tsx` file:

```typescript
// src/app/(authenticated)/dashboard/page.tsx
import { DashboardLayout } from '@/components/layout';

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      {/* Page content */}
    </DashboardLayout>
  );
}
```

### layout.tsx

Shared layouts for route segments:

```typescript
// src/app/(authenticated)/layout.tsx
export default function AuthenticatedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

### loading.tsx

Loading UI while page loads:

```typescript
// src/app/loading.tsx
import Spinner from '@/components/pure/feedback/loading/Spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="large" />
    </div>
  );
}
```

### not-found.tsx

Custom 404 page:

```typescript
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600">Página no encontrada</p>
      <Link href="/" className="text-purple-600 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
```

## Root Layout

Location: `src/app/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/pure/feedback/toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'InvoLuck - Gestión Inteligente de Facturación',
    template: '%s | InvoLuck'
  },
  description: 'Plataforma de gestión inteligente para tu negocio...',
  // ... more metadata
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#7c3aed' }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className={inter.className}>
        {/* Dark mode script for flash prevention */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `
        }} />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Client vs Server Components

### 'use client' Directive

All interactive components must have `'use client'` at the top:

```typescript
'use client';

import { useState } from 'react';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### When to use 'use client'

- Using React hooks (useState, useEffect, useContext, etc.)
- Using browser APIs (window, document, localStorage)
- Using event handlers (onClick, onChange, etc.)
- Using Framer Motion animations
- Using third-party client libraries

### Server Components (default)

Components without 'use client' are Server Components:

- Can directly access databases
- Can use async/await at component level
- Cannot use hooks or browser APIs

## Navigation

### Link Component

```typescript
import Link from 'next/link';

<Link href="/dashboard">Dashboard</Link>
<Link href="/invoices/123">Invoice Detail</Link>
```

### useRouter Hook

```typescript
'use client';

import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard');
    // or
    router.replace('/login');
    // or
    router.back();
  };
};
```

### usePathname Hook

```typescript
'use client';

import { usePathname } from 'next/navigation';

const NavItem = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? 'text-purple-600' : 'text-gray-600'}
    >
      {label}
    </Link>
  );
};
```

## API Routes

Location: `src/app/api/`

```typescript
// src/app/api/logo/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'logo_involuck.svg');
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}
```

## Dynamic Routes

### Route Parameters

```typescript
// src/app/users/[id]/page.tsx
export default function UserPage({ params }: { params: { id: string } }) {
  return <div>User ID: {params.id}</div>;
}

// src/app/users/[id]/edit/page.tsx
export default function EditUserPage({ params }: { params: { id: string } }) {
  return <EditUserForm userId={params.id} />;
}
```

## Middleware

Location: `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/invoices') ||
    request.nextUrl.pathname.startsWith('/clients');

  // Redirect unauthenticated users
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
```

## SEO

### Dynamic robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/dashboard', '/api/'] }],
    sitemap: 'https://involuck.com/sitemap.xml'
  };
}
```

### Dynamic sitemap.xml

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://involuck.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://involuck.com/auth/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ];
}
```

## Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={100}
  height={100}
  priority  // Load immediately (above fold)
/>

// Responsive image
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Usage:

```typescript
import { Button } from '@/components/pure/button';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
```
