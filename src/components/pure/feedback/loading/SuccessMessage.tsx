'use client';

import React from 'react';

interface SuccessMessageProps {
  message: string;
  className?: string;
}

export default function SuccessMessage({ message, className = '' }: SuccessMessageProps) {
  const base = 'p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg shadow-sm';
  return (
    <div role="status" aria-live="polite" className={`${base} ${className}`}>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

