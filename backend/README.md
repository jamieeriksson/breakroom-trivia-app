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
