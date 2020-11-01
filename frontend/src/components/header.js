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
      <div>
        <header className="z-20 fixed inset-0 w-screen h-16 pt-4 flex place-items-center">
          <div className="ml-12 flex flex-col">
            <h1 className="self-start mr-6 -mb-4 font-cursive text-2xl">
              Breakroom
            </h1>
            <h1 className="self-end font-capital text-4xl">Trivia</h1>
          </div>
          <FontAwesomeIcon
            icon={faQuestion}
            size="3x"
            color="#3626A7"
            className="-mt-2"
          />
          <div className="flex-grow"></div>
          <button
            onClick={this.toggleAlert}
            className={`${
              this.props.fromQuizView ? "block" : "hidden"
            } pl-4 pr-3 py-1 mr-12 bg-blue-dark opacity-75 font-cursive text-xl text-white rounded-md focus:outline-none hover:opacity-100`}
          >
            Back to home
          </button>
          <Link
            to="/"
            className={`${
              this.props.fromQuizView ? "hidden" : "block"
            } pl-4 pr-3 py-1 mr-12 bg-blue-dark opacity-75 font-cursive text-xl text-white rounded-md focus:outline-none hover:opacity-100`}
          >
            Back to home
          </Link>
        </header>
        <div className={`${alertIsOpen ? "absolute inset-0" : "hidden"}`}>
          <div className="z-30 absolute inset-0 w-screen h-screen bg-blue-dark opacity-50 backdrop-blur"></div>
          <div className="z-40 absolute inset-0 w-screen h-screen flex justify-center place-items-center">
            <div className="p-16 bg-gray-light rounded-lg flex flex-col justify-center place-items-center">
              <p className="font-sans text-lg mb-6">
                Are you sure you want to exit the quiz? All progress will be
                lost.
              </p>
              <div>
                <button
                  onClick={this.toggleAlert}
                  className="pl-4 pr-3 py-1 mr-24 bg-blue-dark font-cursive text-2xl text-white rounded-md focus:outline-none hover:shadow-md opacity-75 hover:opacity-100"
                >
                  Back to quiz
                </button>
                <Link
                  to="/"
                  className="pl-4 pr-3 py-1 bg-red font-cursive text-2xl text-white rounded-md focus:outline-none hover:shadow-md opacity-75 hover:opacity-100"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
