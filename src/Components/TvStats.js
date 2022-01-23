import React from "react";
import { useSelector } from "react-redux";
import { getSelectedMovieOrShow } from "../features/movie/movieSlice";
import styled from "styled-components";

const TvStats = () => {
  const data = useSelector(getSelectedMovieOrShow);
  // console.log(data)
  return (
    <Container>
      <div className="Header">
        <h3>Facts</h3>
      </div>
      <div className="status">
        <h4>Status</h4>
        <p>{data.status}</p>
      </div>
      <div className="networks">
        <h4>Available on</h4>
        {data.networks &&
          data.networks.map((item) => {
            return (
              <div key={data.id} className="network-Image">
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                />
              </div>
            );
          })}
      </div>
      <div className="language">
        <h4>Orignal Language</h4>
        {data.spoken_languages &&
          data.spoken_languages.map((i) => {
            return <p>{i.english_name}</p>;
          })}
      </div>
    </Container>
  );
};

export default TvStats;

const NetworkImage = styled.div`
  height: 70px;
  width: 150px;
  img {
    max-width: 100%;
    max-height: 100%;
    padding: 5px;
  }
`;

const Container = styled.div`
  background: blue;
  width: 20vw;
  margin-left: 30px;
  .Header {
    padding: 10px;
  }
  .status {
    margin-top: 20px;
    padding: 10px;
  }
  .networks {
    margin-top: 20px;
    padding: 10px;
  }
  .network-Image {
    height: 60px;
    width: 155px;

    margin-top: 6px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .language {
    margin-top: 20px;
    padding: 10px;
  }
`;
