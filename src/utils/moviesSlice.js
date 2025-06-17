import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    filteredMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
  },
});
export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addFilteredMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
