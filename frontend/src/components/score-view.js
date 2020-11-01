import React from "react";
import Header from "./header.js";
import QuestionBg from "./question-bg.js";

class ScoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { score } = this.props.location.state;

      this.setState({
        score: score,
      });
    }
  }

  render() {
    const { score } = this.state;

    return (
      <div className="bg-blue-light w-screen min-h-screen flex flex-col">
        <Header fromQuizView={true} />
        <QuestionBg className="z-0" />
        <div className="flex-grow flex justify-center place-items-center w-screen">
          <div className="z-10 max-w-xl w-full mx-6 py-10 px-6 bg-gray-light rounded-xl flex flex-col">
            <h2 className="self-center font-cursive text-4xl font-bold">
              Your Score:
            </h2>
            <p className="self-center font-capital text-6xl">{score}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreView;
