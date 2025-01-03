'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Protected from '@/components/Protected';
import Link from 'next/link';

const CreatePostLink: FC = () => {
  return (
    <Protected>
      <Button asChild>
        <Link href="/manage/post/create">새 포스트 작성</Link>
      </Button>
    </Protected>
  );
};

export default CreatePostLink;
