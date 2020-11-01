import React from "react";
import { Link } from "react-router-dom";
import QuestionBg from "./question-bg.js";
import Header from "./header.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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

class Timer extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => this.props.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { minutes, seconds, answerIsSubmit } = this.props;
    const duration = minutes * 60 + seconds;

    return (
      <div className="flex flex-col">
        <p className="self-center md:self-end font-cursive text-xl md:text-2xl">
          Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
        <div className="relative h-4 w-full">
          <div className="absolute bg-white shadow-md h-4 w-full"></div>
          <div
            className={`absolute bg-blue-dark h-4 w-full ${
              answerIsSubmit ? "scale-x-1" : "animate-timer"
            } origin-left`}
          ></div>
        </div>
      </div>
    );
  }
}

class TriviaQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      triviaItems: [],
      quizLength: 10,
      minutes: 1,
      seconds: 30,
      askedQuestionIds: [],
      currentQuestion: "",
      currentAnswers: [],
      correctAnswer: "",
      selectedAnswer: "",
      answerIsSubmit: false,
      submitMessage: "",
      quizResults: [],
      totalPoints: 0,
    };

    this.getNewTriviaQuestion = this.getNewTriviaQuestion.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimerEnd = this.handleTimerEnd.bind(this);
    this.tick = this.tick.bind(this);
  }

  async componentDidMount() {
    if (this.props.location.state) {
      const { triviaItems } = await this.props.location.state;

      this.setState({
        triviaItems: triviaItems,
        isLoaded: true,
      });

      this.getNewTriviaQuestion();
    } else {
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
            triviaItems: json.items,
          });
          this.getNewTriviaQuestion();
        }
      } catch (error) {
        console.log(error);
        this.setState({
          isLoaded: true,
          error: error,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getNewTriviaQuestion() {
    const triviaItems = this.state.triviaItems;
    let askedQuestionIds = this.state.askedQuestionIds;
    let newAnswers = [];
    let newQuestion = "";

    do {
      newQuestion = triviaItems[Math.floor(Math.random() * triviaItems.length)];
      console.log(newQuestion);
    } while (askedQuestionIds.includes(newQuestion.id));

    askedQuestionIds = askedQuestionIds.concat(newQuestion.id);
    newAnswers = newQuestion.incorrect;
    newAnswers = newAnswers.concat(newQuestion.correct);
    console.log(newAnswers);

    // Randomize answer order with Fisher-Yates Algorithm
    for (let i = newAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = newAnswers[i];
      newAnswers[i] = newAnswers[j];
      newAnswers[j] = temp;
    }

    this.setState({
      askedQuestionIds: askedQuestionIds,
      currentQuestion: newQuestion.question,
      currentAnswers: newAnswers,
      correctAnswer: newQuestion.correct,
      submitMessage: "",
      selectedAnswer: "",
      resetTimer: true,
    });
  }

  // Form methods
  handleChange(e) {
    this.setState({
      selectedAnswer: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const currentQuestion = this.state.currentQuestion;
    const selectedAnswer = this.state.selectedAnswer;
    const correctAnswer = this.state.correctAnswer;
    const totalPoints = this.state.totalPoints;
    let oldQuizResults = this.state.quizResults;

    if (!selectedAnswer) {
      this.setState({
        submitMessage: "Please select an answer before submitting.",
      });
    } else if (selectedAnswer == correctAnswer) {
      const updatedQuizResults = oldQuizResults.concat({
        question: currentQuestion,
        correctlyAnswered: true,
      });

      this.setState({
        submitMessage: "You answered correctly!",
        answerIsSubmit: true,
        minutes: 0,
        seconds: 0,
        totalPoints: totalPoints + 10,
        quizResults: updatedQuizResults,
      });
    } else if (selectedAnswer != correctAnswer) {
      const updatedQuizResults = oldQuizResults.concat({
        question: currentQuestion,
        correctlyAnswered: false,
      });

      this.setState({
        submitMessage: "You answered incorrectly.",
        answerIsSubmit: true,
        minutes: 0,
        seconds: 0,
        quizResults: updatedQuizResults,
      });
    }
  }

  // Button click methods
  handleNextQuestionClick(e) {
    e.preventDefault();
    this.getNewTriviaQuestion();
    this.setState({
      answerIsSubmit: false,
      minutes: 1,
      seconds: 30,
    });
  }

  handleEndQuizClick(e) {
    e.preventDefault();
  }

  // Timer methods
  handleTimerEnd() {
    this.setState({
      submitMessage: "Your time ran out to answer.",
      answerIsSubmit: true,
    });
  }

  tick() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    const answerIsSubmit = this.state.answerIsSubmit;

    if (answerIsSubmit === false) {
      if (minutes === 0 && seconds === 0) {
        this.handleTimerEnd();
      } else if (seconds === 0) {
        seconds = 59;
        minutes = minutes - 1;
      } else {
        seconds = seconds - 1;
      }
    } else {
      minutes = 0;
      seconds = 0;
    }

    this.setState({
      minutes: minutes,
      seconds: seconds,
    });
  }

  render() {
    const {
      error,
      isLoaded,
      quizLength,
      askedQuestionIds,
      currentQuestion,
      currentAnswers,
      answerIsSubmit,
      submitMessage,
      correctAnswer,
      minutes,
      seconds,
      totalPoints,
      quizResults,
    } = this.state;

    if (error) {
      return (
        <div className="bg-blue-light w-screen min-h-screen flex flex-col">
          <Header fromQuizView={true} />
          <QuestionBg className="z-0" />
          <div className="flex-grow flex justify-center place-items-center w-screen">
            <div className="static z-10 max-w-6xl w-full mx-6 my-6 py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
              <p className="text-xl md:text-3xl text-center">
                An error occured: {error.message}
              </p>
            </div>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="bg-blue-light w-screen min-h-screen flex flex-col">
          <Header fromQuizView={true} />
          <QuestionBg className="z-0" />
          <div className="flex-grow flex justify-center place-items-center w-screen">
            <div className="z-10 max-w-6xl w-full mx-6 my-6 py-10 px-6 bg-gray-light rounded-xl flex flex-col place-items-center">
              <p className="text-xl md:text-3xl text-center">Loading...</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-blue-light w-screen min-h-screen flex flex-col">
          <Header fromQuizView={true} />
          <QuestionBg className="z-0" />
          <div className="flex-grow flex justify-center place-items-center w-screen">
            <div className="z-10 self-center place-self-center max-w-6xl w-full mx-6 my-6 py-4 px-6 bg-gray-light rounded-xl flex flex-col">
              <p className="font-cursive text-xl md:text-2xl font-bold self-center md:self-start">
                Question {askedQuestionIds.length}/{quizLength}
              </p>
              <div>
                <Timer
                  handleTimerEnd={this.handleTimerEnd}
                  tick={this.tick}
                  minutes={minutes}
                  seconds={seconds}
                  answerIsSubmit={answerIsSubmit}
                />
              </div>
              <div className="font-sans w-full mt-10">
                <h2 className="text-xl md:text-3xl text-center">
                  {currentQuestion}
                </h2>
                <form className="flex flex-col">
                  <div className="self-center max-w-3xl w-full my-4 p-4 grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-6">
                    {currentAnswers.map((answer) => (
                      <TriviaAnswer
                        answer={answer}
                        correctAnswer={correctAnswer}
                        selectedAnswer={this.state.selectedAnswer}
                        handleChange={this.handleChange}
                        answerIsSubmit={answerIsSubmit}
                      />
                    ))}
                  </div>
                  <p
                    className={`self-center font-cursive text-center text-lg md:text-2xl ${
                      this.state.selectedAnswer == this.state.correctAnswer
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {submitMessage}
                  </p>
                  <div className="flex flex-col md:flex-row w-full mt-4 md:mt-0 justify-start place-items-center">
                    <p className="order-2 md:order-1 mt-4 md:mt-0 font-cursive text-center text-xl md:text-2xl">
                      Total Points: {totalPoints}
                    </p>
                    <div className="order-2 flex-grow hidden md:block"> </div>
                    <input
                      type="submit"
                      value="Submit Answer"
                      onClick={this.handleSubmit}
                      className={`order-1 md:order-3 px-2 md:px-4 py-1 bg-red font-capital text-xl md:text-2xl text-white rounded-md ${
                        answerIsSubmit ? "hidden" : "block"
                      } focus:outline-none`}
                    />
                    <button
                      onClick={this.handleNextQuestionClick}
                      className={`order-1 md:order-3 px-2 md:px-4 py-1  bg-blue-dark font-capital text-xl md:text-2xl text-white rounded-md ${
                        answerIsSubmit && askedQuestionIds.length != quizLength
                          ? "block"
                          : "hidden"
                      } focus:outline-none`}
                    >
                      Next Question
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        color="#FBFBFF"
                        className="ml-2"
                      />
                    </button>
                    <Link
                      to={{
                        pathname: "/score",
                        state: { score: totalPoints },
                      }}
                      className={`order-1 md:order-3 px-2 md:px-4 py-1  bg-blue-dark font-capital text-xl md:text-2xl text-white rounded-md ${
                        answerIsSubmit && askedQuestionIds.length == quizLength
                          ? "block"
                          : "hidden"
                      } focus:outline-none`}
                    >
                      End Quiz
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TriviaQuiz;
