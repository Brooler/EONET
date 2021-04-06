import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
