import React from 'react';

export interface PillProps {
  label: string;
  variant: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  onRemove?: () => void;
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

const removeButtonStyles = {
  neutral: 'hover:bg-gray-300 focus:bg-gray-300 focus:ring-gray-500',
  primary: 'hover:bg-blue-300 focus:bg-blue-300 focus:ring-blue-500',
  success: 'hover:bg-green-300 focus:bg-green-300 focus:ring-green-500',
  warning: 'hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-500',
  danger: 'hover:bg-red-300 focus:bg-red-300 focus:ring-red-500',
};

export const Pill: React.FC<PillProps> = ({
  label,
  variant,
  size = 'md',
  iconStart,
  iconEnd,
  onRemove,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRemove?.();
    }
  };

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
      {iconEnd && <span className="flex-shrink-0">{iconEnd}</span>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          onKeyDown={handleKeyDown}
          aria-label={`Remove ${label}`}
          className={`
            ml-1.5 -mr-1 flex-shrink-0 rounded-full p-0.5
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
            ${removeButtonStyles[variant]}
          `}
        >
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
