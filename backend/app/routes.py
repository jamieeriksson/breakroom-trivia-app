from flask import abort
from flask import current_app as app
from flask import jsonify, request

from .database.models import Question, db


@app.route("/quiz", methods=["GET"])
def quiz():
    if request.method == "GET":
        all_questions = Question.query.all()

        if all_questions is None:
            abort(404)

        formatted_questions = [question.format() for question in all_questions]

        for question in formatted_questions:
            if question["correct"] == "" or type(question["correct"]) != str:
                formatted_questions.remove(question)
            elif len(question["incorrect"]) != 3:
                formatted_questions.remove(question)

        return jsonify({"items": formatted_questions})
    else:
        abort(405)


######################
### Error Handlers ###
######################


@app.errorhandler(404)
def page_not_found(e):
    return (
        jsonify({"error": 404, "message": "resource not found"}),
        404,
    )


@app.errorhandler(405)
def method_not_allowed(e):
    return (
        jsonify({"error": 405, "message": "method not allowed"}),
        405,
    )
