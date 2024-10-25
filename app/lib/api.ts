import axios from 'axios';
import { MoviesResponse } from '../tyrpe/movieType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Function to fetch popular movies
export const fetchMovies = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<MoviesResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular`,
    {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        page: pageParam,
      },
    }
  );

  return response.data;
};
export const fetchSearchResults = async (
  query: string,
  pageParam: number = 1
): Promise<MoviesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: pageParam,
    },
  });
  return response.data;
};
// Function to search for movies

// Function to fetch movie details
export const fetchMovieDetails = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

// Function to fetch movie credits (cast)
export const fetchMovieCredits = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return response.json();
};

// Function to fetch movie recommendations
export const fetchMovieRecommendations = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie recommendations');
  }
  return response.json();
};
