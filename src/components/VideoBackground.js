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
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <ReactPlayer
        key={movieId}
        url={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
        playing={isPlaying}
        muted={false}
        controls={false}
        width="100%"
        height="100%"
        className="absolute top-0 left-0 w-full h-full"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default VideoBackground;
