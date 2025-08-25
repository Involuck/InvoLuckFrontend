'use client';

import React, { useState } from 'react';
import { StatusBadge, Pill, Badge } from '@/components/pure/feedback';

// Iconos simples usando SVG inline
const CheckIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const AlertIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const TagIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function FeedbackDemoPage() {
  const [removablePills, setRemovablePills] = useState([
    { id: 1, label: 'React', variant: 'primary' as const },
    { id: 2, label: 'TypeScript', variant: 'success' as const },
    { id: 3, label: 'TailwindCSS', variant: 'warning' as const },
    { id: 4, label: 'Next.js', variant: 'danger' as const }
  ]);

  const handleRemovePill = (id: number) => {
    setRemovablePills((prev) => prev.filter((pill) => pill.id !== id));
  };

  const variants: Array<
    'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  > = ['neutral', 'primary', 'success', 'warning', 'danger'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Componentes de Feedback
          </h1>
          <p className="text-lg text-gray-600">
            Demostración de StatusBadge y Pill con todas las variantes y tamaños
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            StatusBadge
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Variantes
            </h3>
            <div className="flex flex-wrap gap-3">
              {variants.map((variant) => (
                <StatusBadge
                  key={variant}
                  label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                  variant={variant}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Tamaños</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <StatusBadge label="Small" variant="primary" size="sm" />
              <StatusBadge label="Medium" variant="primary" size="md" />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Con iconos
            </h3>
            <div className="flex flex-wrap gap-3">
              <StatusBadge
                label="Success"
                variant="success"
                iconStart={<CheckIcon />}
              />
              <StatusBadge
                label="Warning"
                variant="warning"
                iconStart={<AlertIcon />}
              />
              <StatusBadge
                label="Info"
                variant="primary"
                iconStart={<InfoIcon />}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Badge</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Variantes
            </h3>
            <div className="flex flex-wrap gap-3">
              {variants.map((variant) => (
                <Badge
                  key={variant}
                  label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                  variant={variant}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Tamaños</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge label="Small" variant="primary" size="sm" />
              <Badge label="Medium" variant="primary" size="md" />
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Con icono
            </h3>
            <div className="flex flex-wrap gap-3">
              <Badge label="Info" variant="primary" iconStart={<InfoIcon />} />
              <Badge
                label="Success"
                variant="success"
                iconStart={<CheckIcon />}
              />
              <Badge
                label="Warning"
                variant="warning"
                iconStart={<AlertIcon />}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pill</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Variantes
            </h3>
            <div className="flex flex-wrap gap-3">
              {variants.map((variant) => (
                <Pill
                  key={variant}
                  label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                  variant={variant}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Tamaños</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Pill label="Small" variant="primary" size="sm" />
              <Pill label="Medium" variant="primary" size="md" />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Con iconos
            </h3>
            <div className="flex flex-wrap gap-3">
              <Pill label="Tag" variant="neutral" iconStart={<TagIcon />} />
              <Pill label="Success" variant="success" iconEnd={<CheckIcon />} />
              <Pill
                label="Warning"
                variant="warning"
                iconStart={<AlertIcon />}
                iconEnd={<InfoIcon />}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Con botón de eliminar ({removablePills.length} restantes)
            </h3>
            <div className="flex flex-wrap gap-3">
              {removablePills.map((pill) => (
                <Pill
                  key={pill.id}
                  label={pill.label}
                  variant={pill.variant}
                  onRemove={() => handleRemovePill(pill.id)}
                />
              ))}
            </div>
            {removablePills.length === 0 && (
              <p className="text-gray-500 italic">
                Todas las pills han sido eliminadas
              </p>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Características de Accesibilidad
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Los componentes responden a navegación por teclado (Tab)</li>
            <li>• Estados de focus visibles con anillos de color</li>
            <li>• Botones de eliminar con aria-label descriptivos</li>
            <li>• Soporte para Enter y Espacio en botones de eliminar</li>
            <li>• Transiciones suaves para mejor experiencia visual</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
