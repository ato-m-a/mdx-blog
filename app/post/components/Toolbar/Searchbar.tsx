'use client';

import { useState, useEffect, type FC } from 'react';
import { Input } from '@/components/ui/input';
import useSearchParams from '@/common/hooks/useSearchParams';
import useDebounce from '@/common/hooks/useDebounce';

const PostSearchbar: FC = () => {
  const { searchParams, setSearchParams } = useSearchParams();
  const [keyword, setKeyword] = useState<string>(() => searchParams.keyword ?? '');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedKeyword !== (searchParams.keyword ?? '')) {
      setSearchParams({ keyword: debouncedKeyword });
    }
  }, [debouncedKeyword, searchParams.keyword, setSearchParams]);

  return (
    <Input placeholder="검색어 입력" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
  );
};

export default PostSearchbar;
