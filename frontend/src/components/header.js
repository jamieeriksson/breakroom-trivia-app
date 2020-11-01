import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alertIsOpen: false,
    };

    this.toggleAlert = this.toggleAlert.bind(this);
  }

  toggleAlert() {
    this.setState({
      alertIsOpen: !this.state.alertIsOpen,
    });
  }

  render() {
    const alertIsOpen = this.state.alertIsOpen;

    return (
      <div className="z-50">
        <header className="inset-0 w-screen h-16 pt-2 md:pt-4 flex place-items-center">
          <div className="ml-2 md:ml-12 flex flex-col">
            <h1 className="self-start mr-4 md:mr-6 -mb-4 font-cursive text-xl md:text-2xl">
              Breakroom
            </h1>
            <h1 className="self-end font-capital text-3xl md:text-4xl">
              Trivia
            </h1>
          </div>
          <div className="text-xs md:text-base">
            <FontAwesomeIcon
              icon={faQuestion}
              size="3x"
              color="#3626A7"
              className="-mt-2"
            />
          </div>
          <div className="flex-grow"></div>
          <button
            onClick={this.toggleAlert}
            className={`${
              this.props.fromQuizView ? "block" : "hidden"
            } px-2 md:px-4 py-1 mr-2 md:mr-12 bg-blue-dark opacity-75 font-cursive md:text-xl text-white rounded-md focus:outline-none hover:opacity-100`}
          >
            Back to home
          </button>
          <Link
            to="/"
            className={`${
              this.props.fromQuizView ? "hidden" : "block"
            } px-2 md:px-4 py-1 mr-2 md:mr-12 bg-blue-dark opacity-75 font-cursive md:text-xl text-white rounded-md focus:outline-none hover:opacity-100`}
          >
            Back to home
          </Link>
        </header>
        <div
          className={`${
            alertIsOpen ? "absolute" : "hidden"
          } z-40 inset-0 w-screen min-h-screen h-full backdrop-blur flex justify-center place-items-center`}
        >
          <div className="p-6 md:p-16 bg-gray-medium shadow-xl mx-4 my-6 rounded-xl flex flex-col justify-center place-items-center">
            <p className="font-sans text-lg mb-6 text-center">
              Are you sure you want to exit the quiz? All progress will be lost.
            </p>
            <div className="flex flex-col md:flex-row w-full justify-center place-items-center">
              <button
                onClick={this.toggleAlert}
                className="px-2 md:px-4 py-1 mb-6 md:mb-0 bg-blue-dark font-cursive text-xl md:text-2xl text-white rounded-md focus:outline-none hover:shadow-md opacity-75 hover:opacity-100"
              >
                Back to quiz
              </button>
              <div className="flex-grow"></div>
              <Link
                to="/"
                className="px-2 md:px-4 py-1 bg-red font-cursive text-xl md:text-2xl text-white rounded-md focus:outline-none hover:shadow-md opacity-75 hover:opacity-100"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
