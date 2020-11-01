import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class TriviaAnswer extends React.Component {
  render() {
    const answer = this.props.answer;
    const correctAnswer = this.props.correctAnswer;
    const selectedAnswer = this.props.selectedAnswer;
    const answerIsSubmit = this.props.answerIsSubmit;

    if (answer == correctAnswer) {
      return (
        <div>
          <label className="text-lg md:text-2xl flex flex-wrap place-items-center">
            <div>
              <input
                name="triviaAnswer"
                type="radio"
                id={answer}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={this.props.handleChange}
                className="mr-4"
              />
              <span>{answer}</span>
            </div>
            <FontAwesomeIcon
              icon={faCheck}
              size="2x"
              color="#26AC1B"
              className={`ml-6 ${answerIsSubmit ? "inline" : "hidden"}`}
            />
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <label className="text-lg md:text-2xl flex flex-wrap place-items-center">
            <div>
              <input
                name="triviaAnswer"
                type="radio"
                id={answer}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={this.props.handleChange}
                className="mr-4"
              />
              <span>{answer}</span>
            </div>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              color="#CF5C36"
              className={`ml-6 ${answerIsSubmit ? "inline" : "hidden"}`}
            />
          </label>
        </div>
      );
    }
  }
}

export default TriviaAnswer;
