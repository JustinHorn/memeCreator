import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import IntroPage from "./components/IntroPage";
import MemeEditor from "./components/MemeEditor";
import MemeTypes from "./components/MemeTypes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/memetypes/:memetype">
          <MemeEditor />
        </Route>
        <Route path="/memetypes">
          <MemeTypes />
        </Route>
        <Route path="/">
          <IntroPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
