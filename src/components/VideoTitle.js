import React from "react";

const VideoTitle = ({
  title,
  overview,
  isPlaying,
  setIsPlaying,
  onMoreInfo,
}) => {
  return (
    <div className="relative z-10 text-white max-w-2xl px-1 sm:px-0">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
        {title}
      </h1>

      {/* Overview */}
      <p
        className="mt-3 text-sm sm:text-base md:text-lg
                 text-white/80
                 line-clamp-2 md:line-clamp-none
                 md:w-3/4"
      >
        {overview}
      </p>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Play / Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2
                   bg-amber-400 text-black
                   px-4 py-2 sm:px-6 sm:py-3
                   text-sm sm:text-base font-semibold
                   rounded-lg
                   hover:bg-amber-300
                   active:scale-[0.97]
                   transition-all"
        >
          {isPlaying ? "❚❚ Pause" : "▷ Play"}
        </button>

        {/* More Info */}
        <button
          onClick={onMoreInfo}
          className="hidden sm:flex items-center
                   bg-white/20 text-white
                   px-4 py-2 sm:px-6 sm:py-3
                   text-sm sm:text-base font-medium
                   rounded-lg
                   hover:bg-white/30
                   transition"
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
