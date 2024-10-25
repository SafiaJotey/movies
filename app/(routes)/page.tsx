'use client';

import MovieList from '../components/MovieList';
import { useGetAllMovies } from '../hooks/useGetAllMovies';

export default function HomePage() {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetAllMovies(['popularMovies']);
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

      {data?.pages.map((page, index) => (
        <MovieList key={index} movies={page.results} />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </main>
  );
}
