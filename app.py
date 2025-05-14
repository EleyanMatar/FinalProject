import flask 
app = flask.Flask('Surveying')

# create class for new account:
class account:
    def __init__(self,id,first_name,last_name,username,password,email_address):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password
        self.email_address = email_address

    def change_email_address(self,new_email_address):
        self.email_address = new_email_address
    
    def change_password(self,new_password):
        self.password = new_password

    def to_text(self):
        return f"{self.id}:{self.first_name}:{self.last_name}:{self.username}:{self.password}:{self.email_address}"

    def save_to_file(self, file_name='username.txt'):
        with open(file_name, 'a') as file:
            file.write(self.to_text() + '\n')


# read text and html files
def get_html_text(html_file):
    file = open(html_file)
    content = file.read()
    file.close()
    return content

# read text file and split it to return a list, processing before converting to html paragraphs
def read_split_text_to_list(text_file):
    file = get_html_text(text_file)
    content = file.split('\n')
    return content

# turn text into html
def text_to_html(text_file):
    file = read_split_text_to_list(text_file)
    returned_paragraphs = ''
    for i in file:
        returned_paragraphs+= f'<p>{i}</p>'
    return returned_paragraphs

# read users file, which contains the usernames and password
def open_users_file(users_file):
    users = {}
    users_file = read_split_text_to_list()
    for user in users_file:
        username, password = user.split(":")
        users[username] = password
    return users

#homepage, give a brief of the webapp and give him the option to sign in or sign up, then redirect the user for /action route
@app.route('/', methods = ["GET","POST"])
def homepage():
# method = GET and POST. GET because of requesting the homepage itself, POST to enter values for processing in backend
# If statment is for check that the method used is post, that means we will enter new values and the web server will convey it for backend.
# flask.request.method() to call the method type.
    if flask.request.method == "POST":
        password = flask.request.form["password"]
        username = flask.request.form["username"]
        users = open_users_file("username.txt")
#Session, We use it because each request work individually without connected with each other, so the appropriate way to redirect to action route is to make sure that the user sign in successfully.
        if (username in users.keys()):
            if users[username]==password:
                flask.session['username'] = username
                return flask.redirect('/actions')
            else:
                return "Wrong password. Try again."
        else:
            return "Wrong username. try again, or press sign up if it is your first time.."
        
@app.route('/signup', methods = "POST")
def signup():


@app.route('/actions')
def actions():
    if "username" in flask.session:
        return "This page will show the services we offer"

@app.route('/update')
def update():
    return 'this page is for update'

@app.route('/view')
def add():
    return 'this page to add new destruction'

@app.route('/add')
def add():
    return 'this page to add new destruction'