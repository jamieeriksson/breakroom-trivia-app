import React from "react";
import { Link } from "react-router-dom";
import Header from "./header.js";
import QuestionBg from "./question-bg.js";

class ScoreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      triviaQuestions: [],
      isQuestionListOpen: false,
    };

    this.toggleQuestionList = this.toggleQuestionList.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

    try {
      const response = await fetch("http://localhost:4444/quiz");
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      if (this._isMounted) {
        this.setState({
          isLoaded: true,
          triviaQuestions: json.items,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: error,
        isLoaded: true,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleQuestionList() {
    this.setState({
      isQuestionListOpen: !this.state.isQuestionListOpen,
    });
  }

  render() {
    const { error, isLoaded, triviaQuestions, isQuestionListOpen } = this.state;

    if (error) {
      return (
        <div className="bg-blue-light w-screen h-screen flex justify-center place-items-center">
          <Header fromQuizView={false} />
          <QuestionBg className="z-0" />
          <div className="z-10 max-w-6xl w-full py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
            <p className="text-3xl text-center">
              An error occured: {error.message}
            </p>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="bg-blue-light w-screen h-screen flex justify-center place-items-center">
          <Header fromQuizView={false} />
          <QuestionBg className="z-0" />
          <div className="z-10 max-w-6xl w-full py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
            <p className="text-3xl text-center">Loading...</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-blue-light w-screen h-screen flex justify-center place-items-center">
          <Header fromQuizView={false} />
          <QuestionBg className="z-0" />
          <div className="z-10 max-w-6xl w-full py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
            <div>
              <button
                onClick={this.toggleQuestionList}
                className="pl-4 pr-3 py-1 mr-24 bg-blue-dark font-cursive text-2xl text-white rounded-md focus:outline-none hover:shadow-md hover:font-bold"
              >
                {isQuestionListOpen
                  ? "Hide Trivia Questions"
                  : "View Trivia Questions"}
              </button>
              <Link
                to={{
                  pathname: "/play",
                  state: { triviaItems: triviaQuestions },
                }}
                className="pl-4 pr-3 py-1 bg-red font-cursive text-2xl text-white rounded-md focus:outline-none hover:shadow-md hover:font-bold"
              >
                Start Trivia Quiz
              </Link>
            </div>
            <div
              className={`mx-4 mt-6 h-64 overflow-y-scroll scrollbar-thin scrollbar-track-gray-400 scrollbar-thumb-blue-light ${
                isQuestionListOpen ? "block" : "hidden"
              }`}
            >
              <ul>
                {triviaQuestions.map((item) => (
                  <li
                    key={item.question}
                    className="py-1 px-4 mr-6 border-blue-light border-b"
                  >
                    {item.question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ScoreView;
