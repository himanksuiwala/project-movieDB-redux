import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import "./Row";
import Spinner from "react-spinkit";
import Youtube from "react-youtube";
import { DetailCard } from "./DetailCard";
import "./Detail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMoviesDetail,
  getSelectedMovieOrShow,
  setDetails,
} from "./features/movie/movieSlice";
import { setCast } from "./features/movie/castSlice";
import Cast from "./detail-components/Cast";
const MovieDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [crew, setCrew] = useState([]);
  const dispatch = useDispatch();
  const detail = useSelector(getSelectedMovieOrShow);
  const [trailer, setTrailer] = useState([]);
  // const baseUrl = "https://image.tmdb.org/t/p/original"
  const baseUrl = "https://ik.imagekit.io/1aafk6gx3bk/poster-image";

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  /////////////////FOR FETCHING CREDITS AND CAST RELATED DETAILS////////////////////

  const fetchData = async () => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=74de71d03e661d70414e23b100e51515&language=en-US`
      )
      .catch((e) => {
        console.log("error in fetching");
      });
    // console.log("CAST:", response.data);
    dispatch(setCast(response.data.cast));
    setCrew(response.data.crew);
  };

  const fetchTrailer = async () => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=74de71d03e661d70414e23b100e51515&language=en-US`
      )
      .catch((e) => {
        console.log("error in fetching");
      });
    setTrailer(response.data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchTrailer();
    dispatch(fetchAsyncMoviesDetail(id));
    // dispatch(fetchAsyncCasts(id));
    setTimeout(() => setLoading(false), 2000);
  }, [dispatch, id]);

  const director = crew.filter((item) => item.job === "Director");
  const writers = crew.filter(
    (item) => item.job === "Writing" || item.department == "Writing"
  );

  const genre = detail.genres;

  var year = new Date(detail.release_date).getFullYear();

  while (loading) {
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
                <h2> {detail.original_title} </h2>
              </div>
              <div className="year">{<p>({year})</p>}</div>
            </Title>
            <Rating>
              <div className="origin">
                <p>
                  {detail.production_companies &&
                    detail.production_companies[0].origin_country}
                </p>
              </div>
              <div className="genre">
                {detail.genres &&
                  genre.map((g) => {
                    return (
                      <div className="genre-type">
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
              <p className="content">{detail.overview}</p>
            </Overview>
            <Credit>
              <div className="container">
                <div className="director">
                  <h4>Director</h4>
                  <p>{director[0].name}</p>
                </div>
                <div className="writer">
                  <h4>Writers</h4>
                  {writers.map((item) => {
                    return <span>{item.name}</span>;
                  })}
                </div>
              </div>
            </Credit>
          </Description>
        </Detail>
      </Container>
      <LowerContainer>
        <Padder>
          <Container2>
            <div className="cast">
              <Cast />
            </div>
          </Container2>
          <DetailCard />
          <Container3>
            <div className="trailer-title">
              <h1>Trailer</h1>
            </div>
            <div className="trailer">
              <Youtube videoId={trailer} opts={opts} />
            </div>
          </Container3>
        </Padder>
      </LowerContainer>
    </>
  );
};

export default MovieDetail;

const Padder = styled.div`
  padding: 0 calc(3.5vw + 10px);
`;

const LowerContainer = styled.div`
  background-color: white;
`;

const Container3 = styled.div`
  padding: 2px 0px 35px 20px;
  .trailer-title {
    display: flex;
  }

  .trailer {
    margin-top: 10px;
    width: 52vw;
  }
`;
const Container2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  background: white;
`;

const Score = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 50px;
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
  .director,
  .writer {
    margin: 2px 20px 2px 20px;
  }
  span {
    margin: 5px;
    font-size: 18px;
  }
  font-size: 18px;
`;

const Overview = styled.div`
  margin-top: 20px;
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
  margin-top: 50px;
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
  h2 {
    line-height: 90%;
  }
  .year {
     {
      /* margin-top: 10px; */
    }
    line-height: 150%;
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
