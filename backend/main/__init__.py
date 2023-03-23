import os
from flask import Flask
from dotenv import load_dotenv
def create_app():
    load_dotenv()
    app = Flask(__name__)
    return app

if __name__=="__main__":
    app = create_app()
    app.run(debug=True, port=os.getenv("PORT"))