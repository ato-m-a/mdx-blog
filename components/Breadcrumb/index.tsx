'use client';

import { Fragment, type FC } from 'react';
import {
  Breadcrumb as BreadcrumbCore,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

type PathRecord = { href: string; label: string };
export type BreadcrumbProps = { pathMap: Array<PathRecord> };

const Breadcrumb: FC<BreadcrumbProps> = ({ pathMap }) => {
  if (pathMap.length === 0) return null;

  return (
    <BreadcrumbCore className="max-w-full">
      <BreadcrumbList className="w-full flex overflow-hidden whitespace-nowrap">
        {pathMap.slice(0, -1).map(({ href, label }) => (
          <Fragment key={`breadcrumb-${label}`}>
            <BreadcrumbItem className="flex-shrink-0">
              <BreadcrumbLink asChild>
                <Link href={href}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="flex-shrink-0" />
          </Fragment>
        ))}
        <BreadcrumbItem className="flex-1 min-w-0">
          <BreadcrumbPage className="truncate">{pathMap.at(-1)?.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbCore>
  );
};

export default Breadcrumb;
