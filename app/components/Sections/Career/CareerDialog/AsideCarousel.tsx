'use client';

import type { ExperienceSchema } from '@/schema/experience/base.schema';
import { useState, useEffect, type FC } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicator,
  type CarouselApi,
} from '@/components/ui/carousel';
import AsideArticle from './AsideArticle';
import Observed from '@/components/Observed';

type AsideProps = {
  experiences: ExperienceSchema[];
};

const AsideCarousel: FC<AsideProps> = ({ experiences }) => {
  const { cursor, setCursor, handleCursorChange } = Observed.useContext();
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCursor(api.selectedScrollSnap());
    });

    handleCursorChange((value) => api.scrollTo(value));
  }, [api, setCursor, handleCursorChange]);

  const draggable = experiences.length >= 2;

  return (
    <Carousel
      setApi={setApi}
      className={`flex flex-col gap-4 max-lg:flex-row max-lg:justify-between min-w-[11.5rem] max-xl:min-w-[6.5rem] max-lg:w-full ${
        draggable ? 'cursor-grab' : 'cursor-default'
      }`}
      opts={{ watchDrag: draggable }}
    >
      <CarouselContent>
        {experiences.map((experience, index) => (
          <CarouselItem key={`experience-${index}`}>
            <AsideArticle key={`experience-${index}`} index={index} {...experience} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicator
        totalCount={experiences.length}
        currentIndex={cursor}
        setIndex={setCursor}
        invisible={experiences.length < 2}
      />
    </Carousel>
  );
};

export default AsideCarousel;
