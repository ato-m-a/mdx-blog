'use client';

import type { SearchParamsContextType } from '@/common/context/searchParams/types';
import { createContext } from 'react';

const SearchParamsContext = createContext<SearchParamsContextType | null>(null);

export default SearchParamsContext;
