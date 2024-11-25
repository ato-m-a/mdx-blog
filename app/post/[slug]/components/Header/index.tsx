import type { FC } from 'react';
import type { PostResponseSchema } from '@/schema/post/post-response.schema';
import { format } from 'date-fns';
import Breadcrumb from '@/components/Breadcrumb';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import UpdatePostLink from '../UpdatePostLink';

type PostHeaderProps = Pick<PostResponseSchema, 'title' | 'subtitle' | 'createdAt'>;

const PostHeader: FC<PostHeaderProps> = ({ title, subtitle, createdAt }) => {
  return (
    <header className="flex flex-col gap-10">
      <Breadcrumb
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/post', label: '포스트' },
          { href: '', label: title },
        ]}
      />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <h1 className="flex-1 text-[64px] font-bold color-primary leading-[1.2]">{title}</h1>
          <div className="flex flex-col justify-between items-end">
            <ThemeToggleButton />
            <UpdatePostLink />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {subtitle && <p className="text-xl color-secondary">{subtitle}</p>}
          <p className="font-codeblock color-secondary justify-self-end">
            {format(createdAt, 'MMM, dd yyyy')}
          </p>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
