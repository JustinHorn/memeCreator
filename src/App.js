import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import IntroPage from "components/IntroPage";
import MemeEditor from "components/MemeEditor";

import { AuthContextProvider } from "context/Auth";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/:memeType">
              <MemeEditor />
            </Route>
            <Route path="/">
              <IntroPage />
            </Route>
            <Route path="*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
