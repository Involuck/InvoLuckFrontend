'use client';

import Button from './Button';
import type { ReactNode } from 'react';

interface OutlineButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function OutlineButton(props: OutlineButtonProps) {
  return <Button variant="outline" {...props} />;
}
