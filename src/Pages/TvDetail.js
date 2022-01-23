import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import "../Components/Row";
import Spinner from "react-spinkit";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Youtube from "react-youtube";
import "../public/Row.css";
import Cast from "../Components/Cast";
import { useDispatch, useSelector } from "react-redux";
import { DetailCard } from "../Components/DetailCard";
import { setCast } from "../features/movie/castSlice";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  fetchAsyncShowDetail,
  getSelectedMovieOrShow,
} from "../features/movie/movieSlice";
export default function TvDetail() {
  const [trailer, setTrailer] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const dispatch = useDispatch();
  // const baseUrl = "https://image.tmdb.org/t/p/original";
  const baseUrl = "https://ik.imagekit.io/1aafk6gx3bk/poster-image/";

  const detail = useSelector(getSelectedMovieOrShow);

  function doctitle(title) {
    document.title = `${title} (TV Series)`;
  }

  {
    detail && doctitle(detail.original_title || detail.name);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const fetchData = async () => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=74de71d03e661d70414e23b100e51515&language=en-US`
      )
      .catch((e) => {
        console.log("error in fetching");
      });
    dispatch(setCast(response.data.cast));
  };

  const fetchTrailer = async (id) => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=74de71d03e661d70414e23b100e51515&language=en-US`
      )
      .catch((e) => {
        console.log("error in fetching");
      });
    setTrailer(response.data.results);
  };

  useEffect(() => {
    fetchData();
    fetchTrailer(id);
    dispatch(fetchAsyncShowDetail(id));
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(false), 3500);
  }, [dispatch, id]);

  const genre = detail.genres;

  var year = new Date(detail.first_air_date).getFullYear();
  var lastyear = new Date(detail.last_air_date).getFullYear();

  const trailers = trailer.filter((item) => item.type === "Trailer");

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <Spinner name="line-spin-fade-loader" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <>
      <Container>
        <div className="background">
          <img src={`${baseUrl}${detail.backdrop_path}`} />
        </div>
        <Detail>
          <ImageTitle>
            <img src={`${baseUrl}${detail.poster_path}`} />
          </ImageTitle>
          <Description>
            <Title>
              <div className="title">
                <h1> {detail.original_title || detail.name} </h1>
              </div>
              <div className="year">{<p>({year})</p>}</div>
            </Title>
            <Rating>
              <div className="release">
                <p>{detail.release_date}</p>
              </div>
              <div className="genre">
                {detail.genres &&
                  genre.map((g) => {
                    return (
                      <div key={g.id} className="genre-type">
                        <span>•</span>
                        <span>{g.name}</span>
                      </div>
                    );
                  })}
              </div>
            </Rating>
            <Tagline>
              <p>
                <i>{detail.tagline}</i>
              </p>
            </Tagline>
            <Overview>
              <p className="Title">Overview</p>
              <p className="content">{truncate(detail?.overview, 250)}</p>
            </Overview>
            <Credit>
              <div className="container">
                <div className="director">
                  <h4>Creator</h4>
                  {detail.created_by.map((item) => {
                    return (
                      <div key={item.id}>
                        <span>•</span>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Credit>
          </Description>
        </Detail>
      </Container>
      <Container2>
        <div className="cast">
          <Cast />
        </div>
      </Container2>
      <LowerContainer>
        <CastContainer>
          <Card>
            <div className="card">
              <div className="Header">
                {/* <span><MdOutlineArrowForwardIos/></span> */}
                <h1>Last Aired</h1>
              </div>
              {detail.seasons && (
                <LastSeason>
                  <div className="season-container">
                    <div className="season-poster">
                      <img
                        src={`${baseUrl}${
                          detail.seasons[detail.seasons.length - 1].poster_path
                        }`}
                      />
                    </div>
                    <div className="season-detail">
                      <div className="season-name">
                        <h3>
                          {detail.seasons[detail.seasons.length - 1].name}
                        </h3>
                      </div>
                      <div className="episode-count">
                        <p>{lastyear}</p>
                        <p>|</p>
                        <p>
                          {
                            detail.seasons[detail.seasons.length - 1]
                              .episode_count
                          }{" "}
                          Episodes
                        </p>
                      </div>
                      <div className="seasons-data">
                        <p>
                          {truncate(
                            detail.seasons[detail.seasons.length - 1]?.overview,
                            200
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="all-season">
                    <Link
                      to={{
                        pathname: `/tv/${detail.id}/seasons`,
                      }}
                    >
                      {" "}
                      <div className="redirect">
                        <span>
                          <MdOutlineArrowForwardIos />
                        </span>
                        <h3>View All Seasons</h3>
                      </div>
                    </Link>
                  </div>
                </LastSeason>
              )}
            </div>
          </Card>
        </CastContainer>
        <Padder>
          <DetailCard />
        </Padder>
        {trailers[0] ? (
          <Container3>
            <div className="trailer-title">
              {/* <span><MdOutlineArrowForwardIos/></span> */}
              <h1>Trailer</h1>
            </div>
            <div className="trailer">
              <Youtube videoId={trailers[0].key} opts={opts} />
            </div>
          </Container3>
        ) : (
          ""
        )}
      </LowerContainer>
    </>
  );
}

const LastSeason = styled.div`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  a,
  a:hover,
  a:active,
  a:visited {
    color: black;
    text-decoration: none;
  }
`;

const Card = styled.div`
  padding-left: 20px;
  .card {
    background-color: #eeeeee;
    border-radius: 10px;
  }
`;

const Credit = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 50px;
  margin-left: 40px;

  .container {
    height: 50px;
    display: flex;
    padding: 5px;
  }

  .director {
    margin: 2px 20px 2px 5px;
  }

  .writer {
    margin: 2px 20px 2px 20px;
  }
  span {
    margin: 5px;
    font-size: 18px;
    line-height: 10px;
  }

  font-size: 18px;
`;

const Padder = styled.div``;

const LowerContainer = styled.div`
  background-color: white;
  padding: 0 calc(3.5vw + 10px);
`;

const CastContainer = styled.div`
  width: 70vw;
  padding-top: 30px;

  .season-container {
    display: flex;
    padding-left: 2px;
  }
  .season-poster {
    height: 200px;
    width: 180px;
    padding: 5px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }

  .season-name {
    margin-top: 10px;
    padding: 5px;
    padding-left: 10px;
    font-size: 22px;
    display: flex;
  }
  .seasons-data {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    content: justify;
    text-align: justify;
  }

  .episode-count {
    margin-top: 10px;
    display: flex;
    padding: 5px;
    padding-left: 5px;
    p {
      margin: 5px;
    }
  }

  .all-season {
    padding: 10px;
    height: 20px;
  }
  .Header {
    display: flex;
    padding: 2px 0px 5px 3px;
    span {
      font-size: 30px;
      padding-top: 7px;
      font-weight: bold;
    }
  }

  .redirect {
    h3,
    h3:link,
    h3:visited,
    h3:active {
      color: black;
      text-decoration: border;
      cursor: cursor;
      font-weight: 550;
    }
    display: flex;

    span {
      padding-top: 5px;
    }
  }
`;

const Container2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 calc(3.5vw + 10px);
  padding-top: 50px;
  background: white;
`;

const Container3 = styled.div`
  margin-top: 20px;
  padding: 2px 0px 35px 20px;
  .trailer-title {
    display: flex;
  }

  .trailer {
    margin-top: 10px;
    width: 52vw;
  }
`;

const Overview = styled.div`
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 50px;
  padding-right: 100px;
  p {
    margin-left: 9px;
    text-align: justify;
  }

  .Title {
    font-size: 20px;
    font-weight: 650;
    margin-bottom: 20px;
  }
  .content {
    font-size: 18px;
  }
`;

const Tagline = styled.div`
  margin-left: 40px;
  margin-top: 30px;
  text-align: left;
  margin-right: 50px;
  padding: 02px;

  p {
    font-size: 21px;
    margin-left: 9px;
  }
`;

const Rating = styled.div`
  margin-left: 40px;
  display: flex;
  margin-right: 50px;
  margin-top: 57px;
  span {
    font-weight: bold;
    font-size: 17px;
    padding: 0px 2px 0px 2px;
  }
`;

const Title = styled.div`
  display: flex;
  margin-right: 50px;
  flex-direction: row;
  margin-left: 40px;
  margin-top: 42px;
  h1 {
    line-height: 80%;
  }
  .year {
     {
      /* margin-top: 10px; */
    }
    line-height: 173%;
  }
`;

const Detail = styled.div`
  display: flex;
  margin-top: 60px;
`;

const Description = styled.div`
  width: 100%;
`;

const ImageTitle = styled.div`
  max-width: 350px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Container = styled.div`
  padding: 0 calc(3.5vw + 10px);
  color: white;
  margin-bottom: 50px;
`;
const Details = styled.div`
  h1 {
    color: black;
  }
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
