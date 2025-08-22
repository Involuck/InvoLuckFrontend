'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Spinner({ 
  size = 'medium', 
  className = '' 
}: SpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  };

  const baseClasses = 'border-blue-200 border-t-[#2563EB] rounded-full animate-spin';
  const classes = `${sizeClasses[size]} ${baseClasses} ${className}`;

  return (
    <div
      className={classes}
      role="status"
      aria-label="Loading"
    />
  );
}


