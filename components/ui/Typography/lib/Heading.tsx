import type { Typography, HeadingTags } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

type HeadingElement = Typography<HTMLHeadingElement>;
type CnRecords = Readonly<{ [key in HeadingTags]: string }>;
type HeadingRecords = Readonly<{ [key in HeadingTags]: HeadingElement }>;

const cnRecords: CnRecords = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl [&:not(:first-of-type)]:mt-10',
  h2: 'mt-10 scroll-m-20 border-b border-base pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
  h3: 'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
} as const;

const h1: HeadingElement = ({ children, className, ...props }) => (
  <h1 className={cn(cnRecords.h1, className)} {...props}>
    {children}
  </h1>
);
h1.className = cnRecords.h1;

const h2: HeadingElement = ({ children, className, ...props }) => (
  <h2 className={cn(cnRecords.h2, className)} {...props}>
    {children}
  </h2>
);
h2.className = cnRecords.h2;

const h3: HeadingElement = ({ children, className, ...props }) => (
  <h3 className={cn(cnRecords.h3, className)} {...props}>
    {children}
  </h3>
);
h3.className = cnRecords.h3;

const Heading: HeadingRecords = { h1, h2, h3 } as const;

export default Heading;
