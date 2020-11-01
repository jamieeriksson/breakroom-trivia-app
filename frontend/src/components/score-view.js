import React from "react";

class ScoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  componentDidMount() {
    const { score } = this.props.location.state.score;

    if (score) {
      this.setState({
        score: score,
      });
    }
  }

  render() {
    return (
      <div className="bg-blue-light w-screen h-screen flex justify-center place-items-center">
        <div className="max-w-6xl w-full py-4 px-6 bg-gray-light rounded-xl flex flex-col">
          <h2 className="self-center font-cursive text-3xl">Your Score:</h2>
          <p className="self-center font-cursive text-4xl">
            {this.state.score}
          </p>
        </div>
      </div>
    );
  }
}

export default ScoreView;
