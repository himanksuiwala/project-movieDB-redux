import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const NotFound = () => {
  return (
    <>
      <Header>
        {/* <div className="header">
        <h2>What are you doin' here ?</h2>
    </div> */}
      </Header>
      <Container>
        <Link to={"/"}>
          <div className="image">
            <img
              src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
              alt="Not Found"
            />
          </div>
        </Link>
      </Container>
    </>
  );
};
const Header = styled.div``;

const Container = styled.div`
  display: flex;
  background-color: rgb(21, 38, 67);
  align-items: center;
  justify-content: center;
  height: 85vh;
  .image {
    height: auto;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
