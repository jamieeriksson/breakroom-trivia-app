import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TriviaQuiz from "./components/trivia-quiz.js";
import ScoreView from "./components/score-view.js";
import LandingView from "./components/landing-page.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LandingView} />
          <Route path="/score" component={ScoreView} />
          {/* <Route path="/" exact component={LandingView} /> */}
          <Route path="/play" component={TriviaQuiz} />
          {/* <Route component={LandingView} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
