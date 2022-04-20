from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/battlegearcreator', methods=['GET'])
def battlegearcreator():
    return render_template('battlegearcreator.html')


@app.route('/battlesquadscreator', methods=['GET'])
def battlesquadscreator():
    return render_template('battlesquadscreator.html')


@app.route('/addsquad', methods=['GET'])
def addsquad():
    return render_template('addsquad.html')


@app.route('/battleunitcreator', methods=['GET'])
def battleunitcreator():
    return render_template('battleunitcreator.html')


@app.route('/rules/core/full', methods=['GET'])
def rules_core_full():
    return render_template('rules/core/full.html')


@app.route('/rules/core/contents', methods=['GET'])
def rules_core_contents():
    return render_template('rules/core/contents.html')


@app.route('/rules/core/playingsurface', methods=['GET'])
def rules_core_playingsurface():
    return render_template('rules/core/playingsurface.html')


@app.route('/rules/core/unitsandgear', methods=['GET'])
def rules_core_unitsandgear():
    return render_template('rules/core/unitsandgear.html')


@app.route('/rules/core/squads', methods=['GET'])
def rules_core_squads():
    return render_template('rules/core/squads.html')


@app.route('/rules/core/gameround', methods=['GET'])
def rules_core_gameround():
    return render_template('rules/core/gameround.html')


@app.route('/rules/core/formulas', methods=['GET'])
def rules_core_formulas():
    return render_template('rules/core/formulas.html')