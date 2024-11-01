import type { ElementType, FC } from 'react';
import type { CompanySchema } from '@/schema/company.schema';
import HoverGroup from '@/components/HoverGroup';
import ColorBadge from '@/components/ColorBadge';

type CompanyLabelProps = Pick<CompanySchema, 'brandColor' | 'name'> & { href?: string };

const CompanyLabel: FC<CompanyLabelProps> = ({ brandColor, name, href }) => {
  const hoverGroupProps = href
    ? { as: 'a' as ElementType, href, target: '_blank' }
    : { as: 'p' as ElementType, role: 'button' };

  return (
    <HoverGroup className="flex items-center gap-2" {...hoverGroupProps}>
      <ColorBadge color={brandColor} />
      <span className="text-lg color-primary">{name}</span>
    </HoverGroup>
  );
};

export default CompanyLabel;
