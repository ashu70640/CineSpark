import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

// TMDB trailer loader: fetches the best matching trailer for a movie and
// normalizes it into the movies slice. Intentional side‑effect hook.
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMoviesVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS,
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    getMoviesVideos();
  }, [movieId]); // eslint-disable-line react-hooks/exhaustive-deps -- fetch only when movieId changes
};
export default useMovieTrailer;
