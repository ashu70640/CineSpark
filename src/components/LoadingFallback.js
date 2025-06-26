function LoadingFallback() {
  return (
    <div className="p-4">
      <div className="h-6 w-40 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-40 h-60 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default LoadingFallback;
