'use client';

import type { FC } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const BackLink: FC<ButtonProps> = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} {...props}>
      {children}
    </Button>
  );
};

export default BackLink;
