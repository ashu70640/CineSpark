// Authenticated home surface: orchestrates data bootstrapping hooks and switches
// between GPT search and the curated browse experience.
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
import WatchlistDrawer from "./WatchlistDrawer";

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
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const scrollToTrailer = () => {
    if (mainContainerRef.current) {
      // Keep trailer reveal smooth and platform-like instead of an abrupt jump.
      mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Header onWatchlistClick={() => setIsWatchlistOpen(true)} />

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
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
      />
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
