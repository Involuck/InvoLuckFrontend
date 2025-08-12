'use client';

import * as React from 'react';
import { Button, PrimaryButton, SecondaryButton, SuccessButton, DangerButton, OutlineButton } from '@/components/pure/button';

export default function ButtonsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Buttons Demo</h1>
          <p className="text-lg text-gray-600">Variantes y tamaños disponibles</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Button (configurable)</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Atajos por variante</h2>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton>Primary</PrimaryButton>
            <SecondaryButton>Secondary</SecondaryButton>
            <SuccessButton>Success</SuccessButton>
            <DangerButton>Danger</DangerButton>
            <OutlineButton>Outline</OutlineButton>
          </div>
        </section>
      </div>
    </div>
  );
}


