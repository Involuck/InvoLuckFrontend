'use client';

import Button from './Button';

interface DangerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function DangerButton(props: DangerButtonProps) {
  return <Button variant="danger" {...props} />;
}
