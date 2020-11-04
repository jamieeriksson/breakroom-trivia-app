import React from "react";

class Timer extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => this.props.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { minutes, seconds, answerIsSubmit } = this.props;

    return (
      <div className="flex flex-col">
        <p className="self-center md:self-end font-cursive text-xl md:text-2xl">
          Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
        <div className="relative h-4 w-full">
          <div className="absolute bg-white shadow-md h-4 w-full"></div>
          <div
            className={`absolute bg-blue-dark h-4 w-full ${
              answerIsSubmit ? "scale-x-1" : "animate-timer"
            } origin-left`}
          ></div>
        </div>
      </div>
    );
  }
}

export default Timer;
