import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Watchlist from "../components/WatchList";
import moviesReducer from "../utils/moviesSlice";

const mockScrollToTrailer = jest.fn();
const mockSetWatchlist = jest.fn();

describe("Watchlist Component", () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
    dispatchSpy = jest.spyOn(store, "dispatch");
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it("dispatches actions on movie click", () => {
    const watchlist = [
      { id: 1, poster_path: "/inception.jpg", title: "Inception" },
    ];

    render(
      <Provider store={store}>
        <Watchlist
          watchlist={watchlist}
          setWatchlist={mockSetWatchlist}
          scrollToTrailer={mockScrollToTrailer}
        />
      </Provider>
    );

    const movieImage = screen.getByAltText("Inception");
    fireEvent.click(movieImage);

    jest.advanceTimersByTime(100);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "movies/setSelectedMovieId",
      payload: 1,
    });
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "movies/setIsPlaying",
      payload: true,
    });
    expect(mockScrollToTrailer).toHaveBeenCalled();
  });
});
