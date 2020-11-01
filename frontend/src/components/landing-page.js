import React from "react";
import { Link } from "react-router-dom";
import QuestionBg from "./question-bg.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

class LandingView extends React.Component {
  render() {
    return (
      <div className="relative bg-blue-light w-screen h-screen flex justify-center place-items-center">
        <QuestionBg className="z-0" />
        <div className="z-10 max-w-6xl w-full py-10 px-6 rounded-xl flex flex-col justify-center place-items-center md:flex-row">
          <div className="text-6xl md:text-8xl md:order-2">
            <FontAwesomeIcon
              icon={faQuestion}
              size="3x"
              color="#3626A7"
              className="animate-twist"
            />
          </div>
          <div className="flex flex-col place-items-center mt-3 md:mt-0 md:mr-12 md:order-1">
            <h1 className="font-cursive text-5xl md:text-6xl -mb-10">
              Breakroom
            </h1>
            <h1 className="font-capital text-7xl md:text-8xl">Trivia</h1>
            <Link
              to="/start"
              className="pl-4 pr-3 py-1 bg-red font-cursive text-2xl text-white rounded-md focus:outline-none"
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingView;
