import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import IntroPage from "./components/IntroPage";
import MemeEditor from "./components/MemeEditor";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/memeCreator/:memeType">
          <MemeEditor />
        </Route>
        <Route path="/memeCreator">
          <IntroPage />
        </Route>
        <Route path="*">
          <Redirect to="/memeCreator"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
