'use client';

import React from 'react';
import {
  Spinner,
  Skeleton,
  ErrorMessage,
  EmptyState
} from '@/components/ui/Loading';

export default function LoadingDemoPage() {
  const handleRetry = () => {
    // Add your retry logic here
    // Example: Redirect to a different page
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Loading & Error State Components Demo
        </h1>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Spinner Components
          </h2>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="small" />
              <span className="text-sm text-gray-600">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="medium" />
              <span className="text-sm text-gray-600">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="large" />
              <span className="text-sm text-gray-600">Large</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Skeleton Components
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton width="40px" height="40px" rounded={true} />
              <div className="flex-1 space-y-2">
                <Skeleton height="16px" />
                <Skeleton height="12px" width="60%" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton height="20px" />
              <Skeleton height="16px" width="80%" />
              <Skeleton height="16px" width="60%" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Error Message Components
          </h2>
          <div className="space-y-4">
            <ErrorMessage
              message="Failed to load invoices"
              onRetry={handleRetry}
            />
            <ErrorMessage message="Network connection error. Please check your internet connection." />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Empty State Components
          </h2>
          <div className="space-y-6">
            <EmptyState message="No invoices yet" />
            <EmptyState message="No data available">
              <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create First Invoice
              </button>
            </EmptyState>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Usage Examples
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <pre className="text-gray-700">
              {`// Spinner usage
<Spinner size="medium" />

// Skeleton usage
<Skeleton width="100%" height="20px" />

// Error message usage
<ErrorMessage message="Failed to load invoices" onRetry={handleRetry} />

// Empty state usage
<EmptyState message="No invoices yet" />`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
