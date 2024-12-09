'use client';

import type { FC } from 'react';
import { Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import useFormContext from '../hooks/useFormContext';
import ExperienceArticle from './ExperienceArticle';

const ExperiencesForm: FC = () => {
  const { watch, setValue } = useFormContext();
  const experiences = watch('experiences');

  const appendExperience = () => {
    setValue('experiences', [
      ...experiences,
      {
        position: '',
        department: '',
        startDate: new Date(),
        endDate: null,
        content: '',
      },
    ]);
  };

  return (
    <section className="space-y-6">
      <Heading.h2 className="border-none">경력 정보 입력</Heading.h2>
      {experiences.map((experience, index) => (
        <ExperienceArticle key={`experience-${experience.id ?? index}`} index={index} />
      ))}
      <div className="flex justify-end">
        <Button onClick={appendExperience}>추가</Button>
      </div>
    </section>
  );
};

export default ExperiencesForm;
