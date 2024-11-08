import type { FC, HTMLAttributes } from 'react';
import { cn } from '@/common/utils';

type ColorBadgeProps = { color: string } & HTMLAttributes<HTMLSpanElement>;

const ColorBadge: FC<ColorBadgeProps> = ({ color, className, ...props }) => (
  <span className={cn('w-2 h-2', className)} style={{ backgroundColor: color }} {...props} />
);

export default ColorBadge;
