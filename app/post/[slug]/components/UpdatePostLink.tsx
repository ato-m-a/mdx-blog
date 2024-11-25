'use client';

import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Protected from '@/components/Protected';
import Link from 'next/link';

const UpdatePostLink: FC = () => {
  const pathname = usePathname();

  const slug = pathname.split('/').pop();

  return (
    <Protected>
      <Button asChild>
        <Link href={`/post/${slug}/edit`}>수정</Link>
      </Button>
    </Protected>
  );
};

export default UpdatePostLink;
