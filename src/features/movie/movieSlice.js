import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = "74de71d03e661d70414e23b100e51515";

//   const initialState = {
//     detail:[]
// }

// const movieSlice = createSlice({
//     name:"details",
//     initialState,
//     reducers:{
//         setDetails:(state,action) =>{
//             state.detail = action.payload;
//         }
//     }
// })

// export const {setDetails} = movieSlice.actions;

// export const selectDetails = (state) => state.details.detail;

// export default movieSlice.reducer;


/////////////////////////////////////////////////////////////////
export const fetchAsyncSearch = createAsyncThunk(
    "movies/searchData",
  async (text) =>{
      const response = await axios.get(`
      https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${text} h&page=1&include_adult=false
      `);
      return response.data;

   }
  );

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async () => {
      const response = await axios.get(`
      https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
      );
      return response.data;
    }
  );
  export const fetchAsyncMoviesDetail = createAsyncThunk(
    "movies/fetchAsyncMoviesDetail",
    async (id) => {
      const response = await axios.get(`
      https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      return response.data;
    }
  );
  export const fetchAsyncTV = createAsyncThunk(
    "TV/fetchAsyncTV",
    async()=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213&watch_region=IN`
      );
      return response.data;
    }
  );

  export const fetchAsyncPRIMEVIDEOS = createAsyncThunk(
    "TV/fetchAsyncPRIMEVIDEOS",
    async()=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_watch_providers=119&watch_region=IN`
      );
      return response.data;
    }
  );

  export const fetchAsyncPRIMEVIDEOSm = createAsyncThunk(
    "TV/fetchAsyncPRIMEVIDEOSmovies",
    async()=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_watch_providers=119&watch_region=IN`
      );
      return response.data;
    }
  );
  
  export const fetchAsyncShowDetail = createAsyncThunk(
    "movies/fetchAsyncShowDetail",
    async (id) => {
      const response = await axios.get(`
      https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      return response.data;
    }
  );
  export const fetchShowSeasonDetail = createAsyncThunk(
    "movies/fetchShowSeasonDetail",
    async (id) => {
      const response = await axios.get(`
      https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      return response.data.seasons;
    }
  );

  const initialState = {
    movies: {},
    shows:{},
    primevideo:{},
    primevideom:{},
    selectMovieOrShow:{},
    seasons:{},
    searchData:{},
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
        console.log("Pending");
      },
      [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
        console.log("Fetched Successfully!");
        return { ...state, movies: payload };
      },
      [fetchAsyncMovies.rejected]: () => {
        console.log("Rejected!");
      },
      /////////////////////////////////////////////
      [fetchAsyncTV.fulfilled]:(state,{payload})=>{
        console.log("Netflix Orignals Fetched Succesfully")
        return{...state,shows:payload};
      },
      [fetchAsyncTV.rejected]: () => {
        console.log("Rejected!");
      },
      ////
      [fetchAsyncPRIMEVIDEOS.fulfilled]:(state,{payload})=>{
        console.log("TV shows from PrimeVideos fetched")
        return {...state,primevideo:payload};
      },
      [fetchAsyncPRIMEVIDEOS.rejected]: () => {
        console.log("Rejected PRIMEVIDEOS!");
      },
      [fetchAsyncPRIMEVIDEOSm.fulfilled]:(state,{payload})=>{
        console.log("MOVIES shows from PrimeVideos fetched")
        return {...state,primevideom:payload};
      },
      [fetchAsyncPRIMEVIDEOSm.rejected]: () => {
        console.log("Rejected PRIMEVIDEOS!");
      },

      /////////////////////////////////////////////
      [fetchAsyncMoviesDetail.fulfilled]: (state, { payload }) => {
          console.log("Movie Detail Fetched Successfully!");
          return { ...state, selectMovieOrShow: payload };
        }, 
      [fetchAsyncShowDetail.fulfilled]: (state, { payload }) => {
          console.log("Show Detail Fetched Successfully!");
          return { ...state, selectMovieOrShow: payload };
      }, 
      /////////////////////////////////////////////
      [fetchShowSeasonDetail.fulfilled]:(state,{payload}) =>{
          console.log('Seasons Details Fetched');
          return {...state,seasons:payload}
      },
      // /////////////////////////////////////////////
      // [fetchAsyncSearch.fulfilled]:(state,{payload}) =>{
      //   console.log('Search Data fetched')
      //   return {...state,searchData:payload}
      // },
    },
      
  });

  export const getAllMovies = (state) => state.movies.movies;
  export const getAllShows = (state) => state.movies.shows;
  export const getPrimeVideos = (state) => state.movies.primevideo;
  export const getPrimeVideosM = (state) => state.movies.primevideom;
  export const getAllSeasons = (state) => state.movies.seasons;
  export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
  // export const getSearchData = (state) => state.movies.searchData;
  export default movieSlice.reducer;

