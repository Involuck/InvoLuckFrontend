'use client';

import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({
  message,
  onRetry,
  className = ''
}: ErrorMessageProps) {
  const baseClasses = 'p-4 bg-red-50 border border-red-200 rounded-lg';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes} role="alert">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-red-700 font-medium">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-[#2563EB] hover:text-blue-700 font-medium hover:underline transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
