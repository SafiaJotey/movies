"use server";

import { Movie } from "../type/movieType";



let watchlist: Movie[] = [];

export const fetchWatchlist = async (): Promise<Movie[]> => {
  return watchlist;
};

export const addWatchlist = async (movie: Movie): Promise<Movie[]> => {
  const findMovie = watchlist.find((item: Movie) => item?.id === movie?.id);
  if (!findMovie) {
    watchlist.push(movie);
  }
  return watchlist;
};

export const removeWatchlist = async (id: number): Promise<Movie[]> => {
  watchlist = watchlist.filter((movie) => movie.id !== id);
  return watchlist;
};