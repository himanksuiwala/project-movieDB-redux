import React, { useEffect } from "react";
import Banner from "./Banner";
import axios from "axios";
import RowContainer from "./RowContainer";
import { SearchComponent } from "./SearchComponent";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setsearchData } from "./features/movie/searchSlice";
import {
  fetchAsyncMovies,
  fetchAsyncTV,
  fetchAsyncNETFLIXmovie,
  fetchAsyncNETFLIXtv,
  fetchAsyncPRIMEmovie,
  fetchAsyncPRIMEtv,
  fetchAsyncHOTSTARmovie,
  fetchAsyncHOTSTARtv
} from "./features/movie/movieSlice";
const API_KEY = "74de71d03e661d70414e23b100e51515";

export default function Home() {
  const [term, setTerm] = useState("");
  //   const submitHandler =(e)=>{
  //     e.preventDefault();
  //     fetchsearch(term);
  //   setTerm("");
  // }

  const dispatch = useDispatch();
  const fetchsearch = async (term) => {
    const response = await axios
      .get(
        `
  https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false
  `
      )
      .catch((e) => {
        console.log("Error fetching Search Data");
      });
    dispatch(setsearchData(response.data));
  };

  useEffect(() => {
    dispatch(fetchAsyncNETFLIXtv());
    dispatch(fetchAsyncNETFLIXmovie());
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncPRIMEmovie());
    dispatch(fetchAsyncPRIMEtv());
    dispatch(fetchAsyncHOTSTARtv());
    dispatch(fetchAsyncHOTSTARmovie());

    // fetchsearch();
    // dispatch(fetchAsyncSearch("Money"));
    return () => {};
  }, [dispatch]);
  return (
    <>
      {/* <Banner /> */}
      <SearchComponent />
      {/* <Main>
        <div classname ='container'>
        <h1>Search component</h1>
        </div>
        <div className="search-bar">
            <form onSubmit={submitHandler}>
                <input type="text"
                value={term}
                placeholder="search Movies or Shows"
                onChange = {(e)=>setTerm(e.target.value)}
                />
                <Link to={{
                    pathname:"/search",
                    // state:data,
                }}>
                <button>Search</button>
                </Link>
            </form>
        </div>
        </Main> */}
      <RowContainer />
    </>
  );
}

const Main = styled.div`
  background-color: red;
  color: white;
  height: 300px;
  .container {
    color: green;
    padding: 100px;
  }
  ${"" /* margin-top:50px; */}
`;
