import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = ({
  movieId: selectedMovieId,
  isPlaying,
  setIsPlaying,
  onMovieClick,
}) => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return; //early return
  const mainMovie = selectedMovieId
    ? movies.find((movie) => movie.id === selectedMovieId)
    : movies[1];
  if (!mainMovie) return;

  const { original_title, overview, id } = mainMovie;
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle
        title={original_title}
        overview={overview}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <VideoBackground movieId={id} isPlaying={isPlaying} />
    </div>
  );
};

export default MainContainer;
