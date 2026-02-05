// Vertical stack of GPT-generated rails. Reuses the generic `MovieList` and
// delegates actual playback to the trailer modal.
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MoviesList";
import TrailerModal from "./TrailerModal";
const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  const [activeMovieId, setActiveMovieId] = useState(null);

  // Prevent background scroll when the trailer modal is locked on screen.
  useEffect(() => {
    document.body.style.overflow = activeMovieId ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeMovieId]);

  if (!movieNames || !movieResults) return null;

  return (
    <div
      className="w-full min-w-full pt-24
                bg-transparent backdrop-blur-sm"
    >
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
          fullWidth
          onMovieClick={(id) => setActiveMovieId(id)} // 🎬 open modal
        />
      ))}

      {/* 🎥 Trailer Modal */}
      {activeMovieId && (
        <TrailerModal
          movieId={activeMovieId}
          onClose={() => setActiveMovieId(null)}
        />
      )}
    </div>
  );
};

export default GptMovieSuggestions;
