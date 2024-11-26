import type { FC } from 'react';
import type { PostSchema } from '@/schema/post/base.schema';
import { format } from 'date-fns';
import Breadcrumb from '@/components/Breadcrumb';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import UpdatePostLink from '../UpdatePostLink';

type PostHeaderProps = Pick<PostSchema, 'title' | 'subtitle' | 'createdAt'>;

const PostHeader: FC<PostHeaderProps> = ({ title, subtitle, createdAt }) => {
  return (
    <header className="flex flex-col gap-10 max-lg:gap-8 max-md:gap-6">
      <Breadcrumb
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/post', label: '포스트' },
          { href: '', label: title },
        ]}
      />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 max-md:gap-6 max-sm:gap-8">
          <h1 className="flex-1 text-[64px] font-bold color-primary min-sm:whitespace-pre-wrap leading-[1.2] max-lg:text-5xl max-md:text-4xl max-sm:text-3xl">
            {title}
          </h1>
          <div className="flex flex-col justify-between items-end">
            <ThemeToggleButton />
            <UpdatePostLink />
          </div>
        </div>
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-2 max-md:items-start">
          {subtitle && (
            <p className="text-xl color-secondary max-lg:text-lg max-md:text-base max-sm:text-sm">
              {subtitle}
            </p>
          )}
          <p className="font-codeblock color-secondary justify-self-end max-md:text-sm max-sm:text-xs">
            {format(createdAt, 'MMM, dd yyyy')}
          </p>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
