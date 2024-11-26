'use client';

import type { ExperienceSchema } from '@/schema/experience/base.schema';
import type { FC, PropsWithChildren } from 'react';
import Observed from '@/components/Observed';
import AsideCarousel from './AsideCarousel';

type ExperienceContainerProps = PropsWithChildren<{ experiences: ExperienceSchema[] }>;

const ExperienceContainer: FC<ExperienceContainerProps> = ({ experiences, children }) => {
  return (
    <Observed as="section" className="flex gap-4 overflow-hidden px-6 max-lg:flex-col">
      <AsideCarousel experiences={experiences} />
      {children}
    </Observed>
  );
};

export default ExperienceContainer;
