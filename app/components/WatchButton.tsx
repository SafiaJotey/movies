"use client";

import {
  addWatchlist,
  fetchWatchlist,
  removeWatchlist,
} from "@/app/lib/action";

import React, { useEffect, useState } from "react";
import { Movie } from "../type/movieType";

const WatchButton = ({ movie }: { movie: Movie }) => {
  const [isPresent, setIsPresent,] = useState(false);
  const [watchlistData, setWatchlistData] = useState<Movie[]>([]);

  const getWatchList = async () => {
    const watchlist = await fetchWatchlist();
    setWatchlistData(watchlist);
  };
  useEffect(() => {
    getWatchList();
  }, [isPresent]);
  const handleAddWatchList = async () => {
    await addWatchlist(movie);
    setIsPresent(true);
  };

  const handleRemove = async () => {
    await removeWatchlist(movie.id);
    setIsPresent(false);
  };



  const findMovie = watchlistData.find((item: Movie) => item?.id === movie?.id);

  return (
    <div className="my-4">
      {findMovie || isPresent ? (
        <button
          onClick={handleRemove}
          className= "bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          onClick={handleAddWatchList}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-500"
        >
          Add to Watchlist
        </button>
      )}
    </div>
  );
};

export default WatchButton;
