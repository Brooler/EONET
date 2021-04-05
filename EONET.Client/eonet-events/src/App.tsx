import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { EventsList } from "./containers/EventsList/EventsList";
import { EventDetails } from "./containers/EventDetails/EventDetails";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <EventsList></EventsList>
      </Route>
      <Route path="/event" component={EventDetails}></Route>
    </Router>
  );
}

export default App;
