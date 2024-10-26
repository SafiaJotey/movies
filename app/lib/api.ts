import axios from 'axios';
import { MoviesResponse } from '../type/movieType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Function to fetch  movies
export const fetchMovies = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<MoviesResponse> => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/popular`,
    {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        page: pageParam,
      },
    }
  );

  return response.data;
};

//Search Movies
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
//  movie details
export const fetchMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

// movie credits 
export const fetchMovieCredits = async (movieId: string) => {
  const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

//  movie recommendations
export const fetchRecommendations = async (movieId: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/${movieId}/recommendations`,
    { params: { api_key: API_KEY } }
  );
  return response.data;
};
