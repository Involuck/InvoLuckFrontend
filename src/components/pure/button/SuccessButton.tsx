'use client';

import Button from './Button';

interface SuccessButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function SuccessButton(props: SuccessButtonProps) {
  return <Button variant="success" {...props} />;
}
