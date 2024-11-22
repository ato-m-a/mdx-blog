type CreatePageItemsProps = {
  currentPage?: number;
  totalPage?: number;
  maxVisiblePages?: number;
};

export const createPageItems = ({
  currentPage = 1,
  totalPage = 1,
  maxVisiblePages = 5,
}: CreatePageItemsProps) => {
  const createRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const addEllipsis = (items: (number | string)[]) => {
    if (items[0] !== 1) items.unshift('...');
    if (items[items.length - 1] !== totalPage) items.push('...');
    return items;
  };

  if (totalPage <= maxVisiblePages) {
    return createRange(1, totalPage);
  }

  const middleStart = Math.max(2, currentPage - 2);
  const middleEnd = Math.min(totalPage - 1, currentPage + 2);

  const middleItems = createRange(middleStart, middleEnd);

  return addEllipsis([1, ...middleItems, totalPage]);
};
