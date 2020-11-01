import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

class QuestionBg extends React.Component {
  render() {
    return (
      <div className="z-0 absolute inset-0 text-4xl md:text-6xl xl:text-8xl w-screen h-screen overflow-hidden">
        <FontAwesomeIcon
          icon={faQuestion}
          size="4x"
          color="#3626A7"
          className="absolute right-2 top-10 md:top-5 transform rotate-7 animate-grow-early"
        />
        <FontAwesomeIcon
          icon={faQuestion}
          size="5x"
          color="#DDDDFF"
          className="absolute -top-2 -left-2 md:left-10 transform -rotate-15 animate-grow-less-delayed"
        />
        <FontAwesomeIcon
          icon={faQuestion}
          size="7x"
          color="#3626A7"
          className="absolute left-1 -bottom-5 md:-bottom-5 lg:bottom-1 transform rotate-12 animate-grow-normal"
        />
        <FontAwesomeIcon
          icon={faQuestion}
          size="5x"
          color="#DDDDFF"
          className="absolute -right-12 md:right-10 -bottom-5 transform -rotate-12 animate-grow-delayed"
        />
      </div>
    );
  }
}

export default QuestionBg;
