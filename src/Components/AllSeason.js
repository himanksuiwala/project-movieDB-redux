import React from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getSelectedMovieOrShow } from "../features/movie/movieSlice";
import { fetchAsyncShowDetail } from "../features/movie/movieSlice";

const AllSeason = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector(getSelectedMovieOrShow);
  const seasonList = data.seasons;
  // const baseUrl = "https://image.tmdb.org/t/p/original";
  const baseUrl = "https://ik.imagekit.io/1aafk6gx3bk/poster-image/";

  useEffect(() => {
    dispatch(fetchAsyncShowDetail(id));
    window.scrollTo(0, 0);
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Container>
      <TopContainer>
        <Poster>{<img src={`${baseUrl}${data.poster_path}`} />}</Poster>
        <Detail>
          <div className="header">
            <h1>{data.title || data.original_name} </h1>
          </div>
          <div className="release">
            <h1>2017</h1>
          </div>
        </Detail>
      </TopContainer>

      {seasonList &&
        seasonList.map((i) => {
          var year = new Date(i.air_date).getFullYear();
          return (
            <div key={i.id}>
              <SeasonContainer key={i.id}>
                <AllseasonList key={i.id}>
                  <div className="poster">
                    <img
                      key={i.id}
                      src={`${baseUrl}tr:w-120px${i.poster_path}`}
                    />
                  </div>
                  <div className="side-container">
                    <div className="header">
                      <h2>{i.name}</h2>
                    </div>
                    <div className="release">
                      {/* <p>Premeired in {year}</p> */}
                      <div className="year-season">
                        <p>
                          {year} | {i.episode_count} Episodes
                        </p>
                      </div>
                    </div>
                    <div className="detail">
                      <p>{truncate(i?.overview, 150)}</p>
                    </div>
                  </div>
                </AllseasonList>
                <hr></hr>
              </SeasonContainer>
            </div>
          );
        })}
    </Container>
  );
};

export default AllSeason;

const SeasonContainer = styled.div``;

const AllseasonList = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;

  .detail {
    margin-top: 12px;
    text-align: justify;
    padding: 3px;
  }
  .side-container {
    margin-left: 25px;
  }
  h2 {
    padding: 4px;
  }

  .header {
    display: flex;
  }
  .release {
    display: flex;
    margin-left: px;
  }
  .year-season {
    margin-top: 5px;
    font-weight: 500;
  }
  .poster {
    max-width: 120px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }
`;

const Detail = styled.div`
  display: flex;

  .header {
    margin-top: 12px;
    margin-left: 17px;
    margin-bottom: 20px;
  }
  .release {
    margin-top: 12px;
    padding: 0px;
    margin-bottom: 20px;
  }
`;
const Container = styled.div`
  background: rgb(219, 231, 231);
  padding: 0 calc(3.5vw + 10px);
`;

const TopContainer = styled.div`
  height: 115px;
  margin-top: 5px;
  display: flex;
`;

const Poster = styled.div`
  padding: 15px;
  width: 60px;
  height: 80px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
