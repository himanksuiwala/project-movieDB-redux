import React, { lazy, Suspense } from "react";
import requests from "../requests";
import Row from "./Row";
import "../public/Row.css";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import Spinner from "react-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAsyncMovies,
  fetchAsyncTV,
  getAllMovies,
  getNetflixMovie,
  getNetflixTV,
  getPrimeMovie,
  getPrimeTV,
  getHotstarMovie,
  getHotstarTV,
} from "../features/movie/movieSlice";

// const Row = lazy(() => import("./Row"));

export default function RowContainer() {
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(true);
  const [tvloading, movieLoading] = useState(true);
  const [prime_tv, setPrime_tv] = useState(false);
  const [netflix_tv, setNetflix_tv] = useState(false);
  const [hotstar_tv, setHotstar_tv] = useState(false);
  const dispatch = useDispatch();
  const showdata = useSelector(getNetflixTV);
  const netflix_movie = useSelector(getNetflixMovie);
  const moviedata = useSelector(getAllMovies);
  const primedata = useSelector(getPrimeTV);
  const primemovie = useSelector(getPrimeMovie);
  const hotstar_moviedata = useSelector(getHotstarMovie);
  const hotstar_tvdata = useSelector(getHotstarTV);

  useEffect(() => {
    // setTimeout(() => setLoading(false), 2000)
    window.history.scrollRestoration = "manual";
  });

  function handleClick(e) {
    // classList.toggle("strikeThrough");
    e.target.classList.toggle("strikeThrough");
    console.log("I'm Clc", e);
  }

  function tvsetter(e) {
    setPrime_tv(true);
    // e.target.classList.toggle("strikeThrough");
  }
  function moviesetter(e) {
    tvclick(e);
    // e.target.classList.toggle("strikeThrough");
    // e.target.classList.toggle("none");
  }

  // function antihandleClick(e) {
  //   classList.toggle("strikeThrough");
  //   // e.target.classList.toggle("none");
  //   console.log("I'm was ");
  // }

  return (
    <MainContainer>
      <div className="header">
        <h1>Explore Movies & TV shows</h1>
      </div>
      <div className="Rows">
        <PrimeVideoContainer>
          <div className="contentprovider-header">
            <h2>PRIME VIDEO</h2>
          </div>
          <div className="toggle">
            <span
              className="tochange"
              onClick={(e) => {
                setPrime_tv(true);
                // tvsetter(e);
                // tvclick(e);
                // antimovieclick(e)
                // antihandleClick(e);
                // setTimeout(() => tvloading(false), 3000);
                // setStyle("cont2");
              }}
            >
              TV
            </span>
            <span
              className="tochange"
              onClick={(e) => {
                setPrime_tv(false);
                // moviesetter(e);
                // handleClick(e);
                // antitvclick(e)
                // movieclick(e);
                // antihandleClick(e);
                // setTimeout(() => movieLoading(false), 3000);

                // console.log("Tv Button Cliked");
                // setTimeout(() => setLoading(false), 2000)
                // setStyle("cont2");
              }}
            >
              MOVIE
            </span>
          </div>

          {/* {prime_tv ? 
          (
            loading?
              <Spinner name="circle" />:
            <Row title="Prime Videos" adata={primedata.results} type="tv" />
          ) : (
            loading?<Spinner name="circle" />:
            <Row
              title="Prime Videos Moive"
              adata={primemovie.results}
              type="movie"
            />
          )} */}

          {/* {prime_tv ? (
            !tvloading ? (
              <Spinner name="ball-spin-fade-loader" />
            ) : (
              <Row title="Prime Videos" adata={primedata.results} type="tv" />
            )
          ) : !movieLoading ? (
            <Spinner name="ball-spin-fade-loader" />
          ) : (
            <Row
              title="Prime Videos Moive"
              adata={primemovie.results}
              type="movie"
            />
          )} */}

          {prime_tv ? (
            <Row title="Prime Videos" adata={primedata.results} type="tv" />
          ) : (
            <Row
              title="Prime Videos Moive"
              adata={primemovie.results}
              type="movie"
            />
          )}
        </PrimeVideoContainer>

        <LazyLoad>
          <NetflixContainer>
            <div className="contentprovider-header">
              <h2>NETFLIX</h2>
            </div>
            <div className="toggle">
              <span
                onClick={() => {
                  setNetflix_tv(true);
                  handleClick;
                }}
              >
                TV
              </span>
              <span
                onClick={() => {
                  setNetflix_tv(false);
                }}
              >
                Movie
              </span>
            </div>

            {netflix_tv ? (
              <Row title="Netflix TV" adata={showdata.results} type="tv" />
            ) : (
              <Row
                title="Netflix Movies"
                adata={netflix_movie.results}
                type="movie"
              />
            )}
          </NetflixContainer>
        </LazyLoad>

        <LazyLoad>
          <HotstarContainer>
            <div className="contentprovider-header">
              <h2>HOTSTAR</h2>
            </div>
            <div className="toggle">
              <span
                onClick={() => {
                  setHotstar_tv(true);
                }}
              >
                TV
              </span>
              <span
                onClick={() => {
                  setHotstar_tv(false);
                }}
              >
                Movie
              </span>
            </div>

            {hotstar_tv ? (
              <Row
                title="Hotstar TV"
                adata={hotstar_tvdata.results}
                type="tv"
              />
            ) : (
              <Row
                title="Hotstar Movies"
                adata={hotstar_moviedata.results}
                type="movie"
              />
            )}
          </HotstarContainer>
        </LazyLoad>

        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <LazyLoad>
          <Row
            title="Top Rated Movies"
            adata={moviedata.results}
            type="movie"
          />
        </LazyLoad>

        {/* </Suspense> */}

        {/* <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} type='movie' />  */}
        {/* <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} type='movie' /> */}
        {/* <Row title="Horror Movies" fetchUrl={requests.fetchTrending } type='movie'/> */}
        {/* <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} type='movie' /> */}
        {/* <Row title="Thriller" fetchUrl={requests.fetchThrillerMovies} type='movie' /> */}
        {/* <Row title="Family" fetchUrl={requests.fetchFamily} type='movie' /> */}
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: rgb(19, 19, 19);
  padding: 0 calc(2vw + 10px);
  color: white;
  .header {
    padding: 50px 0px 10px 30px;
    display: flex;
  }
  .tochange:hover {
    text-decoration: underline;
  }

  span {
    transition: all 0.5s ease;
    color: #fff;
    font-family: "Montserrat", sans-serif;
    text-align: center;
    line-height: 1;
    font-size: 17px;
    background-color: transparent;
    padding: 10px;
    outline: none;
    border-radius: 4px;
  }
  .toggle {
    display: flex;
    padding: 5px 0px 0px 40px;
  }
  .contentprovider-header {
    display: flex;
    padding: 7px 0px 7px 45px;
  }

  .option2 {
    span {
      text-decoration: underline;
    }

    .cont2 {
      width: 250px;
      height: 250px;
      margin-top: 50px;
      margin-left: 150px;
      background-color: yellow;
    }
    .cont {
      width: 250px;
      height: 250px;
      margin-top: 50px;
      margin-left: 150px;
      background-color: violet;
    }
  }
`;

const PrimeVideoContainer = styled.div``;

const NetflixContainer = styled.div``;

const HotstarContainer = styled.div``;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
