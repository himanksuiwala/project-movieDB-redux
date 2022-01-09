import React, { lazy, Suspense } from "react";
import requests from "./requests";
import Row from "./Row";
import "./Row.css";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
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
} from "./features/movie/movieSlice";

// const Row = lazy(() => import("./Row"));

export default function RowContainer() {
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
  // useEffect(() => {
  //   // dispatch(fetchAsyncMovies());
  //   // dispatch(fetchAsyncTV())
  //   return () => {

  //   }
  // }, [dispatch])
  // console.log(showdata)
  return (
    <MainContainer>
      <div className="header">
        <h1>Explore Movies & TV shows</h1>
      </div>
      <div className="Rows">
        <PrimeVideoContainer>
          <button
            onClick={() => {
              setPrime_tv(true);
            }}
          >
            CLICK TV
          </button>
          <button
            onClick={() => {
              setPrime_tv(false);
              console.log("Tv Button Cliked");
            }}
          >
            CLICK MOVIE
          </button>
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
          <button
            onClick={() => {
              setNetflix_tv(true);
            }}
          >
            Netflix_TV
          </button>
          <button
            onClick={() => {
              setNetflix_tv(false);
            }}
          >
            Netflix_Movie
          </button>
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
            <button
              onClick={() => {
                setHotstar_tv(true);
              }}
            >
              Hotstar_TV
            </button>
            <button
              onClick={() => {
                setHotstar_tv(false);
              }}
            >
              Hotstar_Movie
            </button>

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

const MainContainer = styled.div``;

const PrimeVideoContainer = styled.div``;

const NetflixContainer = styled.div``;

const HotstarContainer = styled.div``;
