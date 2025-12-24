import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description:
    'Accede a tu cuenta de InvoLuck. Gestiona tus facturas, clientes y reportes financieros desde tu panel de control.',
  openGraph: {
    title: 'Iniciar Sesión | InvoLuck',
    description:
      'Accede a tu cuenta de InvoLuck y gestiona tu facturación de forma inteligente.'
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
