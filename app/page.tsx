'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Banner } from './components/Banner';
import MovieList from './components/MovieList';
import { useGetAllMovies } from './hooks/useGetAllMovies';
import { useSearchMovies } from './hooks/useGetSearchedMovies';
import { useDebounce } from './lib/utils/useDebounce';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Ref to manage input field focus

  const debouncedQuery = useDebounce(searchQuery, 500);
  //Fetch all movies

  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
    isFetchingNextPage: isFetchingMovies,
    fetchNextPage: fetchMoreMovies,
    hasNextPage: hasMoreMovies,
  } = useGetAllMovies(['popularMovies']);

  // Fetch search results
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetchingNextPage: isFetchingSearch,
    fetchNextPage: fetchMoreSearch,
    hasNextPage: hasMoreSearch,
    refetch: refetchSearch,
  } = useSearchMovies(debouncedQuery);

  const keepFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearching(true);
      refetchSearch();
    } else {
      setIsSearching(false);
    }
  }, [debouncedQuery, refetchSearch]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        inputRef.current.blur();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    keepFocus();
  }, [searchQuery, searchData, keepFocus]);

  const currentData = isSearching ? searchData : movieData;
  const isLoading = isSearching ? searchLoading : movieLoading;
  const error = isSearching ? searchError : movieError;
  const fetchNextPage = isSearching ? fetchMoreSearch : fetchMoreMovies;
  const hasNextPage = isSearching ? hasMoreSearch : hasMoreMovies;
  const isFetchingNextPage = isSearching ? isFetchingSearch : isFetchingMovies;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-600"></div>
      </div>
    );
  if (error) return <p>Something went wrong!</p>;

  return (
    <main className="p-8">
      <Banner />
      <h1 className="text-2xl font-bold mb-4">Movies</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 px-4 py-2 w-full"
        />
      </div>

      {/* Movie List */}
      {currentData?.pages.map((page, index) => (
        <MovieList key={index} movies={page.results} />
      ))}

      {/* Load More Button */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-500 my-2"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </main>
  );
}
