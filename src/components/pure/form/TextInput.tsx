'use client';

import React from 'react';

export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputState = 'default' | 'error' | 'success';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: TextInputSize;
  state?: TextInputState;
}

const sizeClasses: Record<TextInputSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-11 px-4 text-base'
};

const stateClasses: Record<TextInputState, string> = {
  default:
    'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  error: 'border-red-400 focus:ring-2 focus:ring-red-500 focus:border-red-500',
  success:
    'border-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
};

export function TextInput({
  size = 'md',
  state = 'default',
  className = '',
  ...props
}: TextInputProps) {
  const base =
    'block w-full rounded-md border bg-white text-gray-900 placeholder:text-gray-400 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-colors';
  const cls = `${base} ${sizeClasses[size]} ${stateClasses[state]} ${className}`;
  return (
    <input
      className={cls}
      {...props}
      aria-invalid={state === 'error' || props['aria-invalid']}
    />
  );
}

export default TextInput;
