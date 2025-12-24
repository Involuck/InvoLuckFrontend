import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://involuck.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/privacy', '/terms'],
        disallow: [
          '/auth/*',
          '/dashboard',
          '/dashboard/*',
          '/clients',
          '/clients/*',
          '/invoices',
          '/invoices/*',
          '/reports',
          '/reports/*',
          '/settings',
          '/settings/*',
          '/users',
          '/users/*',
          '/api/*',
          '/demo/*',
          '/error/*',
          '/loading'
        ]
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
