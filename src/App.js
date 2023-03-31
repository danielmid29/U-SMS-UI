import "./App.css";
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import "./assets/css/fonts.css";
import { Component } from "react";
import Navbar from "./components/NavBar";
import RouteComp from "./Route";

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <Router>
          <Navbar />
          <RouteComp />
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
