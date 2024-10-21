import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type ArticleProps = PropsWithChildren<{
  label: string;
}> &
  HTMLAttributes<HTMLDivElement>;

const Article: FC<ArticleProps> = ({ children, label, className, ...props }) => {
  const cn = `flex flex-col gap-2 ${className ?? ''}`;

  return (
    <article className={cn} {...props}>
      <h2 className="text-sm uppercase color-tertiary">{label}</h2>
      {children}
    </article>
  );
};

export default Article;
