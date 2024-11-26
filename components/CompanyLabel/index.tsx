import type { FC } from 'react';
import type { CompanySchema } from '@/schema/company/base.schema';
import { cn } from '@/common/utils';
import ColorBadge from '@/components/ColorBadge';

type CompanyLabelProps = Pick<CompanySchema, 'brandColor' | 'name'> & {
  href?: string;
  className?: string;
};

const CompanyLabel: FC<CompanyLabelProps> = ({ brandColor, name, href, className }) => {
  const Element = href ? 'a' : 'p';

  return (
    <Element
      className={cn('flex items-center gap-2 animated-underline cursor-pointer', className)}
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { type: 'button' })}
    >
      <ColorBadge color={brandColor} />
      <span className="text-lg color-primary">{name}</span>
    </Element>
  );
};

export default CompanyLabel;
