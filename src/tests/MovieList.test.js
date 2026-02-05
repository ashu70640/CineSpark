import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MoviesList from "../components/MoviesList";
import moviesReducer from "../utils/moviesSlice";

const mockScrollToTrailer = jest.fn();
const mockAddToWatchlist = jest.fn();

describe("MoviesList Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
      preloadedState: {
        movies: { selectedMovieId: null, isPlaying: false },
      },
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("dispatches actions and scrolls on movie click", () => {
    const movies = [
      { id: 1, poster_path: "/inception.jpg", title: "Inception" },
    ];

    render(
      <Provider store={store}>
        <MoviesList
          title="Popular Movies"
          movies={movies}
          addToWatchlist={mockAddToWatchlist}
          scrollToTrailer={mockScrollToTrailer}
        />
      </Provider>
    );

    const movieCard = screen.getByTestId("movie-card");
    expect(movieCard).toBeInTheDocument();
    fireEvent.click(movieCard);

    jest.advanceTimersByTime(100);

    const state = store.getState();
    expect(state.movies.selectedMovieId).toBe(1);
    expect(state.movies.isPlaying).toBe(true);
    expect(mockScrollToTrailer).toHaveBeenCalled();
  });
});
