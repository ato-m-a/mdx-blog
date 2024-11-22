'use client';

import type { FC } from 'react';
import {
  Pagination as PaginationCore,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { createPageItems } from '@/common/utils/pagination';
import useSearchParams from '@/common/hooks/useSearchParams';

type PaginationProps = {
  pathname: string;
  totalPage: number;
};

const Pagination: FC<PaginationProps> = ({ pathname, totalPage }) => {
  const {
    searchParams: { page, ...searchParams },
  } = useSearchParams();
  const currentPage = parseInt(page ?? '1');

  const createHref = (pageNumber: number) => ({
    pathname,
    query: {
      ...searchParams,
      ...(pageNumber !== 1 && { page: pageNumber }),
    },
  });

  const previousDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPage || totalPage <= 1;

  const previousProps = {
    href: createHref(currentPage - 1),
    disabled: previousDisabled,
    'aria-disabled': previousDisabled,
  };
  const nextProps = {
    href: createHref(currentPage + 1),
    disabled: nextDisabled,
    'aria-disabled': nextDisabled,
  };

  const pageNumbers = createPageItems({ currentPage, totalPage });
  console.log(currentPage, totalPage);

  return (
    <PaginationCore>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious {...previousProps} />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={`/${pathname}?page=${pageNumber}`}>
            {typeof pageNumber === 'string' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={createHref(pageNumber)} isActive={pageNumber === currentPage}>
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext {...nextProps} />
        </PaginationItem>
      </PaginationContent>
    </PaginationCore>
  );
};

export default Pagination;
