import React from "react";
import styled from "styled-components";
import { GoMarkGithub } from "react-icons/go";

export const Footer = () => {
  return (
    <Container>
      <FooterCard>
        <Padder>
          <Title>
            <div className="title">
              <h3>MovieDB</h3>
              <h5>
                {" "}
                <a
                  target="_blank"
                  href="https://github.com/himanksuiwala/project-movieDB-redux"
                >
                  <GoMarkGithub />
                </a>
              </h5>
            </div>
            <div className="tagline">
              <h4>Your one stop destination for metadata of movies & shows</h4>
            </div>
          </Title>
          <TMDB>
            <div className="tmdb">
              <div className="tmdb-title"></div>
              <p><i><b>Data provided by</b></i></p>
              <div className="tmdb-image">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
              </div>
            </div>
          </TMDB>
        </Padder>
        <Signature>
          <span>Made with 💗 by Himank Suiwala </span>
          <p>
            {" "}
            <a target="_blank" href="https://github.com/himanksuiwala/">
              <GoMarkGithub />
            </a>
          </p>
        </Signature>
      </FooterCard>
    </Container>
  );
};
const TMDB = styled.div`
  .tmdb {
    padding: 10px 10px 3px 10px;
  }
  p {
    padding-bottom: 5px;
  }

  .tmdb-image {
    padding-top: 2px;
    padding-left:5px;
    width: 120px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
const Padder = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Signature = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  span {
    line-height: 170%;
    padding-left: 5px;
  }
  p {
    padding-top: 4px;
    padding-left: 7px;
  }
`;

const Container = styled.div`
  background: rgb(9, 11, 19);
  height: 32vh;
  padding: 0 calc(2vw + 10px);
  h3 {
    line-height: 100%;
  }
  a,
  a:hover,
  a:active,
  a:visited {
    color: white;
  }
`;

const FooterCard = styled.div`
  background-color: rgb(9, 11, 19);
  color: white;
  height: 30vh;
  padding: 10px;
`;

const Title = styled.div`
  width: 600px;
  .header {
  }
  .tagline {
    padding: 10px;
    display: flex;
  }
  .title {
    display: flex;
  }
  h5 {
    line-height: 180%;
    padding-left: 10px;
  }
`;
