'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MovieList from '../components/MovieList';
import { useGetAllMovies } from '../hooks/useGetAllMovies';
import { useSearchMovies } from '../hooks/useGetSearchedMovies';
import { Banner } from '../components/Banner';

// Debounce utility to reduce API calls
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Ref to manage input field focus

  const debouncedQuery = useDebounce(searchQuery, 500);

  // Fetch popular movies
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

  // Keep track of focus state to manage re-renders properly
  const keepFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Ensure input stays focused
    }
  }, []);

  // Trigger search only when user stops typing
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearching(true);
      refetchSearch();
    } else {
      setIsSearching(false);
    }
  }, [debouncedQuery, refetchSearch]);

  // Handle outside clicks to blur the input
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        inputRef.current.blur();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Refocus the input whenever search query or results change
  useEffect(() => {
    keepFocus();
  }, [searchQuery, searchData, keepFocus]);

  const currentData = isSearching ? searchData : movieData;
  const isLoading = isSearching ? searchLoading : movieLoading;
  const error = isSearching ? searchError : movieError;
  const fetchNextPage = isSearching ? fetchMoreSearch : fetchMoreMovies;
  const hasNextPage = isSearching ? hasMoreSearch : hasMoreMovies;
  const isFetchingNextPage = isSearching ? isFetchingSearch : isFetchingMovies;

  if (isLoading) return <p>Loading...</p>;
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
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 w-full"
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </main>
  );
}


