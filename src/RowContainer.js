import React from "react";
import requests from "./requests";
import Row from "./Row";
import "./Row.css";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect,useState } from "react";
import { fetchAsyncMovies ,fetchAsyncTV, getAllMovies, getAllShows, getPrimeVideos, getPrimeVideosM} from "./features/movie/movieSlice";

export default function RowContainer() {

  const [tv,setTv] = useState(false);
  const dispatch = useDispatch();
  const showdata = useSelector(getAllShows) ;
  const moviedata= useSelector(getAllMovies);
  const primedata = useSelector(getPrimeVideos);
  const primemovie = useSelector(getPrimeVideosM);
  // useEffect(() => {
  //   // dispatch(fetchAsyncMovies());
  //   // dispatch(fetchAsyncTV())
  //   return () => {
     
  //   }
  // }, [dispatch])
  // console.log(showdata)
  return (
    <>
 <div className="Rows">
      <div>
        <button onClick={()=>{
          setTv(true)
          console.log("Tv Button Cliked")
        }}>CLICK TV</button>
        <button onClick={()=>{
          setTv(false)
          console.log("Tv Button Cliked")
        }}>CLICK MOVIE</button>
      </div>
      {
        tv?<Row title="Prime Videos" adata={primedata.results} type='tv' />:
          <Row title="Prime Videos Moive" adata={primemovie.results} type='movie' />

      }
      <Row title="Top Rated Movies" adata={moviedata.results}  type='movie'/>
      <Row title="Netflix Orignals" adata={showdata.results} type='tv' />
      
      
        
      
      

      
      {/* <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} type='movie' />  */}
      {/* <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} type='movie' /> */}
      {/* <Row title="Horror Movies" fetchUrl={requests.fetchTrending } type='movie'/> */}
      {/* <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} type='movie' /> */}
      {/* <Row title="Thriller" fetchUrl={requests.fetchThrillerMovies} type='movie' /> */}
      {/* <Row title="Family" fetchUrl={requests.fetchFamily} type='movie' /> */}
    </div>
    </>
   
  );
}

