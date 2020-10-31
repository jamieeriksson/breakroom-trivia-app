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
    };

    this.getNewTriviaQuestion = this.getNewTriviaQuestion.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
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
    let triviaItems = this.state.triviaItems;
    let askedQuestionIds = this.state.askedQuestionIds;
    let newAnswers = [];
    let newQuestion = "";

    do {
      newQuestion = triviaItems[Math.floor(Math.random() * triviaItems.length)];
      console.log(newQuestion);
    } while (askedQuestionIds.includes(newQuestion.id));

    askedQuestionIds.push(newQuestion.id);

    newAnswers = newQuestion.incorrect;
    newAnswers.push(newQuestion.correct);

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
    });
  }

  handleNextQuestionClick(e) {
    e.preventDefault();
    this.getNewTriviaQuestion();
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
          <div className="max-w-6xl w-full h-64 bg-gray-light">
            <p>
              Question {askedQuestionIds.length}/{triviaItems.length}
            </p>
            <h2>{currentQuestion}</h2>
            <ul>
              <li>{currentAnswers[0]}</li>
              <li>{currentAnswers[1]}</li>
              <li>{currentAnswers[2]}</li>
              <li>{currentAnswers[3]}</li>
            </ul>
            <button onClick={this.handleNextQuestionClick} className="bg-red">
              Next Question
            </button>
          </div>
        </div>
      );
    }
  }
}

export default TriviaQuiz;
