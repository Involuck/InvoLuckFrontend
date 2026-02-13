// src/app/invoices/create/page.tsx
import React from 'react';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';

export default function CreateInvoicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Invoice</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Fill out the details below to generate a new invoice for your client.
        </p>
      </div>
      
      <InvoiceForm />
    </div>
  );
}
