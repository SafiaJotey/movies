'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '../lib/api';

export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['searchMovies', query],
    queryFn: ({ pageParam = 1 }) => fetchSearchResults(query, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: false, // Only fetch when manually triggered
  });
};
