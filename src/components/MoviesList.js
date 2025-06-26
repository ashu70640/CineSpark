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
}) => {
  const dispatch = useDispatch();
  const validMovies =
    movies?.filter((movie) => movie && movie.id && movie.poster_path) || [];
  const handleMovieClick = (movieId) => {
    dispatch(setSelectedMovieId(movieId)); // Update the trailer

    dispatch(setIsPlaying(true)); //Auto-pay the new trailer

    setTimeout(() => {
      scrollToTrailer(); // Scroll to the trailer section
    }, 100);
  };
  console.log(movies);
  return (
    <div className={`w-full min-w-full ${fullWidth ? "px-0" : "px-2 md:px-4"}`}>
      <h1 className="text-lg md:text-2xl text-white font-semibold py-4 px-2">
        {title}
      </h1>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 w-full min-w-full">
        <div className="flex">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="cursor-pointer"
            >
              <MovieCard
                posterPath={movie.poster_path}
                addToWatchlist={() => addToWatchlist(movie)}
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
