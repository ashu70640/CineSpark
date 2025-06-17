import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({
  posterPath,
  addToWatchlist,
  watchlist,
  movieId,
  displayMovie,
}) => {
  const isInWatchlist =
    watchlist && Array.isArray(watchlist)
      ? watchlist.some((item) => item.id === movieId)
      : false;
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <div>
        <div className="relative group">
          <img
            src={IMG_CDN_URL + displayMovie.poster_path}
            alt={displayMovie.title}
            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 rounded-lg">
            <span className="text-white text-sm text-center px-2">
              {displayMovie.title}
            </span>
          </div>
        </div>
        <button
          onClick={addToWatchlist}
          disabled={isInWatchlist}
          className={`mt-2 px-3 py-1 text-white text-sm rounded-md transition-colors duration-200 ${
            isInWatchlist
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isInWatchlist ? "Added" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
