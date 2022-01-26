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

const types = ["MOVIE", "TV"];
export default function RowContainer() {
  const [style, setStyle] = useState("");
  const [active, setActive] = useState(types[1]);
  const [netflix_tv, setNetflix_tv] = useState(types[1]);
  const [hotstar_tv, setHotstar_tv] = useState(types[1]);
  const dispatch = useDispatch();
  const showdata = useSelector(getNetflixTV);
  const netflix_movie = useSelector(getNetflixMovie);
  const moviedata = useSelector(getAllMovies);
  const primedata = useSelector(getPrimeTV);
  const primemovie = useSelector(getPrimeMovie);
  const hotstar_moviedata = useSelector(getHotstarMovie);
  const hotstar_tvdata = useSelector(getHotstarTV);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  });

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
          <div className="content-type-selector">
            {types.map((type) => (
              <Tab
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
              >
                <h4>{type}</h4>
              </Tab>
            ))}
          </div>

          {active == "TV" ? (
            <Row title="Prime Videos" adata={primedata.results} type="tv" />
          ) : (
            <Row
              title="Prime Videos Moive"
              adata={primemovie.results}
              type="movie"
            />
          )}
        </PrimeVideoContainer>

        <LazyLoad offset={150}>
          <NetflixContainer>
            <div className="contentprovider-header">
              <h2>NETFLIX</h2>
            </div>

            <div className="content-type-selector">
              {types.map((type) => (
                <Tab
                  key={type}
                  active={netflix_tv === type}
                  onClick={() => setNetflix_tv(type)}
                >
                  <h4>{type}</h4>
                </Tab>
              ))}
            </div>
            {netflix_tv == "TV" ? (
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

        <LazyLoad offset={150}>
          <HotstarContainer>
            <div className="contentprovider-header">
              <h2>HOTSTAR</h2>
            </div>
            <div className="content-type-selector">
              {types.map((type) => (
                <Tab
                  key={type}
                  active={hotstar_tv === type}
                  onClick={() => setHotstar_tv(type)}
                >
                  <h4>{type}</h4>
                </Tab>
              ))}
            </div>
            {hotstar_tv == "TV" ? (
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
        <LazyLoad offset={50}>
          <TopRated>
            <div className="contentprovider-header">
              <h2>Top Rated Movies</h2>
            </div>
            <Row
              title="Top Rated Movies"
              adata={moviedata.results}
              type="movie"
            />
          </TopRated>
        </LazyLoad>

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
const TopRated = styled.div`
  margin-top: 20px;
`;

const Tab = styled.button`
  border-radius: 3px;
  padding: 10px 30px;
  margin: 4px 5px 4px 5px;
  cursor: pointer;
  opacity: 0.6;
  background: pink;
  border: 0;
  outline: 0;
  h4 {
    font-size: 15px;
    ${"" /* padding:1px; */}
  }

  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
  background-color:green;
  font-color:white
  h4{
    color:red
  }
`}
`;

const MainContainer = styled.div`
  background-color: rgb(19, 19, 19);
  padding: 0 calc(2vw + 10px);
  color: white;

  .content-type-selector {
    display: flex;
    margin-left: 41px;
  }

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

const PrimeVideoContainer = styled.div`
  margin-top: 20px;
`;

const NetflixContainer = styled.div`
  margin-top: 20px;
`;

const HotstarContainer = styled.div`
  margin-top: 20px;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
