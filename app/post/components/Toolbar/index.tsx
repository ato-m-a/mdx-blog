import type { FC, HTMLAttributes } from 'react';
import { cn } from '@/common/utils';
import PostSelect from './Select';
import PostSearchbar from './Searchbar';

const PostToolbar: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={cn('flex gap-2', className)} {...props}>
      <div className="basis-1/3">
        <PostSelect />
      </div>
      <PostSearchbar />
    </div>
  );
};

export default PostToolbar;
