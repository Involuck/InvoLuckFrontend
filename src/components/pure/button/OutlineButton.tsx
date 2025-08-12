'use client';

import Button from './Button';

interface OutlineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function OutlineButton(props: OutlineButtonProps) {
  return <Button variant="outline" {...props} />;
}
