from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .database.models import setup_db

db = SQLAlchemy()

def create_app():
    """Initialize core application"""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.DevConfig')

    setup_db(app, db)

    with app.app_context():
        return app