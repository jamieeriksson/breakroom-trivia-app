import React from "react";
import { Link } from "react-router-dom";
import Header from "./header.js";
import QuestionBg from "./question-bg.js";
import ErrorView from "./error-view.js";
import LoadingView from "./loading-view.js";

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
      const response = await fetch(
        "https://warm-river-84757.herokuapp.com/quiz"
      );
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
      return <ErrorView fromQuizView={false} error={error} />;
    } else if (!isLoaded) {
      return <LoadingView fromQuizView={false} />;
    } else {
      return (
        <div className="bg-blue-light w-screen min-h-screen flex flex-col">
          <Header fromQuizView={false} />
          <QuestionBg className="z-0" />
          <div className="flex-grow flex justify-center place-items-center w-screen">
            <div className="z-10 max-w-6xl w-full mx-6 my-6 py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
              <div className="flex flex-col md:flex-row justify-center place-items-center">
                <Link
                  to={{
                    pathname: "/play",
                    state: { triviaItems: triviaQuestions },
                  }}
                  className="px-3 md:px-4 py-1 mb-6 md:mb-0 bg-red font-cursive text-xl md:text-2xl text-white rounded-md focus:outline-none hover:shadow-md hover:font-bold md:order-2"
                >
                  Start Trivia Quiz
                </Link>
                <button
                  onClick={this.toggleQuestionList}
                  className="px-3 md:px-4 py-1 md:mr-24 bg-blue-dark font-cursive text-xl md:text-2xl text-white rounded-md focus:outline-none hover:shadow-md hover:font-bold md:order-1"
                >
                  {isQuestionListOpen
                    ? "Hide Trivia Questions"
                    : "View Trivia Questions"}
                </button>
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
        </div>
      );
    }
  }
}

export default ScoreView;
