import axios from 'axios';
import { MoviesResponse } from '../tyrpe/movieType';
import { NextApiRequest, NextApiResponse } from 'next';

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
// Function to fetch movie details
export const fetchMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

// Function to fetch movie credits (cast)
export const fetchMovieCredits = async (movieId: string) => {
  const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

// Function to fetch movie recommendations
export const fetchRecommendations = async (movieId: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/${movieId}/recommendations`,
    { params: { api_key: API_KEY } }
  );
  return response.data;
};

let watchlist: number[] = []; // In-memory watchlist

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return the watchlist
    res.status(200).json(watchlist);
  } else if (req.method === 'POST') {
    // Add movie to the watchlist
    const { movieId } = req.body;
    if (!watchlist.includes(movieId)) {
      watchlist.push(movieId);
    }
    res.status(201).json(watchlist);
  } else if (req.method === 'DELETE') {
    // Remove movie from the watchlist
    const { movieId } = req.body;
    watchlist = watchlist.filter((id) => id !== movieId);
    res.status(200).json(watchlist);
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}