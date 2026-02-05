// Hero layout: chooses the “main” title and composes the hero banner, trailer
// background and info modal. All heavy data work is delegated to Redux hooks.
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { setIsPlaying } from "../utils/moviesSlice";
import MovieInfoModal from "./MovieInfoModal";
const MainContainer = () => {
  const dispatch = useDispatch();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { nowPlayingMovies, filteredMovies, selectedMovieId, isPlaying } =
    useSelector((store) => store.movies);

  if (!nowPlayingMovies) return null;

  let mainMovie = null;

  if (selectedMovieId) {
    // Prefer a filtered result when present so the hero stays aligned with
    // whatever subset the user is currently exploring.
    mainMovie =
      filteredMovies?.find((movie) => movie.id === selectedMovieId) ||
      nowPlayingMovies.find((movie) => movie.id === selectedMovieId);
  } else {
    // Treat the second now-playing item as the hero to keep a more cinematic
    // feel instead of always highlighting the first API result.
    mainMovie = nowPlayingMovies[1];
  }

  if (!mainMovie) return null;

  const { original_title, overview, id } = mainMovie;

  return (
    <section className="relative bg-black w-full min-h-[75vh] md:min-h-screen overflow-hidden">
      {/* 🎬 VIDEO BACKGROUND (absolute layer) */}
      <div className="absolute inset-0 w-full h-full">
        <VideoBackground movieId={id} isPlaying={isPlaying} />
      </div>

      {/* 🌓 OVERLAY CONTENT (on top of video) */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="px-4 pt-32 sm:pt-40 md:pt-48 lg:pt-56 w-full">
          <VideoTitle
            title={original_title}
            overview={overview}
            isPlaying={isPlaying}
            setIsPlaying={(value) => dispatch(setIsPlaying(value))}
            onMoreInfo={() => setShowInfoModal(true)}
          />
        </div>
      </div>

      {/* ℹ️ Info Modal */}
      {showInfoModal && (
        <MovieInfoModal movieId={id} onClose={() => setShowInfoModal(false)} />
      )}

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default MainContainer;
