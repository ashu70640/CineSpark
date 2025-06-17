import React from "react";

const VideoTitle = ({ title, overview, isPlaying, setIsPlaying }) => {
  return (
    <div className="w-screen aspect-video bg bg-gradient-to-r from-black  absolute pt-[25%] px-6 md:px-12 text-white">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
      <div className="my-1 md:m-0">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-sky-500 text-white py-1 md:py-4 px-2 md:px-12 text-xl rounded-md hover:bg-opacity-50"
        >
          {isPlaying ? "❚❚ Pause" : "▶️ Play"}
        </button>
        <button className="hidden md:inline-block bg-gray-600 text-white p-2  px-12 text-xl rounded-md mx-4">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
