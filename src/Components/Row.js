import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import "../public/Row.css";
import { Link, NavLink } from "react-router-dom";
import Spinner from "react-spinkit";
import styled from "styled-components";
import { getAllMovies } from "../features/movie/movieSlice";
import { useSelector } from "react-redux";
export default function Row({ title, adata, type }) {
  // const baseUrl = "https://image.tmdb.org/t/p/original";
  const baseUrl = "https://ik.imagekit.io/1aafk6gx3bk/poster-image/";

  const [loading, setLoading] = useState(true);
  const [contentloading, setContentLoading] = useState(true);
  const data = useSelector(getAllMovies);
  const movies = adata;
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    setTimeout(() => setContentLoading(false), 2000);
    window.history.scrollRestoration = "manual";
  }, []);
  // const showdata = useSelector(getAllShows);
  // console.log("TV",showdata.results)
  // console.log("a",adata)
  if (loading) {
    return (
      <AppLoading>
        <Spinner name="ball-spin-fade-loader" />
      </AppLoading>
    );
  }

  return (
    // <>
    <MovieRow>
      {/* <div className="movie-name" >
        <h2>{type}</h2>
      </div> */}
      <MoviePosters>
        {movies &&
          movies.map((movie) => {
            return (
              <Wrap key={movie.id}>
                {/* <Link to={{
                pathname:`/${movie.media_type }/${movie.id}`,
                state:movie,
            }}> */}
                {/* //Use LINK Componenet inside a div for better CSS */}
                {loading ? (
                  <Spinner name="circle" />
                ) : (
                  <LazyLoad height={320}>
                    <Link to={`/${type}/${movie.id}`}>
                      <img
                        className="movie-poster"
                        src={`${baseUrl}tr:w-250${movie.poster_path}`}
                        alt=""
                        key={movie.id}
                      />
                    </Link>
                  </LazyLoad>
                )}
              </Wrap>
            );
          })}
      </MoviePosters>
    </MovieRow>
  );

  // return(
  // <div className="row">
  //   <h2>{title}</h2>
  //   <div className="row_posters">
  //     { movies && movies.map((movie) => {
  //       return (
  //         <img
  //         key={movie.id}
  //         className={`row_poster `}
  //         src={`${baseUrl}${movie.id}`}
  //         // alt={movie.name}
  //       />
  //       )

  //     })}
  //   </div>
  // </div>
  // )

  // return(
  //   <div className="row">
  //       <h2>{title}</h2>
  //       <div className="row_posters">
  //       {movies && movies.map((movie) => (
  //         <Link >
  //         <img
  //             key={movie.id}
  //             className="row_poster"
  //             src={`${baseUrl}/tr:w-250${movie.poster_path}`}
  //             alt={movie.name}
  //           />
  //         </Link>

  //       ))}
  //       </div>
  //   </div>

  // )
}

const StyledLink = styled(Link)``;

const Wrap = styled.div`
  display: flex;
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
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 300px;
  width: 100%;
`;
