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

@app.route('/')
def homepage():
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