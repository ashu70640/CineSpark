// Full-screen trailer overlay rendered via portal so it can sit above the
// entire app shell without fighting local z-index stacks.
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMoviesTrailer";
const TrailerModal = ({ movieId, onClose }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Fetch trailer metadata for the active movie and hydrate the movies slice.
  useMovieTrailer(movieId);

  // Lock background scroll while the modal is open to keep focus on playback.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!movieId) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl z-10 hover:scale-110 transition"
      >
        ✕
      </button>

      {/* TRAILER CONTAINER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-[90vw] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
      >
        {trailerVideo?.key && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
            playing={true}
            controls
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>,
    document.body,
  );
};

export default TrailerModal;
