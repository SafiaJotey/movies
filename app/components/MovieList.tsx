'use client';

import { useGetAllMovies } from '../hooks/useGetAllMovies';
import { Movie } from '../tyrpe/movieType';
import MovieCard from './MovieCard';

export default function MovieList() {
  const { data, error } = useGetAllMovies(['popularMovies']);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.results?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
