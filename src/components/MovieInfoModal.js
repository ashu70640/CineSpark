// Lightweight details sheet for the hero title. Uses a dedicated TMDB call
// instead of overloading the feed payload, to keep the rail responses small.
import { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
const MovieInfoModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        API_OPTIONS,
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-gray-900 text-white
                w-full max-w-3xl
                max-h-[90vh]
                rounded-2xl
                overflow-hidden
                shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20
               text-xl text-white/80 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row items-stretch h-full">
          {/* Poster */}
          <img
            src={IMG_CDN_URL + movie.poster_path}
            alt={movie.title}
            className="w-full md:w-72 h-auto md:h-full object-cover"
          />

          {/* Details */}
          <div className="p-6 space-y-4 flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold">{movie.title}</h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {movie.overview}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-xs
                             bg-white/10 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Meta Info */}
            <div className="text-sm text-white/80 space-y-1">
              <p>⭐ Rating: {movie.vote_average}</p>
              <p>🕒 Runtime: {movie.runtime} mins</p>
              <p>📅 Release: {movie.release_date}</p>
              <p>🌐 Language: {movie.original_language.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoModal;
