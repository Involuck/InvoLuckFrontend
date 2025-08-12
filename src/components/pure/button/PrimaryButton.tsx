'use client';

import Button from './Button';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return <Button variant="primary" {...props} />;
}
