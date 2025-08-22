'use client';

import React from 'react';

interface EmptyStateProps {
  message: string;
  children?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ 
  message, 
  children, 
  className = '' 
}: EmptyStateProps) {
  const baseClasses = 'p-8 text-center text-gray-500 flex flex-col items-center gap-4';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes}>
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-[#2563EB]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
      </div>
      <p className="text-lg font-medium text-gray-600">{message}</p>
      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
}
