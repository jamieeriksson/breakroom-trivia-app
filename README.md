# Tandem Apprentice Challenge 2020 - Trivia Backend

## About the Project

This application was created for the 2020 Tandem Apprentice Challenge. The goal was to create an application for users to be able to play trivia rounds. Each round consists of 10 multiple choice trivia questions randomly selected from a complete database of possible questions.

## Getting Started

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### PIP Dependencies

This project was built using pipenv for the virtual environment. All of the project dependencies are stored in the `Pipfile` file. Install dependencies by naviging to the `/backend` directory and running:

```bash
pipenv install --dev
```

This will install all of the required packages within the `Pipfile` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) and [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) are libraries to handle the lightweight sqlite database. Since we want you to focus on auth, we handle the heavy lift for you in `./src/database/models.py`. We recommend skimming this code first so you know how to interface with the Drink model.

#### Envrionment Variables

##### Database Variables

The `config.py` file connects to a database through environmental variables in your virtual environment. In order for the app to connect to a development and test database, run the following code:

```
pipenv run export DEV_DATABASE_URI="postgresql://<user>:<password>@localhost:<port>/<database_name>"
pipenv run export TEST_DATABASE_URI="postgresql://<user>:<password>@localhost:<port>/<test_database_name>"
```

## Running the server

The server should run on port 4444. If you run the backend server on a different port, make sure you update any frontend fetch calls to match the new server location.

To run the server, execute the following while within the `./backend` directory:

```bash
pipenv run python wsgi.py
```

## API Behavior

### Endpoints

GET '/quiz',

GET '/quiz'

- Fetches a list of trivia questions and their answer choices.
- Request Arguments: none
- Returns: A list of trivia question objects containing each question, a list of its incorrect answer choices, and the correct answer choice.

  ```
  [
  {
    "question": "What was Tandem previous name?",
    "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
    "correct": "Devmynd"
  },
  {
    "question": "In Shakespeare's play Julius Caesar, Caesar's last words were...",
    "incorrect": ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana"],
    "correct": "Et tu, Brute?"
  }
  ]
  ```

## Testing

### Running the Test Files

To run all of the tests execute:

```bash
pipenv run python -m unittest
```

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
