'use client';

import Button from './Button';
import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return <Button variant="primary" {...props} />;
}
