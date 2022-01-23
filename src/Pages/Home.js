import React, { useEffect } from "react";
import RowContainer from "../Components/RowContainer";
import { SearchComponent } from "../Components/SearchComponent";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchAsyncMovies,
  fetchAsyncTV,
  fetchAsyncNETFLIXmovie,
  fetchAsyncNETFLIXtv,
  fetchAsyncPRIMEmovie,
  fetchAsyncPRIMEtv,
  fetchAsyncHOTSTARmovie,
  fetchAsyncHOTSTARtv,
} from "../features/movie/movieSlice";


export default function Home() {
  document.title = `MovieDB 🍿`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncNETFLIXtv());
    dispatch(fetchAsyncNETFLIXmovie());
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncPRIMEmovie());
    dispatch(fetchAsyncPRIMEtv());
    dispatch(fetchAsyncHOTSTARtv());
    dispatch(fetchAsyncHOTSTARmovie());
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {};
  }, [dispatch]);

  console.log("j",process.env)

  return (
    <Container>
      <SearchComponent />
      <RowContainer />
    </Container>
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
`;

const Container = styled.div`
background-color:rgb(19,19,19);
padding-bottom:50px;
`;
