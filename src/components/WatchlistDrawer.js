import { useDispatch, useSelector } from "react-redux";
import { removeFromWatchlist } from "../utils/watchlistSlice";
import { setSelectedMovieId, setIsPlaying } from "../utils/moviesSlice";
import { IMG_CDN_URL } from "../utils/constants";

const WatchlistDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.watchlist.items);

  const handlePlay = (movieId) => {
    dispatch(setSelectedMovieId(movieId));
    dispatch(setIsPlaying(true));
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-black z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div
        className="flex items-center justify-between px-4 py-4
                      border-b border-white/10"
      >
        <h2 className="text-white text-lg font-semibold">My Watchlist</h2>
        <button onClick={onClose} className="text-white text-xl">
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto">
        {watchlist.length === 0 ? (
          <p className="text-white/60 text-sm text-center mt-10">
            No trailers added yet
          </p>
        ) : (
          watchlist.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-3 bg-white/5 p-2 rounded-lg"
            >
              <img
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.title}
                className="w-16 rounded-md"
              />

              <div className="flex-1">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {movie.title}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handlePlay(movie.id)}
                    className="text-xs px-2 py-1 bg-blue-500
                               hover:bg-blue-600 rounded-md text-white"
                  >
                    ▷ Play
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWatchlist(movie.id))}
                    className="text-xs px-2 py-1 bg-red-600
                               hover:bg-red-700 rounded-md text-white"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistDrawer;
