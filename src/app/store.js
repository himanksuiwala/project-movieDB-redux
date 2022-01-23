import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import moviesReducer from "../features/movie/movieSlice";
import castReducer from "../features/movie/castSlice";
import seasonReducer from "../features/movie/seasonSlice";
import searchReducer from "../features/movie/searchSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    casts: castReducer,
    seasons: seasonReducer,
    search: searchReducer,
  },
});
