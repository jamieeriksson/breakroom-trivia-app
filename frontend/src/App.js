import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LandingView} />
          {/* <Route path="/add" component={FormView} /> */}
          <Route path="/play" component={TriviaQuiz} />
          <Route component={LandingView} />
        </Switch>
      </Router>
    );
  }
}

export default App;
