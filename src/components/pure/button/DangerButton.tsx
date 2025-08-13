'use client';

import Button from './Button';
import type { ReactNode } from 'react';

interface DangerButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function DangerButton(props: DangerButtonProps) {
  return <Button variant="danger" {...props} />;
}
