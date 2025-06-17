import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMoviesTrailer";
import ReactPlayer from "react-player";
//fetch trailer video && updating the store with trailer video data
const VideoBackground = ({ movieId, isPlaying }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo?.key) {
    return (
      <div className="w-screen aspect-video bg-black flex items-center justify-center">
        <p className="text-white">Trailer not available.</p>
      </div>
    );
  }

  return (
    <div className="w-screen">
      {/* <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe> */}
      <ReactPlayer
        key={movieId}
        url={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
        playing={isPlaying}
        muted={true}
        width="100%"
        height="100%"
        className="w-screen aspect-video"
      />
    </div>
  );
};

export default VideoBackground;
