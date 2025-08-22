import React from 'react';

export interface StatusBadgeProps {
  label: string;
  variant: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  iconStart?: React.ReactNode;
}

const variantStyles = {
  neutral: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 focus:bg-gray-200',
  primary: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 focus:bg-blue-200',
  success: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 focus:bg-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 focus:bg-yellow-200',
  danger: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 focus:bg-red-200',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant,
  size = 'md',
  iconStart,
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${variant === 'neutral' ? 'focus:ring-gray-500' : ''}
        ${variant === 'primary' ? 'focus:ring-blue-500' : ''}
        ${variant === 'success' ? 'focus:ring-green-500' : ''}
        ${variant === 'warning' ? 'focus:ring-yellow-500' : ''}
        ${variant === 'danger' ? 'focus:ring-red-500' : ''}
      `}
    >
      {iconStart && <span className="flex-shrink-0">{iconStart}</span>}
      {label}
    </span>
  );
};
