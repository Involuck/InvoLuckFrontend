import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/pure/feedback/toast'; // Make sure the import is correct
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
