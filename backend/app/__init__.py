from os import environ

from flask import Flask

from .database.models import db_drop_and_create_all, populate_db, setup_db


def create_app():
    """Initialize core application"""
    app = Flask(__name__)
    app.config.from_object("config.DevConfig")

    setup_db(app)

    with app.app_context():
        from . import routes  # Import routes

        json_db_file = "Apprentice_TandemFor400_Data.json"
        db_drop_and_create_all()
        populate_db(json_db_file)

        return app
