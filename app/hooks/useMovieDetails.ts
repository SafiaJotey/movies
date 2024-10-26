import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits, fetchMovieDetails, fetchRecommendations } from '../lib/api';

// Hook to fetch movie details
export const useMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });
};

// Hook to fetch movie credits
export const useMovieCredits = (movieId: string) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => fetchMovieCredits(movieId),
  });
};

// Hook to fetch movie recommendations
export const useRecommendations = (movieId: string) => {
  return useQuery({
    queryKey: ['movie', movieId, 'recommendations'],
    queryFn: () => fetchRecommendations(movieId),
  });
};
