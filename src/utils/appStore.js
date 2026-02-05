// Single Redux store for CineSpark. All domain slices are registered here so
// that components only ever import hooks/selectors, not individual reducers.
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./GptSlice";
import configReducer from "./configSlice";
import watchlistReducer from "./watchlistSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    watchlist: watchlistReducer,
  },
});
export default appStore;
