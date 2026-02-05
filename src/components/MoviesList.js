// Horizontally scrollable rail used across browse and GPT surfaces.
// Purely presentational; all state transitions are delegated through callbacks
// and Redux actions.
import React from "react";
import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import { setIsPlaying, setSelectedMovieId } from "../utils/moviesSlice";
const MoviesList = ({
  title,
  movies,
  addToWatchlist,
  fullWidth,
  watchlist = [],
  scrollToTrailer,
  onMovieClick, // 👈 NEW (optional)
}) => {
  const dispatch = useDispatch();

  const validMovies =
    movies?.filter((movie) => movie && movie.id && movie.poster_path) || [];

  const handleMovieClick = (movieId) => {
    // GPT Suggestions: when a click handler is provided, treat the rail as a
    // pure selector and let the caller decide what to do with the selection.
    if (onMovieClick) {
      onMovieClick(movieId);
      return;
    }

    // 👉 Normal browse flow
    dispatch(setSelectedMovieId(movieId));
    dispatch(setIsPlaying(true));

    if (scrollToTrailer) {
      setTimeout(() => {
        scrollToTrailer();
      }, 100);
    }
  };

  return (
    <div className={`w-full min-w-full ${fullWidth ? "px-0" : "px-2 md:px-4"}`}>
      <h1 className="text-lg md:text-2xl text-white font-semibold py-4 px-2">
        {title}
      </h1>

      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 w-full min-w-full">
        <div className="flex">
          {validMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="cursor-pointer"
            >
              <MovieCard
                posterPath={movie.poster_path}
                addToWatchlist={() => addToWatchlist?.(movie)}
                watchlist={watchlist}
                movieId={movie.id}
                displayMovie={movie}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
