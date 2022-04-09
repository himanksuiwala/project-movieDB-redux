import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const SearchComponent = () => {
  const [term, setTerm] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Searching For", term);
    setTerm("");
  };
  return (
    <Container>
    {/* <div className="search-background">
    <img
          src="https://ik.imagekit.io/1aafk6gx3bk/denise-jans-tV80374iytg-unsplash_EsoRSb1-8.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1647323644958"
          alt=""
        />
    </div>     */}
      <Main>
        <div className="text-container">
          <div className="container">
            <h1>Welcome!</h1>
            <h1>Explore from Millions of movies, shows</h1>
          </div>
        </div>
        <div className="search-bar">
          <form className="form" onSubmit={submitHandler}>
            <input
              id="searchQueryInput"
              type="text"
              value={term}
              placeholder="Search for a movie, tv show..."
              onChange={(e) => setTerm(e.target.value)}
            />
            <Link
              to={{
                pathname: `/search/${term}`,
                state: "Search",
              }}
            >
              <button className="Search-button">
                <BsSearch />
              </button>
            </Link>
          </form>
        </div>
      </Main>
    </Container>
  );
};

const Container = styled.div`

}

`;

const Main = styled.div`
   background-color: #f08d7e;
  ${
    "" /* background: "https://ik.imagekit.io/1aafk6gx3bk/denise-jans-tV80374iytg-unsplash_EsoRSb1-8.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1647323644958" */
  }
  ${'' /* background-image: ("https://ik.imagekit.io/1aafk6gx3bk/denise-jans-tV80374iytg-unsplash_EsoRSb1-8.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1647323644958") */}
  color: white;
  height: 455px;

  .text-container {
    padding-left: 250px;
    display: flex;
  }

  .container {
    h1 {
      display: flex;
      font-size: 59px;
    }
    margin-top: 60px;
  }
  .search-bar {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    margin: 5 calc(12vw + 10px);
    margin-top: 30px;
  }
  #searchQueryInput {
    width: 50vw;
    height: 3.8rem;
    background: #e2bab1;
    outline: none;
    border: none;
    border-radius: 2.625rem;
    padding: 0 3.5rem 0 1.5rem;
    font-size: 1rem;
  }

  .Search-button {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 1px none;
    margin: 5px;
    background: #acaec5;
  }
  .Search-button:after {
    content: "";
    position: absolute;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
`;
