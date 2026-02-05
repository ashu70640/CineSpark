import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../utils/watchlistSlice";

const MovieCard = ({ posterPath, movieId, displayMovie }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.watchlist.items);

  const isInWatchlist =
    Array.isArray(watchlist) && watchlist.some((item) => item.id === movieId);

  const poster = displayMovie?.poster_path ?? posterPath;
  const title = displayMovie?.title ?? "Movie";

  if (!poster) return null;

  return (
    <div
      className="w-32 sm:w-36 md:w-48 pr-3 sm:pr-4 group cursor-pointer"
      data-testid="movie-card"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        {/* Poster */}
        <img
          src={IMG_CDN_URL + poster}
          alt={title}
          className="w-full h-full object-cover
                     transition-transform duration-300
                     sm:group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-3
                     bg-black/60
                     opacity-100 sm:opacity-0
                     sm:group-hover:opacity-100
                     transition-opacity duration-300"
        >
          {/* Title */}
          <p className="text-white text-xs sm:text-sm font-medium mb-2 line-clamp-2">
            {title}
          </p>

          {/* Watchlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToWatchlist(displayMovie));
            }}
            disabled={isInWatchlist}
            className={`w-full flex items-center justify-center
                        min-h-[40px]
                        text-xs sm:text-sm font-semibold
                        rounded-md
                        transition-all duration-200
              ${
                isInWatchlist
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-amber-400 text-black hover:bg-amber-300"
              }`}
          >
            {isInWatchlist ? "✓ Added" : "+ Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
