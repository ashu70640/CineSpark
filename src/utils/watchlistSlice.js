// Global watchlist slice backed by localStorage. Keeps server calls out of the
// critical path while still exposing a single source of truth to the UI.
import { createSlice } from "@reduxjs/toolkit";
const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("watchlist") || "[]"),
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.items.find(
        (movie) => movie.id === action.payload.id,
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.items));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.items));
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
