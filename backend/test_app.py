import json
import unittest
from os import environ

from app import create_app
from app.database.models import db_drop_and_create_all, populate_db


class TriviaTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config["TESTING"] = True
        self.app.config["DEBUG"] = False
        self.app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("TEST_DATABASE_URI")

        self.client = self.app.test_client()

        test_json_db_file = "test_Apprentice_TandemFor400_Data.json"
        db_drop_and_create_all()
        populate_db(test_json_db_file)

    def tearDown(self):
        pass

    def test_get_quiz(self):
        response = self.client.get("/quiz")
        data = json.loads(response.data)

        self.assertEqual(response.status_code, 200)

        for trivia_item in data:
            self.assertTrue(trivia_item["question"])
            self.assertTrue(trivia_item["incorrect"])
            self.assertTrue(trivia_item["correct"])
            self.assertEqual(len(trivia_item["incorrect"]), 3)
            self.assertEqual(type(trivia_item["correct"]), str)


if __name__ == "__main__":
    unittest.main()
