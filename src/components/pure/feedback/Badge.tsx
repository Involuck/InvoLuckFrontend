'use client';

import React from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  iconStart?: React.ReactNode;
  className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
  neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-blue-100 text-blue-800 border-blue-200',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  danger: 'bg-red-100 text-red-800 border-red-200'
};

const sizeMap: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5'
};

export function Badge({
  label,
  variant = 'neutral',
  size = 'md',
  iconStart,
  className = ''
}: BadgeProps) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full border font-medium select-none';
  const cls = `${base} ${variantMap[variant]} ${sizeMap[size]} ${className}`;
  return (
    <span className={cls} role="status" aria-label={label}>
      {iconStart && (
        <span aria-hidden className="flex-shrink-0">
          {iconStart}
        </span>
      )}
      {label}
    </span>
  );
}

export default Badge;
