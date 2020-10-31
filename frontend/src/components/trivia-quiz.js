import React from "react";

class TriviaQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      triviaItems: [],
      askedQuestionIds: [],
      currentQuestion: "",
      currentAnswers: [],
      correctAnswer: "",
      selectedAnswer: "",
    };

    this.getNewTriviaQuestion = this.getNewTriviaQuestion.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          triviaItems: json.items,
        });
        this.getNewTriviaQuestion();
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isLoaded: true,
        error,
      });
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
    });
  }

  handleNextQuestionClick(e) {
    e.preventDefault();
    this.getNewTriviaQuestion();
  }

  handleChange(e) {
    this.setState({
      selectedAnswer: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const selectedAnswer = this.state.selectedAnswer;
    const correctAnswer = this.state.correctAnswer;
    if (selectedAnswer == correctAnswer) {
      console.log("You got it right!");
    }
  }

  render() {
    const {
      error,
      isLoaded,
      triviaItems,
      askedQuestionIds,
      currentQuestion,
      currentAnswers,
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="bg-blue-light w-screen h-screen flex justify-center place-items-center">
          <div className="max-w-6xl w-full py-4 px-6 bg-gray-light rounded-xl flex flex-col">
            <p className="font-cursive text-2xl">
              Question {askedQuestionIds.length}/{triviaItems.length}
            </p>
            <div>
              <p className="font-cursive text-2xl">Time Remaining: 0:00</p>
            </div>
            <div className="font-sans place-self-center">
              <h2 className="text-3xl">{currentQuestion}</h2>
              <form>
                <div className="m-4 grid grid-cols-2 grid-rows-2 gap-6">
                  {currentAnswers.map((answer) => (
                    <label className="text-2xl">
                      <input
                        name="triviaAnswer"
                        type="radio"
                        id={answer}
                        value={answer}
                        checked={this.state.selectedAnswer === answer}
                        onChange={this.handleChange}
                      />
                      {answer}
                      <br />
                    </label>
                  ))}
                </div>
                <input
                  type="submit"
                  value="Submit"
                  onClick={this.handleSubmit}
                  className=""
                />
              </form>
            </div>
            <div className="flex flex-row w-full justify-start">
              <p className="flex-grow font-cursive text-2xl">Total Points: 0</p>
              <button
                onClick={this.handleNextQuestionClick}
                className="px-2 bg-red font-capital text-2xl text-white rounded-md"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TriviaQuiz;
