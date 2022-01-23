import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "react-spinkit";
import { setsearchData } from "../features/movie/searchSlice";
import { selectSearchData } from "../features/movie/searchSlice";
const API_KEY = "74de71d03e661d70414e23b100e51515";

export const Search = () => {
  const [loading, setLoading] = useState(true);
  const searchList = useSelector(selectSearchData);
  const dispatch = useDispatch();
  const { searchData } = useParams();
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const fetchsearch = async (term) => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false `
      )
      .catch((e) => {
        console.log("Error fetching Search Data");
      });
    dispatch(setsearchData(response.data.results));
  };

  function doctitle(title) {
    document.title = `Search - MovieDB`;
  }

  doctitle(searchData);

  useEffect(() => {
    fetchsearch(searchData);
    window.history.scrollRestoration = "manual";
    setTimeout(() => setLoading(false), 3000);
    window.scrollTo(0, 0);
  }, []);

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
      <Header>
        <div>
          <h1>
            Search Results for <span>"{searchData}"</span>
          </h1>
        </div>
      </Header>
      <SearchList>
        {searchList.length == 0 ? (
          <NoData>
            <div className="header">
              <h1>😞</h1>
              <h2>Oopsie ! No Search Data Found</h2>
            </div>
          </NoData>
        ) : (
          searchList &&
          searchList.map((item) => {
            if (item.poster_path != null) {
              return (
                <SearchItem key={item.id}>
                  <div className="container">
                    <div className="poster">
                      <Link to={`/${item.media_type}/${item.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        />
                      </Link>
                    </div>
                    <div className="side-container">
                      <div className="title">
                        <h5>{item.title || item.name}</h5>
                        <p>
                          (
                          {new Date(item.release_date).getFullYear() ||
                            new Date(item.first_air_date).getFullYear()}
                          )
                        </p>
                      </div>
                      <div className="detail">
                        <p>{truncate(item.overview, 200)}</p>
                      </div>
                    </div>
                  </div>
                </SearchItem>
              );
            }
          })
        )}
      </SearchList>
    </>
  );
};

const Header = styled.div`
  margin-top: 15px;
  h1 {
    font-weight: 600;
  }
  span {
    font-weight: 300;
  }
`;
const SearchList = styled.div`
  margin-bottom: 50px;
`;
const NoData = styled.div`
  height: 80vh;
  display: flex;
  h1 {
    font-size: 130px;
    padding: 10px;
  }
  align-items: center;
  justify-content: center;
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

const SearchItem = styled.div`
  padding: 0 calc(12vw + 10px);
  .poster {
    max-width: 120px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }

  .container {
    border: 0.5px solid grey;
    border-radius: 12px;
    padding: 5px;
    margin: 10px;
    display: flex;
  }

  .title {
    display: flex;
    p {
      font-weight: normal;
      font-size: 25px;
      margin:0px 5px 0px 5px;
    }
  }

  .side-container {
    margin: 0px 5px 0px 12px;
  }
  .detail {
    margin-top: 6px;
    text-align: justify;
    padding: 3px 9px 9px 9px;
  }
`;
