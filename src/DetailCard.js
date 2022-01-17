import React from "react";
import { useSelector } from "react-redux";
import { getSelectedMovieOrShow } from "./features/movie/movieSlice";
import styled from "styled-components";

export const DetailCard = () => {
  const data = useSelector(getSelectedMovieOrShow);

  return (
    <DetailContainer>
      <div className="detail-title">
        <h1>Details</h1>
      </div>
      <Detail>
        <hr />
        <div id="origin">
          <h4>Release Date</h4>
          <p>{data.release_date || data.first_air_date}</p>
        </div>
        {/* <hr /> */}
        {data.last_air_date ? (
          <>
            {" "}
            <hr />
            <div id="origin">
              <h4>Last Aired</h4>
              <p>{data.last_air_date} </p>
            </div>
          </>
        ) : (
          <></>
        )}
        {/* <hr/> */}
        {data.status ? (
          <>
            {" "}
            <hr />
            <div id="origin">
              <h4>Status</h4>
              <p>{data.status} </p>
            </div>
          </>
        ) : (
          <></>
        )}
        <hr />
        <div id="origin">
          <h4>Avg. Runtime</h4>
          <p>{data.runtime || data.episode_run_time} minutes</p>
        </div>

        <hr />

        <div id="origin">
          <h4>Countries of origin</h4>
          {data &&
            data.production_countries.map((item) => {
              return <p>{item.name}</p>;
            })}
        </div>
        <hr />
        <div id="origin">
          <h4>Language</h4>
          {data &&
            data.spoken_languages.map((item) => {
              return <p>{item.english_name}</p>;
            })}
        </div>
        <hr />
        <div id="origin">
          <h4>Production Companies</h4>
          {data &&
            data.production_companies.map((item) => {
              return <p>{item.name}</p>;
            })}
        </div>
        <hr />
      </Detail>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  padding: 70px 0px 30px 0px;

  .detail-title {
    display: flex;
    padding: 2px 0px 5px 20px;
  }

  #origin {
    display: flex;
    height: 40px;
    ${"" /* padding:12px 0px 0px 0px; */}
    p,h4 {
      padding: 5px;
    }
  }
`;

const Detail = styled.div`
  width: 65vw;
  margin-left: 20px;
`;
