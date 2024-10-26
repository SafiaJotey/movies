
import AutoSlider from "@/app/components/AutoSlider";
import WatchButton from "@/app/components/WatchButton";

import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchRecommendations,
} from "@/app/lib/api";
import { Genre, Movie } from "@/app/type/movieType";
import { Cast } from "@/app/type/RecommendationType";
import Image from "next/image";

interface MoviePageProps {
  params: { movieId: string };
}

const MovieDetailsPage = async ({ params }: MoviePageProps) => {
  const { movieId } = params;

  const movie = await fetchMovieDetails(movieId);
  const credits = await fetchMovieCredits(movieId);
  const recommendations = await fetchRecommendations(movieId);

  return (
    <div className="bg-gray-50 min-h-screen p-8 lg:p-16">
      <div className="max-w-6xl mx-auto">
        {/* Movie Details Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={350}
            height={525}
            className="rounded-xl shadow-lg"
            priority
          />

          <div className="space-y-6 text-gray-800">
            <h1 className="text-5xl font-extrabold leading-tight">
              {movie.title}
            </h1>
            <div className="my-4">
          <WatchButton movie={movie} />
        </div>
            <p className="text-lg leading-relaxed">{movie.overview}</p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p className="text-sm">
                <span className="font-medium">Genres:</span>{" "}
                {movie.genres.map((g: Genre) => g.name).join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-6">Top Cast</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {credits.cast.slice(0, 10).map((actor: Cast) => (
              <li key={actor.id} className="text-center">
                <p className="font-semibold text-lg">{actor.name}</p>
                <p className="text-sm text-gray-500">{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations Slider (Client Component) */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-6">Recommendations</h2>
          <AutoSlider recommendations={recommendations.results} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

export async function generateStaticParams() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const movies = await response.json();

  return movies.results.map((movie: Movie) => ({
    movieId: movie.id.toString(),
  }));
}
