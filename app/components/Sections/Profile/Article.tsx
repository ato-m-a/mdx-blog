import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/common/utils';

type ProfileArticleProps = PropsWithChildren<{
  label: string;
}> &
  HTMLAttributes<HTMLDivElement>;

const ProfileArticle: FC<ProfileArticleProps> = ({ children, label, className, ...props }) => {
  return (
    <article className={cn(className, 'flex flex-col gap-2')} {...props}>
      <h2 className="text-sm uppercase color-secondary">{label}</h2>
      {children}
    </article>
  );
};

export default ProfileArticle;
