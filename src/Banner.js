import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import Slider from "react-slick";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [secondmovie, setSecondMovie] = useState([]);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  useState(() => {
    async function fetchData() {
      const request1 = await axios.get(requests.fetchNetflixOrignals);
      const request2 = await axios.get(requests.fetchTopRated);

      setSecondMovie(
        request2.data.results[
          Math.floor(Math.random() * request2.data.results.length)
        ]
      );

      setMovie(
        request1.data.results[
          Math.floor(Math.random() * request1.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  return (
    // <BannerContent>
    //
    // <h1 className="banner_title">
    //     {movie?.title || movie?.name || movie?.original_name}
    //   </h1>

    <Carousel {...settings}>
      <h1 className="banner_title">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <Wrap>
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backdropPosition: "center center"
          }}
        />
      </Wrap>
      <Wrap>
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${secondmovie?.backdrop_path}")`,
            backdropPosition: "center center"
          }}
        />
      </Wrap>
    </Carousel>
  );
}

const BannerContent = styled.div`
  color: black;
  background: black;
`;

const Carousel = styled(Slider)`
  background: black;

  padding-bottom: -10px;
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
`;

const Wrap = styled.div`
  cursor: pointer;
  img {
    border: 4px solid transparent;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
  }
`;
