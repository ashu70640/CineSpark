import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setIsPlaying, setSelectedMovieId } from "../utils/moviesSlice";
const Watchlist = ({
  watchlist,
  setWatchlist,

  scrollToTrailer,
}) => {
  const dispatch = useDispatch();
  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    alert("Movie removed from your watchlist!");
  };

  const handleMovieClick = (movieId) => {
    dispatch(setSelectedMovieId(movieId)); // Update the trailer
    dispatch(setIsPlaying(true)); //Auto play the new trailer
    setTimeout(() => {
      scrollToTrailer(); // Scroll to the trailer section
    }, 100);
  };
  return (
    <div className="w-full min-w-full px-0 mt-4">
      <h2 className="text-lg md:text-2xl text-white font-semibold py-4 px-2">
        My Watchlist
      </h2>
      {watchlist.length === 0 ? (
        <p className="text-white px-2">Your watchlist is empty.</p>
      ) : (
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 w-full min-w-full">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-40 md:w-48 flex flex-col items-center"
            >
              <div
                onClick={() => handleMovieClick(movie.id)}
                className="relative group cursor-pointer"
              >
                <img
                  src={`${IMG_CDN_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 rounded-lg">
                  <span className="text-white text-sm text-center px-2">
                    {movie.title}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
