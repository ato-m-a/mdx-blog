import type { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/common/utils';
import Observed from '@/components/Observed';

type CarouselIndicatorProps = {
  totalPage: number;
};

const CarouselIndicator: FC<CarouselIndicatorProps> = ({ totalPage }) => {
  const { cursor, setCursor } = Observed.useContext();
  const iconClassName = (className: string) =>
    cn('w-6 h-6 cursor-pointer transition-opacity duration-100', className);

  const toPrev = () => {
    if (cursor > 0) setCursor(cursor - 1);
  };

  const toNext = () => {
    if (cursor < totalPage - 1) setCursor(cursor + 1);
  };

  if (totalPage < 2) return null;

  return (
    <div className="flex items-center gap-2 w-max max-sm:gap-0">
      <ChevronLeft
        onClick={toPrev}
        className={iconClassName(cursor === 0 ? 'opacity-50 cursor-not-allowed' : '')}
      />
      <span className="color-primary text-sm whitespace-nowrap max-sm:hidden">
        {cursor + 1} / {totalPage}
      </span>
      <ChevronRight
        onClick={toNext}
        className={iconClassName(cursor === totalPage - 1 ? 'opacity-50 cursor-not-allowed' : '')}
      />
    </div>
  );
};

export default CarouselIndicator;
