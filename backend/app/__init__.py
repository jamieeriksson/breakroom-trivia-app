from flask import Flask

from .database.models import setup_db, db_drop_and_create_all, populate_db


def create_app():
    """Initialize core application"""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.DevConfig")

    setup_db(app)

    with app.app_context():
        # from . import routes  # Import routes

        db_drop_and_create_all()
        populate_db()

        return app
