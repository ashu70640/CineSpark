import React from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { setIsPlaying } from "../utils/moviesSlice";

const MainContainer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const selectedMovieId = useSelector((store) => store.movies?.selectedMovieId);
  const isPlaying = useSelector((store) => store.movies?.isPlaying);
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
        setIsPlaying={(value) => dispatch(setIsPlaying(value))}
      />
      <VideoBackground movieId={id} isPlaying={isPlaying} />
    </div>
  );
};

export default MainContainer;
