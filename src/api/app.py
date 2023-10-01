# app.py

from flask import Flask

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return {'name': 'Hello am trying it out'}


if __name__ == "__main__":
    app.run(debug=True)
