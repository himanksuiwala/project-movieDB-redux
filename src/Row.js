import React, { useEffect, useState } from "react";
import "./Row.css";
import { Link, NavLink } from "react-router-dom";
import axios from "./axios";
import styled from "styled-components";
import { getAllMovies,getAllShows } from "./features/movie/movieSlice";
import { useSelector } from "react-redux";
export default function Row({ title, adata, type }) {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get(fetchUrl);
  //     setMovies(response.data.results);
  //     return response;
  //   }
  //   fetchData();
  // }, [fetchUrl]);
  const data = useSelector(getAllMovies);
  const movies = adata
  // const showdata = useSelector(getAllShows);
  // console.log("TV",showdata.results)
  // console.log("a",adata) 
  return (
    // <>
    <MovieRow>
      <div className="movie-name" >
        <h2>{title}</h2>
      </div>
        <MoviePosters>
        {movies && movies.map((movie)=>(
            <Wrap key={movie.id}>
            {/* <Link to={{
                pathname:`/${movie.media_type }/${movie.id}`,
                state:movie,
            }}> */}
            {/* //Use LINK Componenet inside a div for better CSS */}
            <Link to={`/${type}/${movie.id}`}>  
            <img
            className="movie-poster"
            src={`${baseUrl}${movie.poster_path}`}
            alt="" />  
            </Link>
          </Wrap>
          ))  
        }
        </MoviePosters>
    </MovieRow>
    // </>
    // <>HELLO</>
  );

  // return(
  //   <div className="row">
  //       <h2>{title}</h2>
  //       <div className="row_posters">
  //       {movies && movies.map((movie) => (
  //         <Link> 
  //           <img
  //             key={movie.id}
  //             className="row_poster"
  //             src={`${baseUrl}${movie.poster_path}`}
  //             alt={movie.name}
  //           />
  //           </Link>
  //       ))}
  //       </div>
  //   </div>

  // )
}

const StyledLink = styled(Link)``;

const Wrap = styled.div`
display:flex;
  flex: 2 0 10%;
`;

const MovieRow = styled.div`
  h2 {
    color: white;
    padding-top: 10px;
    padding-bottom: 1px;
  }
`;

const MoviePosters = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: scroll;
   
  ::-webkit-scrollbar {
    display: none;
}

`;
