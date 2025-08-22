'use client';

import * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success';
}

const sizeClasses: Record<NonNullable<SelectProps['size']>, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-11 px-4 text-base',
};

const stateClasses: Record<NonNullable<SelectProps['state']>, string> = {
  default: 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  error: 'border-red-400 focus:ring-2 focus:ring-red-500 focus:border-red-500',
  success: 'border-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
};

export function Select({ options, size = 'md', state = 'default', className = '', ...props }: SelectProps) {
  const base = 'block w-full rounded-md border bg-white text-gray-900 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm';
  const cls = `${base} ${sizeClasses[size]} ${stateClasses[state]} ${className}`;

  return (
    <select className={cls} aria-invalid={state === 'error' || props['aria-invalid']} {...props}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;


