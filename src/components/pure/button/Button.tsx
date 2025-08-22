'use client';

import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  size = 'medium',
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClasses = 'font-bold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500',
    secondary: 'bg-brand-700 hover:bg-brand-800 text-white focus:ring-brand-600',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white focus:ring-brand-500'
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
} 