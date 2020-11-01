import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

class LandingView extends React.Component {
  render() {
    return (
      <div className="relative bg-blue-light w-screen h-screen flex justify-center place-items-center">
        <div className="absolute text-8xl w-screen h-screen">
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
        <div className="max-w-6xl w-full py-10 px-6 rounded-xl flex justify-center place-items-center">
          <div className="flex flex-col place-items-center mr-12">
            <h1 className="font-cursive text-6xl -mb-10">Breakroom</h1>
            <h1 className="font-capital text-8xl">Trivia</h1>
            <Link
              to="/play"
              className="pl-4 pr-3 py-1 bg-red font-cursive text-2xl text-white rounded-md focus:outline-none"
            >
              Enter
            </Link>
          </div>
          <div className="text-8xl">
            <FontAwesomeIcon icon={faQuestion} size="3x" color="#3626A7" />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingView;
