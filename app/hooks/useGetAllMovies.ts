import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '../lib/api';

export const useGetAllMovies = (queryKey: string[]) =>
  useQuery({
    queryKey,
    queryFn: fetchPopularMovies,
  });
