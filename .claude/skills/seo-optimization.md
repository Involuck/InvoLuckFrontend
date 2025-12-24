# SEO Optimization - InvoLuck Frontend

## Overview
This skill covers SEO implementation including metadata, Open Graph, structured data (JSON-LD), robots.txt, and sitemap.xml.

## Metadata Configuration

### Root Layout Metadata
Location: `src/app/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://involuck.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // Title configuration
  title: {
    default: 'InvoLuck - Gestión Inteligente de Facturación',
    template: '%s | InvoLuck'  // For child pages: "Dashboard | InvoLuck"
  },

  // Description
  description: 'Plataforma de gestión inteligente para tu negocio. Administra facturas, clientes y reportes financieros de forma sencilla y eficiente.',

  // Keywords
  keywords: [
    'facturación',
    'gestión',
    'facturas',
    'clientes',
    'reportes',
    'finanzas',
    'negocio',
    'administración',
    'invoicing',
    'business management'
  ],

  // Author/Publisher
  authors: [{ name: 'InvoLuck Team' }],
  creator: 'InvoLuck',
  publisher: 'InvoLuck',

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BASE_URL,
    siteName: 'InvoLuck',
    title: 'InvoLuck - Gestión Inteligente de Facturación',
    description: 'Plataforma de gestión inteligente para tu negocio.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InvoLuck - Gestión Inteligente de Facturación'
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'InvoLuck - Gestión Inteligente de Facturación',
    description: 'Plataforma de gestión inteligente para tu negocio.',
    images: ['/og-image.png'],
    creator: '@involuck'
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }]
  },

  // Manifest
  manifest: '/manifest.json',

  // Canonical
  alternates: {
    canonical: BASE_URL
  }
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#7c3aed' }
  ]
};
```

### Page-Specific Metadata
```typescript
// src/app/auth/login/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Accede a tu cuenta de InvoLuck para gestionar tus facturas y clientes.',
  robots: {
    index: false,  // Don't index auth pages
    follow: false
  }
};
```

## JSON-LD Structured Data

### JsonLd Component
Location: `src/components/seo/JsonLd.tsx`

```typescript
'use client';

import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
```

### Organization Schema
```typescript
// In root layout
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InvoLuck',
  url: BASE_URL,
  logo: `${BASE_URL}/logo_involuck.svg`,
  description: 'Plataforma de gestión inteligente para tu negocio',
  sameAs: [
    'https://twitter.com/involuck',
    'https://linkedin.com/company/involuck'
  ]
};

// Usage
<head>
  <JsonLd data={organizationJsonLd} />
</head>
```

### Website Schema
```typescript
// For landing page
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'InvoLuck',
  url: BASE_URL,
  description: 'Plataforma de gestión inteligente de facturación para tu negocio',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};
```

### SoftwareApplication Schema
```typescript
const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'InvoLuck',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Plataforma de facturación inteligente para freelancers, PyMEs y empresas',
  offers: {
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '1500'
  }
};
```

## Dynamic robots.txt

Location: `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://involuck.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/invoices',
          '/clients',
          '/reports',
          '/settings',
          '/api/',
          '/auth/'
        ]
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
```

## Dynamic sitemap.xml

Location: `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://involuck.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    }
  ];
}
```

## Web App Manifest

Location: `public/manifest.json`

```json
{
  "name": "InvoLuck",
  "short_name": "InvoLuck",
  "description": "Gestión Inteligente de Facturación",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#8b5cf6",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## Open Graph Image

### Requirements
- Size: 1200x630 pixels
- Format: PNG or JPEG
- Location: `public/og-image.png`

### Design Guidelines
- Include logo prominently
- Use brand colors (purple)
- Clear, readable text
- Works at small sizes (thumbnails)

## Security Headers for SEO

Location: `next.config.mjs`

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'  // Prevents clickjacking
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }
  ];
}
```

## Image Optimization for SEO

```typescript
import Image from 'next/image';

// Always include alt text
<Image
  src="/feature-image.jpg"
  alt="Dashboard de facturación mostrando métricas de ingresos"
  width={800}
  height={450}
  priority  // For above-fold images
/>

// Responsive images
<Image
  src="/hero.jpg"
  alt="InvoLuck - Plataforma de facturación"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

## Language and Locale

```typescript
// In root layout
<html lang="es" suppressHydrationWarning>

// For multi-language support
export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es-ES': `${BASE_URL}/es`,
      'en-US': `${BASE_URL}/en`
    }
  }
};
```

## Performance (Core Web Vitals)

### Best Practices
1. **LCP (Largest Contentful Paint)**: Use `priority` on hero images
2. **FID (First Input Delay)**: Minimize JavaScript, use code splitting
3. **CLS (Cumulative Layout Shift)**: Always specify image dimensions

```typescript
// Prevent CLS with image dimensions
<Image
  src="/logo.png"
  alt="Logo"
  width={100}   // Always specify
  height={100}  // Always specify
/>

// Or use fill with container
<div className="relative w-24 h-24">
  <Image src="/logo.png" alt="Logo" fill />
</div>
```

## SEO Checklist

- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URL
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] JSON-LD structured data
- [ ] Alt text on images
- [ ] Semantic HTML (h1, h2, nav, main, footer)
- [ ] Mobile-friendly design
- [ ] HTTPS
- [ ] Fast loading (< 3s)
- [ ] No broken links
