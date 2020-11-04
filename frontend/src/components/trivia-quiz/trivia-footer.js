import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class SubmitMessage extends React.Component {
  render() {
    return (
      <p
        className={`self-center font-cursive text-center text-lg md:text-2xl ${
          this.props.selectedAnswer === this.props.correctAnswer
            ? "text-green"
            : "text-red"
        }`}
      >
        {this.props.submitMessage}
      </p>
    );
  }
}

class TriviaFooter extends React.Component {
  render() {
    return (
      <div className="flex flex-col md:flex-row w-full mt-4 md:mt-0 justify-start place-items-center">
        <p className="order-2 md:order-1 mt-4 md:mt-0 font-cursive text-center text-xl md:text-2xl">
          Total Points: {this.props.totalPoints}
        </p>
        <div className="order-2 flex-grow hidden md:block"> </div>
        <input
          type="submit"
          value="Submit Answer"
          onClick={this.props.handleSubmit}
          className={`order-1 md:order-3 px-2 md:px-4 py-1 bg-red font-capital text-xl md:text-2xl text-white rounded-md ${
            this.props.answerIsSubmit ? "hidden" : "block"
          } focus:outline-none`}
        />
        <button
          onClick={this.props.handleNextQuestionClick}
          className={`order-1 md:order-3 px-2 md:px-4 py-1  bg-blue-dark font-capital text-xl md:text-2xl text-white rounded-md ${
            this.props.answerIsSubmit &&
            this.props.askedQuestionIds.length !== this.props.quizLength
              ? "block"
              : "hidden"
          } focus:outline-none`}
        >
          Next Question
          <FontAwesomeIcon
            icon={faArrowRight}
            color="#FBFBFF"
            className="ml-2"
          />
        </button>
        <Link
          to={{
            pathname: "/score",
            state: { score: this.props.totalPoints },
          }}
          className={`order-1 md:order-3 px-2 md:px-4 py-1  bg-blue-dark font-capital text-xl md:text-2xl text-white rounded-md ${
            this.props.answerIsSubmit &&
            this.props.askedQuestionIds.length === this.props.quizLength
              ? "block"
              : "hidden"
          } focus:outline-none`}
        >
          End Quiz
        </Link>
      </div>
    );
  }
}

export { SubmitMessage, TriviaFooter };
