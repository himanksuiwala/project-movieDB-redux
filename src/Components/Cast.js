import React from "react";
import { selectCasts } from "../features/movie/castSlice";
import { useSelector } from "react-redux";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "../public/Cast.css";
import styled from "styled-components";
const Cast = () => {
  const creditdata = useSelector(selectCasts);
  const castdata = creditdata;
  // const baseUrl = "https://image.tmdb.org/t/p/original"
  const baseUrl = "https://ik.imagekit.io/1aafk6gx3bk/poster-image/";
  return (
    <Container>
      <div>
        <div className="container-title">
          {/* <span><MdOutlineArrowForwardIos/></span> */}
          <h1>Top Billed Cast</h1>
        </div>
        <div className="castcontainer">
          {castdata &&
            castdata.slice(0, 7).map((i) => {
              return (
                <CastCard key={i.id}>
                  <div key={i.id} className="actor">
                    <div className="image-container">
                      {i.profile_path ? (
                        <img
                          key={i.id}
                          className="photo"
                          src={`${baseUrl}/tr:w-175${i.profile_path}`}
                        />
                      ) : (
                        <img
                          className="photo"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          key={i.id}
                        />
                      )}
                    </div>
                    <div className="actor-name">
                      <p>{i.name}</p>
                    </div>
                    <div className="movie-name">
                      <p>{i.character}</p>
                    </div>
                  </div>
                </CastCard>
              );
            })}
        </div>
      </div>
    </Container>
  );
};
export default Cast;

const Container = styled.div`
  .container-title {
    display: flex;
    padding: 2px 0px 5px 20px;
  }
  .castcontainer {
    margin-top: 10px;
  }

  span {
    font-size: 30px;
    padding-top: 7px;
    font-weight: bold;
  }
`;

const CastCard = styled.div`
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 3px #ccc;
  margin: 2px 8px 2px 8px;
  border-radius: 15px;
`;
