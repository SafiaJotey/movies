'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchWatchlist, removeWatchlist } from '@/app/lib/action';
import { Movie } from '@/app/type/movieType';

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getWatchList = async () => {
    setLoading(true);
    const data = await fetchWatchlist();
    setWatchlistData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    getWatchList();
  }, []);

  const handleRemove = async (id: number) => {
    await removeWatchlist(id);
    getWatchList();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-600"></div>
        </div>
      ) : watchlistData.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlistData.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/movies/${movie.id}`} className="block">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-t-lg"
                  placeholder="blur"
                  blurDataURL={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                />
              </Link>
              <div className="p-4 text-center">
                <p
                  className="text-lg font-semibold truncate"
                  title={movie.title}
                >
                  {movie.title}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Release: {movie.release_date}
                </p>
                <p className="text-yellow-600 text-sm font-medium mt-1">
                  ⭐ {movie.vote_average} / 10
                </p>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-gray-600 text-lg font-medium">
            No movies in your watchlist yet!
          </p>
          <Link href="/movies" className="mt-4 text-gray-600 hover:underline">
            Discover Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
