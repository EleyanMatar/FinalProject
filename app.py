import flask 
app = flask.Flask('Surveying')

@app.route('/')
def homepage():
    return "this is homepage"

@app.route('/update')
def update():
    return 'this page is for update'

@app.route('/view')
def add():
    return 'this page to add new destruction'

@app.route('/add')
def add():
    return 'this page to add new destruction'