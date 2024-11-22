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
    <BreadcrumbCore>
      <BreadcrumbList>
        {pathMap.slice(0, -1).map(({ href, label }) => (
          <Fragment key={`breadcrumb-${label}`}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={href}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{pathMap.at(-1)?.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbCore>
  );
};

export default Breadcrumb;
