import flask 
app = flask.Flask('Surveying')

def get_html(html_file):
    file = open(html_file)
    content = file.read()
    file.close()
    return content

def read_text(text_file):
    file = get_html(text_file)
    content = file.split('\n')
    return content

def text_to_html(text_file):
    file = read_text(text_file)
    returned_paragraphs = ''
    for i in file:
        returned_paragraphs+= f'<p>{i}</p>'
    return returned_paragraphs

# @app.route('/login')
# def login():
#     return 'This page is create to sign in and sign up'


@app.route('/', method = ["GET","POST"])
def homepage():
# method = GET and POST. GET because of requesting the homepage itself, POST to enter values for processing in backend
# If statment is for check that the method used is post, that means we will enter new values and the web server will convey it for backend.
# flask.request.method() to call the method type.
    if flask.request.method == "POST":
        password = flask.request.form["password"]
        username = flask.request.form["username"]
        
        

    return get_html('index.html')

@app.route('/update')
def update():
    return 'this page is for update'

@app.route('/view')
def add():
    return 'this page to add new destruction'

@app.route('/add')
def add():
    return 'this page to add new destruction'