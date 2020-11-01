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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Future Addional Features

Additional future features that will be implemented in this trivia app include:

- Entering a player name before quiz starts and having the ability to post your quiz scores to a score board.
  - Would create a backend model for player names, their scores, and the quiz they took.
- Making your own trivia quiz and have it be added to a list of quizzes that are available for play selection.
  - Ability to log in as a user in order to manage the quizzes you have created.
  - There would be a frontend form and a backend POST route for creating trivia quizzes.
  - Users can create questions with 4 answer choices, customize amount of time to answer each question, choose question length of quiz.
- Practice mode: ability to have hints given on questions to help players practice their trivia skills.
