# Tandem Apprentice Challenge 2020 - Trivia Frontend

## About the Project

This application was created for the 2020 Tandem Apprentice Challenge. The goal was to create an application for users to be able to play trivia rounds. Each round consists of 10 multiple choice trivia questions randomly selected from a complete database of possible questions.

## Getting Started with Create React App

### Installing Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

This project uses yarn to manage software dependencies. Yarn relies on the package.json file located in the `frontend` directory of this repository. To install dependencies run:

```bash
yarn install
```

## Running the Frontend in Dev Mode

The frontend app was built using create-react-app. In order to run the app in development mode use `npm start` or `yarn start`.

The frontend app will run on [http://localhost:3000](http://localhost:3000). You will need to ensure that the Flask backend is running on port 4444 in order to fetch necessary data.<br>

```bash
yarn start
```

## Future Additional Features

Additional future features that will be implemented in this trivia app include:

- Entering a player name before quiz starts and having the ability to post your quiz scores to a score board.
  - Would create a backend model for player names, their scores, and the quiz they took.
- Making your own trivia quiz and have it be added to a list of quizzes that are available for play selection.
  - Ability to log in as a user in order to manage the quizzes you have created.
  - There would be a frontend form and a backend POST route for creating trivia quizzes.
  - Users can create questions with 4 answer choices, customize amount of time to answer each question, choose question length of quiz.
- Practice mode: ability to have hints given on questions to help players practice their trivia skills.
