// Discovery rail section: owns filter-driven TMDB queries, list orchestration,
// and a local watchlist view that complements the global drawer.
import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { useSelector, useDispatch } from "react-redux";
import SearchFilters from "./SearchFilter";
import { addFilteredMovies } from "../utils/moviesSlice";
import Watchlist from "./WatchList";
import { API_OPTIONS } from "../utils/constants";
const SecondaryContainer = ({ scrollToTrailer }) => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  const handleFilterChange = async (filters) => {
    setIsLoading(true);
    try {
      // Build the discover query server‑side to keep the filter component
      // presentational and make the fetch shape easy to evolve.
      const query = new URLSearchParams({
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "2",
        sort_by: "popularity.desc",
        ...filters,
      }).toString();
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?${query}`,
        API_OPTIONS,
      );
      if (!response.ok) throw new Error("Failed to fetch filtered movies");
      const data = await response.json();
      console.log("Filtered movies data:", data.results);
      dispatch(addFilteredMovies(data.results));
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
      setError("Failed to load filtered movies. Please try again.");
    }
    setIsLoading(false);
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.find((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
      alert(`${movie.title} has been added to your watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist.`);
    }
  };
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black w-full min-w-full">
        <SearchFilters onFilterChange={handleFilterChange} />
        <div className="scrollbar-hide pt-2 px-0 relative z-10 w-full min-w-full">
          {isLoading && (
            <p className="text-white">Loading filtered movies...</p>
          )}
          {error && <p className="text-red-500 px-2">{error}</p>}

          <MoviesList
            title="Filtered Results"
            movies={movies.filteredMovies}
            addToWatchlist={addToWatchlist}
            fullWidth
            watchlist={watchlist}
            scrollToTrailer={scrollToTrailer}
          />

          <MoviesList
            title="Now Playing"
            movies={movies.nowPlayingMovies}
            addToWatchlist={addToWatchlist}
            fullWidth
            scrollToTrailer={scrollToTrailer}
          />
          <MoviesList
            title="Trending"
            movies={movies.nowPlayingMovies}
            addToWatchlist={addToWatchlist}
            fullWidth
            scrollToTrailer={scrollToTrailer}
          />
          <MoviesList
            title="Popular"
            movies={movies.popularMovies}
            addToWatchlist={addToWatchlist}
            fullWidth
            scrollToTrailer={scrollToTrailer}
          />
          <MoviesList
            title="Upcoming Movies"
            movies={movies.upcomingMovies}
            addToWatchlist={addToWatchlist}
            fullWidth
            scrollToTrailer={scrollToTrailer}
          />
          <MoviesList
            title="Top Rated"
            movies={movies.topRatedMovies}
            addToWatchlist={addToWatchlist}
            fullWidth
            scrollToTrailer={scrollToTrailer}
          />
        </div>
      </div>
    )
  );
};

/*
    Movies list-popular
     moviesCard*n
    movies list-now playing 
    movies list-Trending
    Movies list-horror
    */
export default SecondaryContainer;
