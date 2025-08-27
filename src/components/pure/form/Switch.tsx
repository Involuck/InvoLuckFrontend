'use client';

import React from 'react';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export function Switch({
  checked: checkedProp,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: SwitchProps) {
  const [internal, setInternal] = React.useState(false);
  const isControlled = typeof checkedProp === 'boolean';
  const checked = isControlled ? checkedProp : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const sizes = {
    sm: {
      track: 'w-9 h-5',
      knob: 'w-4 h-4 translate-x-0.5',
      knobChecked: 'translate-x-4'
    },
    md: {
      track: 'w-11 h-6',
      knob: 'w-5 h-5 translate-x-0.5',
      knobChecked: 'translate-x-5'
    }
  } as const;

  const s = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={toggle}
      className={`relative inline-flex ${s.track} items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${checked ? 'bg-blue-600' : 'bg-gray-300'} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      <span
        className={`pointer-events-none inline-block rounded-full bg-white shadow transform transition ${s.knob} ${checked ? s.knobChecked : ''}`}
      />
    </button>
  );
}

export default Switch;
