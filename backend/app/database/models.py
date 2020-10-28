from flask_migrate import Migrate

migrate = Migrate()

def setup_db(app, db):
    db.app = app
    db.init_app(app)
    migrate.init_app(app, db)