import type { FC } from 'react';
import type { PostSchema } from '@/schema/post.schema';
import { kstFormat } from '@toss/date';

const PostArticle: FC<PostSchema> = ({ title, publishDate }) => {
  return (
    <article className="border-l-2 border-zinc-700 pl-4">
      <h3 className="text-lg color-primary">{title}</h3>
      <p className="font-codeblock color-tertiary">
        {kstFormat(publishDate, 'EEE요일, yyyy년 MM월 dd일')}
      </p>
    </article>
  );
};

export default PostArticle;
