'use client';

import React from 'react';
import { Breadcrumb } from '@/components/pure/navigation/Breadcrumb';

export default function NavigationDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Navigation Demo
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Clients', href: '/clients' },
              { label: 'Acme Inc.' }
            ]}
            className="mb-4"
          />
          <p className="text-gray-700">
            Breadcrumb shows current page and hierarchy.
          </p>
        </div>
      </div>
    </div>
  );
}
