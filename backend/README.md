# Tandem Apprentice Challenge 2020 - Trivia Backend

## About the Project

This application was created for the Udacity Fullstack Nanodegree Capstone project. It contains a Flask application for an ultimate frisbee team and player management site. It keeps track of registered players and teams and allows you to roster players under the teams they are playing for each season.

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

## Running the server

From within the `./backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
pipenv run python wsgi.py
```

## Live URL

This API is deployed on Heroku and can be visited at:
https://fsnd-capstone-ultimate-teams.herokuapp.com/

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
