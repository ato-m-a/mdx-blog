import type { FC } from 'react';

type ColorBadgeProps = { color: string };

const ColorBadge: FC<ColorBadgeProps> = ({ color }) => (
  <span className="w-2 h-2" style={{ backgroundColor: color }} />
);

export default ColorBadge;
