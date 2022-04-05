from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/battlegearcreator', methods=['GET'])
def battlegearcreator():
    return render_template('battlegearcreator.html')


@app.route('/battleunitcreator', methods=['GET'])
def battleunitcreator():
    return render_template('battleunitcreator.html')