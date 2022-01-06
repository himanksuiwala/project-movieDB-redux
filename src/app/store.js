import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import moviesReducer from '../features/movie/movieSlice';
import castReducer from '../features/movie/castSlice';
import seasonReducer from '../features/movie/seasonSlice';
import searchReducer from "../features/movie/searchSlice"
// const thunkMiddleware = require('redu')
// const applyMiddleware = redux.applyMiddleware
// export const store = configureStore({
//   reducer: {
//     details:movieReducer,
//     casts:castReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    casts:castReducer,
    seasons:seasonReducer,
    search:searchReducer,
  },
});
