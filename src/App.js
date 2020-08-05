import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import IntroPage from "./components/IntroPage";
import MemeEditor from "./components/MemeEditor";
import MemeEditor2 from "./components/MemeEditor2";

import MemeTypes from "./components/MemeTypes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/memeCreator/memetypes/test/editor2">
          <MemeEditor2 />
        </Route>
        <Route path="/memeCreator/memetypes/:memeType">
          <MemeEditor />
        </Route>
        <Route path="/memeCreator/memetypes">
          <MemeTypes />
        </Route>
        <Route path="/memeCreator">
          <IntroPage />
        </Route>
        <Route path="/"></Route>
      </Switch>
    </Router>
  );
}

export default App;
