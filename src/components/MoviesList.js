import React from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({
  title,
  movies,
  addToWatchlist,
  fullWidth,
  watchlist = [],
  onMovieClick,
  scrollToTrailer,
}) => {
  const handleMovieClick = (movieId) => {
    onMovieClick(movieId); // Update the trailer

    scrollToTrailer(); // Scroll to the trailer section
    setTimeout(() => {
      scrollToTrailer();
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
