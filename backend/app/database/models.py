import json, os

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.schema import ForeignKey

db = SQLAlchemy()
migrate = Migrate()


def setup_db(app):
    db.app = app
    db.init_app(app)
    migrate.init_app(app, db)


def db_drop_and_create_all():
    db.drop_all()
    db.create_all()


def load_db_json(filename):
    with open(filename) as f:
        data = json.load(f)
    return data


def populate_db(json_db_data):
    """Imported data in format of:
            [
          {
            "question": "What was Tandem previous name?",
            "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
            "correct": "Devmynd"
          }]
    """

    json_db_data_path = os.path.join(os.path.abspath('.'), json_db_data)
    trivia_dict = load_db_json(json_db_data_path)

    for trivia_item in trivia_dict:
        question = Question(question=trivia_item["question"])
        question.insert()

        correct_answer = Answer(answer=trivia_item["correct"], is_correct=True)
        correct_answer.question = question
        correct_answer.insert()

        for incorrect in trivia_item["incorrect"]:
            incorrect_answer = Answer(answer=incorrect, is_correct=False)
            incorrect_answer.question = question
            incorrect_answer.insert()

    db.session.close()


class Question(db.Model):
    """Data model for trivia questions"""

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, nullable=False)
    answers = db.relationship("Answer", backref="question")

    def _repr__(self):
        return "<Question: {}>".format(self.question)

    def format(self):
        incorrect_answers = []
        correct_answer = ""

        for answer in self.answers:
            if answer.is_correct:
                correct_answer = answer
            else:
                incorrect_answers.append(answer)

        return {
            "id": self.id,
            "question": self.question,
            "incorrect": incorrect_answers,
            "correct": correct_answer
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Answer(db.Model):
    """Data model for trivia answers"""

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    question_id = db.Column(db.Integer, ForeignKey("question.id"))

    def __repr__(self):
        return "<Answer: {}>".formant(self.answer)

    def format(self):
        return {
            "id": self.id,
            "answer": self.answer,
            "is_correct": self.is_correct,
            "question_id": self.question_id,
            "question": self.question_id.question,
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
