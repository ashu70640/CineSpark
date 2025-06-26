import React, { useEffect, useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openAI from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/GptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const [searchQuery, setSearchQuery] = useState("");
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    console.log(json);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Implement the GPT search logic here
    if (!searchQuery) return;
    console.log(searchQuery);
    //make an API call to GPT API and get Movie Resultsasync function main() {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query :" +
      searchQuery +
      ". only give me names of 5 movies. comma seperated like the example result given ahead. Example Result: Gadar , Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openAI.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      //todo:write error handling
    }
    console.log(gptResults.choices?.[0].message?.content);

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(","); //to crete array of movies.
    //["hera pheri","chup chupke","jai ho","kill"]
    //For each movies I will Search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //[promise1,promise2,promise3,promise4,promise5]
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchText.current?.value || "");
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText.current?.value]);
  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 "
          placeholder={lang[langKey].GptSearchPlaceholder}
        />
        <button
          className="m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
