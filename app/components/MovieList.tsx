import { Movie, MovieListProps } from "../tyrpe/movieType";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: MovieListProps }) {
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
