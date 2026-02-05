// Search input for GPT-like experience. Handles debouncing, error states,
// and bridges TMDB results into the GPT slice without owning display logic.
import React, { useEffect, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/GptSlice";
const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- TMDB SEARCH ---------------- */
  const searchMovieTMDB = async (movie) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS,
    );
    if (!res.ok) throw new Error("TMDB request failed");
    const json = await res.json();
    return json.results;
  };

  /* ---------------- DEBOUNCE INPUT ---------------- */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDebouncedQuery("");
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500); // ⏱ debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ---------------- AUTO SEARCH (DEBOUNCED) ---------------- */
  useEffect(() => {
    if (debouncedQuery) {
      runSearch(debouncedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  /* ---------------- CORE SEARCH ---------------- */
  const runSearch = async (query) => {
    if (!query || loading) return;

    setLoading(true);
    setError(null);

    try {
      // Simulated GPT behavior (stable)
      const fakeGptMovies = query.split(" ").slice(0, 5);

      const promiseArray = fakeGptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({
          movieNames: fakeGptMovies,
          movieResults: tmdbResults,
        }),
      );
    } catch (err) {
      console.error("Search failed:", err);
      setError("Unable to fetch results right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- BUTTON SEARCH ---------------- */
  const handleSearchClick = (e) => {
    e.preventDefault();
    runSearch(searchQuery.trim());
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="pt-[35%] md:pt-[8%] flex justify-center px-4">
      <form
        onSubmit={handleSearchClick}
        className="w-full max-w-2xl flex items-center gap-3
                   bg-black/80 backdrop-blur-md
                   border border-white/10 rounded-xl p-3 shadow-xl"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang[langKey].GptSearchPlaceholder}
          className="flex-1 px-4 py-3 rounded-lg
                     bg-white/10 text-white placeholder-white/50
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg font-semibold
                     bg-amber-400 text-black
                     hover:bg-amber-300
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p className="mt-3 text-sm text-amber-300 bg-black/70 px-4 py-2 rounded-lg max-w-2xl">
          {error}
        </p>
      )}
    </div>
  );
};

export default GptSearchBar;
