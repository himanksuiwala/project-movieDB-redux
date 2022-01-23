import "./public/styles.css";
import react from "react";
import Home from "./Pages/Home";
import Navbar from "./app/Navbar";
import { Footer } from "./app/Footer";
import TvDetail from "./Pages/TvDetail";
import MovieDetail from "./Pages/MovieDetail";
import { Search } from "./Pages/Search";
import AllSeason from "./Components/AllSeason";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./Pages/NotFound";

export default function App() {

  // console.log(process.env.REACT_APP_BART_API_KEY)
  // reportWebVitals(console.log);
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
          <Route exact path="/tv/:id/seasons">
            <AllSeason />
          </Route>
          <Route exact path="/movie/:id">
            <MovieDetail />
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
