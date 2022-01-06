const API_KEY = "74de71d03e661d70414e23b100e51515";
// import {fetchAsyncTV} from './features/movie/movieSlice'


const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchThrillerMovies: `/trending/all/week?api_key=${API_KEY}&with_genres=53`,
  fetchNetflixOrignals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchFamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`
};

export default requests;
