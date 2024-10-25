'use client';

import type { FC } from 'react';
import trpc from '@trpc.client';
import ExperienceArticle from './Article';

const ExperienceSection: FC = () => {
  const { data: experiences } = trpc.experience.getMany.useQuery();

  return (
    <section className="flex flex-col gap-y-4 max-lg:col-span-2">
      <h2 className="text-2xl color-primary font-semibold">이력</h2>
      <section className="flex flex-col gap-y-4">
        {experiences?.map((experience) => (
          <ExperienceArticle key={experience.id} {...experience} />
        ))}
      </section>
    </section>
  );
};

export default ExperienceSection;
