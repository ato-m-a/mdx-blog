import type { PropsWithChildren, FC } from 'react';
import Article from './Article';

interface IProfileSection extends FC<PropsWithChildren> {
  Article: typeof Article;
}

const ProfileSection: IProfileSection = ({ children }) => {
  return (
    <section
      className={`
        flex w-100 justify-between [grid-area:profile]
        max-lg:grid max-lg:grid-cols-3 max-lg:gap-6
        max-md:grid-cols-2
        max-sm:grid-cols-1
      `}
    >
      {children}
    </section>
  );
};

ProfileSection.Article = Article;

export default ProfileSection;
