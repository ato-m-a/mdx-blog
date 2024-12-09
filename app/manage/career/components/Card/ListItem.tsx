import type { FC } from 'react';

type CareerCardListItemProps = {
  title: string;
  value: string;
};

const CareerCardListItem: FC<CareerCardListItemProps> = ({ title, value }) => (
  <div className="space-y-1 text-sm">
    <p className="color-primary">{title}</p>
    <p className="color-secondary">{value}</p>
  </div>
);

export default CareerCardListItem;
