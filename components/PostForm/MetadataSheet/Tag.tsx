'use client';

import type { FC } from 'react';
import { XIcon } from 'lucide-react';

type TagProps = {
  tag: string;
  onClick: (tag: string) => void;
};

const Tag: FC<TagProps> = ({ tag, onClick }) => {
  return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-xl bg-inactive text-sm">
      {tag}
      <XIcon className="w-4 h-4 cursor-pointer" onClick={() => onClick(tag)} />
    </span>
  );
};

export default Tag;
