import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Cuenta',
  description:
    'Regístrate gratis en InvoLuck y comienza a facturar de forma profesional. Crea tu cuenta en menos de 2 minutos.',
  openGraph: {
    title: 'Crear Cuenta | InvoLuck',
    description:
      'Regístrate gratis en InvoLuck y comienza a facturar de forma profesional.'
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function RegisterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
