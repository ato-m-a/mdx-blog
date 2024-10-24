import type { FC } from 'react';
import ExperienceArticle from './Article';

const fixture = {
  company: {
    id: 1,
    name: '트라이포드랩',
    url: 'https://earlivery.com',
    brandColor: '#00a294',
  },
  position: 'Frontend Engineer',
  period: '2024.03 ~',
};

const ExperienceSection: FC = () => {
  return (
    <section className="flex flex-col gap-y-4 max-lg:col-span-2">
      <h2 className="text-2xl color-primary font-semibold">이력</h2>
      <section className="flex flex-col gap-y-4">
        {Array(8)
          .fill(fixture)
          .map((obj, index) => (
            <ExperienceArticle key={index} {...obj} />
          ))}
      </section>
    </section>
  );
};

export default ExperienceSection;
