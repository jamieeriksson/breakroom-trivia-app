import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TriviaQuiz from "./components/trivia-quiz.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={TriviaQuiz} />
          {/* <Route path="/" exact component={LandingView} /> */}
          {/* <Route path="/add" component={FormView} /> */}
          {/* <Route path="/play" component={TriviaQuiz} /> */}
          {/* <Route component={LandingView} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
