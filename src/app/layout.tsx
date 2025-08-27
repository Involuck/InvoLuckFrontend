import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/pure/feedback/toast';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'InvoLuck - Gestión Inteligente',
  description: 'Plataforma de gestión inteligente para tu negocio'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} {...metadata}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
