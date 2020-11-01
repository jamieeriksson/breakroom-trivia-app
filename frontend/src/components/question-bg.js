import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

class QuestionBg extends React.Component {
  render() {
    return (
      <div className="absolute text-8xl w-screen h-screen overflow-hidden">
        <FontAwesomeIcon
          icon={faQuestion}
          size="4x"
          color="#3626A7"
          className="absolute right-16 top-5 transform rotate-7 animate-grow-early"
        />
        <FontAwesomeIcon
          icon={faQuestion}
          size="5x"
          color="#DDDDFF"
          className="absolute -top-2 left-10 transform -rotate-7 animate-grow-less-delayed"
        />
        <FontAwesomeIcon
          icon={faQuestion}
          size="7x"
          color="#3626A7"
          className="absolute left-1 bottom-1 transform rotate-12 animate-grow-normal"
        />
        <FontAwesomeIcon
          icon={faQuestion}
          size="5x"
          color="#DDDDFF"
          className="absolute right-10 -bottom-5 transform -rotate-12 animate-grow-delayed"
        />
      </div>
    );
  }
}

export default QuestionBg;
