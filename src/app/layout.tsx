import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/pure/feedback/toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://involuck.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'InvoLuck - Gestión Inteligente de Facturación',
    template: '%s | InvoLuck'
  },
  description:
    'Plataforma de gestión inteligente para tu negocio. Administra facturas, clientes y reportes financieros de forma sencilla y eficiente.',
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
  authors: [{ name: 'InvoLuck Team' }],
  creator: 'InvoLuck',
  publisher: 'InvoLuck',
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
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BASE_URL,
    siteName: 'InvoLuck',
    title: 'InvoLuck - Gestión Inteligente de Facturación',
    description:
      'Plataforma de gestión inteligente para tu negocio. Administra facturas, clientes y reportes financieros.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InvoLuck - Gestión Inteligente de Facturación'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvoLuck - Gestión Inteligente de Facturación',
    description:
      'Plataforma de gestión inteligente para tu negocio. Administra facturas, clientes y reportes financieros.',
    images: ['/og-image.png'],
    creator: '@involuck'
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }]
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: BASE_URL
  }
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InvoLuck',
  url: BASE_URL,
  logo: `${BASE_URL}/logo_involuck.svg`,
  description: 'Plataforma de gestión inteligente para tu negocio',
  sameAs: []
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
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
          }}
        />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
