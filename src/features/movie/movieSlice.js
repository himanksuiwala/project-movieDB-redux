import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
require('dotenv').config()
                      
const API = process.env.REACT_APP_SECRET

/////////////////////////////////////////////////////////////////
export const fetchAsyncSearch = createAsyncThunk(
  "movies/searchData",
  async (text) => {
    const response = await axios.get(`
      https://api.themoviedb.org/3/search/multi?api_key=${API}&language=en-US&query=${text} h&page=1&include_adult=false
      `);
    return response.data;
  }
);

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const response = await axios.get(`
      https://api.themoviedb.org/3/movie/top_rated?api_key=${API}&language=en-US`);
    return response.data;
  }
);
export const fetchAsyncMoviesDetail = createAsyncThunk(
  "movies/fetchAsyncMoviesDetail",
  async (id) => {
    const response = await axios.get(`
      https://api.themoviedb.org/3/movie/${id}?api_key=${API}&language=en-US`);
    return response.data;
  }
);
///For Netflix///
export const fetchAsyncNETFLIXtv = createAsyncThunk(
  "TV/fetchAsyncNETFLIX",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API}&with_watch_providers=8&watch_region=IN`
    );
    return response.data;
  }
);
export const fetchAsyncNETFLIXmovie = createAsyncThunk(
  "MOVIE/fetchAsyncNETFLIX",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API}&with_watch_providers=8&watch_region=IN`
    );
    return response.data;
  }
);

///For Amazon Prime///
export const fetchAsyncPRIMEtv = createAsyncThunk(
  "TV/fetchAsyncPRIMEVIDEOS",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API}&with_watch_providers=119&watch_region=IN`
    );
    return response.data;
  }
);

export const fetchAsyncPRIMEmovie = createAsyncThunk(
  "MOVIE/fetchAsyncPRIMEVIDEOS",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API}&with_watch_providers=119&watch_region=IN`
    );
    return response.data;
  }
);

///For Hotstar///
export const fetchAsyncHOTSTARmovie = createAsyncThunk(
  "MOVIE/fetchAsyncHOTSTAR",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API}&with_watch_providers=122&watch_region=IN`
    );
    return response.data;
  }
);

export const fetchAsyncHOTSTARtv = createAsyncThunk(
  "TV/fetchAsyncHOTSTAR",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API}&with_watch_providers=122&watch_region=IN`
    );
    return response.data;
  }
);

export const fetchAsyncShowDetail = createAsyncThunk(
  "movies/fetchAsyncShowDetail",
  async (id) => {
    const response = await axios.get(`
      https://api.themoviedb.org/3/tv/${id}?api_key=${API}&language=en-US`);
    return response.data;
  }
);
export const fetchShowSeasonDetail = createAsyncThunk(
  "movies/fetchShowSeasonDetail",
  async (id) => {
    const response = await axios.get(`
      https://api.themoviedb.org/3/tv/${id}?api_key=${API}&language=en-US`);
    return response.data.seasons;
  }
);

const initialState = {
  movies: {},
  netflix_tv: {},
  netflix_movie: {},
  primetv: {},
  primemovie: {},
  hotstar_tv: {},
  hotstar_movie: {},
  selectMovieOrShow: {},
  seasons: {},
  searchData: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      // console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      // console.log("Fetched Successfully!");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },

    ///For Netflix
    [fetchAsyncNETFLIXtv.fulfilled]: (state, { payload }) => {
      // console.log("Netflix Orignals Fetched Succesfully");
      return { ...state, netflix_tv: payload };
    },
    [fetchAsyncNETFLIXtv.rejected]: () => {
      // console.log("Rejected!");
    },
    [fetchAsyncNETFLIXmovie.fulfilled]: (state, { payload }) => {
      // console.log("Netflix MOVIE Fetched Succesfully");
      return { ...state, netflix_movie: payload };
    },
    [fetchAsyncNETFLIXmovie.rejected]: () => {
      console.log("Rejected!");
    },

    ///For PrimeVideos
    [fetchAsyncPRIMEtv.fulfilled]: (state, { payload }) => {
      // console.log("TV shows from PrimeVideos fetched");
      return { ...state, primetv: payload };
    },
    [fetchAsyncPRIMEtv.rejected]: () => {
      console.log("Rejected PRIMEVIDEOS!");
    },
    [fetchAsyncPRIMEmovie.fulfilled]: (state, { payload }) => {
      // console.log("MOVIES shows from PrimeVideos fetched");
      return { ...state, primemovie: payload };
    },
    [fetchAsyncPRIMEmovie.rejected]: () => {
      console.log("Rejected PRIMEVIDEOS!");
    },

    ///For Hotstar
    [fetchAsyncHOTSTARmovie.fulfilled]: (state, { payload }) => {
      // console.log("Movie shows from Hotstar fetched");
      return { ...state, hotstar_movie: payload };
    },
    [fetchAsyncHOTSTARmovie.rejected]: () => {
      console.log("Rejected hotstar!");
    },

    [fetchAsyncHOTSTARtv.fulfilled]: (state, { payload }) => {
      // console.log("Tv shows from Hotstar fetched");
      return { ...state, hotstar_tv: payload };
    },
    [fetchAsyncHOTSTARtv.rejected]: () => {
      console.log("Rejected hotstar!");
    },

    /////////////////////////////////////////////
    [fetchAsyncMoviesDetail.fulfilled]: (state, { payload }) => {
      // console.log("Movie Detail Fetched Successfully!");
      return { ...state, selectMovieOrShow: payload };
    },
    [fetchAsyncShowDetail.fulfilled]: (state, { payload }) => {
      // console.log("Show Detail Fetched Successfully!");
      return { ...state, selectMovieOrShow: payload };
    },
    /////////////////////////////////////////////
    [fetchShowSeasonDetail.fulfilled]: (state, { payload }) => {
      // console.log("Seasons Details Fetched");
      return { ...state, seasons: payload };
    },
    // /////////////////////////////////////////////
    // [fetchAsyncSearch.fulfilled]:(state,{payload}) =>{
    //   console.log('Search Data fetched')
    //   return {...state,searchData:payload}
    // },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getNetflixTV = (state) => state.movies.netflix_tv;
export const getNetflixMovie = (state) => state.movies.netflix_movie;
export const getPrimeTV = (state) => state.movies.primetv;
export const getPrimeMovie = (state) => state.movies.primemovie;
export const getHotstarTV = (state) => state.movies.hotstar_tv;
export const getHotstarMovie = (state) => state.movies.hotstar_movie;
export const getAllSeasons = (state) => state.movies.seasons;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
// export const getSearchData = (state) => state.movies.searchData;
export default movieSlice.reducer;
