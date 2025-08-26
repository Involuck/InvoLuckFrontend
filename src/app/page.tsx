// src/app/page.tsx

import type { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage'; 

export const metadata: Metadata = {
  title: 'InvoLuck: Smart Invoicing Platform',
  description:
    'The most complete invoicing platform for freelancers, SMBs, and enterprises.'
};

export default function HomePage() {
  return (
    <>
      <LandingPage />
    </>
  );
}