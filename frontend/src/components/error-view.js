import React from "react";
import Header from "./header.js";
import QuestionBg from "./question-bg.js";

class ErrorView extends React.Component {
  render() {
    return (
      <div className="bg-blue-light w-screen min-h-screen flex flex-col">
        <Header fromQuizView={this.props.fromQuizView} />
        <QuestionBg className="z-0" />
        <div className="flex-grow flex justify-center place-items-center w-screen">
          <div className="static z-10 max-w-6xl w-full mx-6 my-6 py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
            <p className="text-xl md:text-3xl text-center">
              An error occured: {this.props.error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorView;
