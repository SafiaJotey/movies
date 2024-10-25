'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMovies } from '../lib/api';

export const useGetAllMovies = (queryKey: string[]) => {
  return useInfiniteQuery({
    queryKey,

    queryFn: ({ pageParam = 1 }) => fetchMovies({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1, // <- This is the missing property
  });
};
