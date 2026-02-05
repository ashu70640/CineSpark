import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

// Bootstrap hook for the “Now Playing” rail. Fetches once per session and
// memoizes results in the movies slice to avoid duplicate TMDB calls.
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    // Only hydrate from the network if this rail has not already been loaded
    // in the current session.
    !nowPlayingMovies && getNowPlayingMovies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- run once on mount
};
export default useNowPlayingMovies;
