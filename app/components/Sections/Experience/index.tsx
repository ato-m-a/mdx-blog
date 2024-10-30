import type { FC } from 'react';
import trpc from '@trpc.server';
import ExperienceArticle from './Article';

const ExperienceSection: FC = async () => {
  const experiences = await trpc.experience.getMany();

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
