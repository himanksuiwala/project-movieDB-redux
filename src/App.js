import "./styles.css";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import TvDetail from "./TvDetail";
import MovieDetail from "./MovieDetail";
import { MoreDetail } from "./detail-components/MoreDetail";
import { Search } from "./Search";
import AllSeason from "./detail-components/AllSeason"
import { HomeContainer } from "./HomeContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        
        <Switch>
          <Route exact path="/search/:searchData">
            <Search />
          </Route>
          <Route exact path="/tv/:id">
            <TvDetail />
          </Route>
          <Route  path="/tv/:id/seasons">
          <AllSeason/>
          </Route>
          <Route path="/movie/:id">
            <MovieDetail />
          </Route>
          {/* <Route path="/:title/:id/credits">
            <MoreDetail/>
          </Route> */}
          <Route path="/">
           <Home></Home>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}
