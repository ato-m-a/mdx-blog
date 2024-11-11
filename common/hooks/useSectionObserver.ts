'use client';

import { useEffect, useState } from 'react';

const useSectionObserver = (defaultCursor = 0) => {
  const [cursor, setCursor] = useState<number>(() => defaultCursor);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          if (element instanceof HTMLElement && entry.isIntersecting) {
            setCursor(parseInt(element.dataset.index ?? '0'));
          }
        });
      },
      { threshold: 0.1 },
    );

    const targets = document.querySelectorAll('[data-index]');
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return cursor;
};

export default useSectionObserver;
