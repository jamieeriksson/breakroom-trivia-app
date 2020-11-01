import React from "react";
import Header from "../header.js";
import QuestionBg from "../question-bg.js";
import ErrorView from "../error-view.js";
import LoadingView from "../loading-view.js";
import TriviaAnswer from "./trivia-answer.js";
import Timer from "./timer.js";
import { SubmitMessage, TriviaFooter } from "./trivia-footer.js";

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
    } while (askedQuestionIds.includes(newQuestion.id));

    askedQuestionIds = askedQuestionIds.concat(newQuestion.id);
    newAnswers = newQuestion.incorrect;
    newAnswers = newAnswers.concat(newQuestion.correct);

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
      selectedAnswer,
      correctAnswer,
      submitMessage,
      minutes,
      seconds,
      totalPoints,
      quizResults,
    } = this.state;

    if (error) {
      return <ErrorView fromQuizView={true} error={error} />;
    } else if (!isLoaded) {
      return <LoadingView fromQuizView={true} />;
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
                  <SubmitMessage
                    selectedAnswer={selectedAnswer}
                    correctAnswer={correctAnswer}
                    submitMessage={submitMessage}
                  />
                  <TriviaFooter
                    totalPoints={totalPoints}
                    handleSubmit={this.handleSubmit}
                    answerIsSubmit={answerIsSubmit}
                    handleNextQuestionClick={this.handleNextQuestionClick}
                    askedQuestionIds={askedQuestionIds}
                    quizLength={quizLength}
                  />
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
