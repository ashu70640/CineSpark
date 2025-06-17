import React, { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const SearchFilters = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // Fetch genres from TMDB using Fetch API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list??language=en`,
          API_OPTIONS // Replace with your TMDB API key
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Handle filter changes
  const handleFilter = () => {
    const filters = {
      with_genres: selectedGenre,
      primary_release_year: selectedYear,
      "vote_average.gte": selectedRating,
    };
    onFilterChange(filters);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-2 flex flex-col md:flex-row gap-2 rounded-lg shadow-md mx-2 md:mx-4 mt-0 mb-0 border border-gray-600 z-20 w-1/3 ">
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm hover:bg-gray-700 transition-colors duration-200"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <select
        className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm hover:bg-gray-700 transition-colors duration-200"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {Array.from({ length: 25 }, (_, i) => 2025 - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm hover:bg-gray-700 transition-colors duration-200"
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
      >
        <option value="">All Ratings</option>
        {[5, 6, 7, 8, 9].map((rating) => (
          <option key={rating} value={rating}>
            {rating}+
          </option>
        ))}
      </select>
      <button
        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm transition-colors duration-200 shadow-sm"
        onClick={handleFilter}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default SearchFilters;
