'use client';

import Button from './Button';
import type { ReactNode } from 'react';

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function SecondaryButton(props: SecondaryButtonProps) {
  return <Button variant="secondary" {...props} />;
}
