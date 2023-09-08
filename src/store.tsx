import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducer/moviesSlice";
import { IMoviesState } from "./types/movieTypes";

export type RootState = {
  movies: IMoviesState;
};

const store = configureStore({
  reducer: { movies: moviesReducer },
});

export default store;