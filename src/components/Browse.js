import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { Header } from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useRef, useState } from "react";
import useTopRatedMovies from "../hooks/useTopRatesMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // const [selectedMovieId, setSelectedMovieId] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(true);
  const mainContainerRef = useRef(null);
  // const handleMovieClick = (movieId) => {
  //   setSelectedMovieId(movieId);
  //   console.log(movieId);
  //   setIsPlaying(true); // Auto-play the new trailer
  // };
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const scrollToTrailer = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <div ref={mainContainerRef}>
          <MainContainer
            className="bg-black min-h-screen"
            // movieId={selectedMovieId}
            // isPlaying={isPlaying}
            // setIsPlaying={setIsPlaying}
            // onMovieClick={handleMovieClick}
          />
          <SecondaryContainer
            // onMovieClick={handleMovieClick}
            scrollToTrailer={scrollToTrailer}
          />
        </div>
      )}

      {/*
        MainContainer
          -VideoBackground
          -VideoTitle
        SecondaryContainer
          -MoviesList*n
           -cards*n
        */}
    </div>
  );
};

export default Browse;
