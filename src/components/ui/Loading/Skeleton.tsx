'use client';

import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

export default function Skeleton({
  width = '100%',
  height = '1rem',
  className = '',
  rounded = true
}: SkeletonProps) {
  const baseClasses = 'bg-blue-100 animate-pulse';
  const roundedClasses = rounded ? 'rounded' : '';
  const classes = `${baseClasses} ${roundedClasses} ${className}`;

  return (
    <div
      className={classes}
      style={{ width, height }}
      role="status"
      aria-label="Loading content"
    />
  );
}
