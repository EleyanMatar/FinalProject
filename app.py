import flask 
import pandas as pd
app = flask.Flask('Surveying')
# flask.session will not work without secret_key()
app.secret_key = "#secret_key@2025"
records = pd.read_excel('Records.xlsx')
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

# read users file, which contains objects properties separated with ":" and turn it to dictionary
def open_users_file(file_name='username.txt'):
    users = []
    lines = read_split_text_to_list(file_name)
    for line in lines:
        parts = line.strip().split(":")
        if len(parts) == 6:
            user = {
                "id": parts[0],
                "first_name": parts[1],
                "last_name": parts[2],
                "username": parts[3],
                "password": parts[4],
                "email_address": parts[5]
            }
            users.append(user)
    return users

#homepage, give a brief of the webapp and give him the option to sign in or sign up, then redirect the user for /action route
@app.route('/', methods = ["GET","POST"])
def homepage():
# method = GET and POST. GET because of requesting the homepage itself, POST to enter values for processing in backend
# If statment is for check that the method used is post, that means we will enter new values and the web server will convey it for backend.
# flask.request.method() to call the method type.
    if flask.request.method == "POST":
        if "sign_up" in flask.request.form:
            return flask.redirect('/signup')
        elif "sign_in" in flask.request.form:
            password = flask.request.form["password"]
            username = flask.request.form["username"].lower()
            users = open_users_file("username.txt")
    #Session, We use it because each request work individually without connected with each other, so the appropriate way to redirect to action route is to make sure that the user sign in successfully.
            for i in users:
                if i['username'] == username:
                    if i['password'] == password:
                        flask.session['username'] = username
                        return flask.redirect('/actions')
                    else:
                        return get_html_text('templates/index.html').replace('$replace$',"Wrong password. Try again.")
            return get_html_text('templates/index.html').replace('$replace$',"Wrong username. Try again.")

    return get_html_text('templates/index.html').replace('$replace$',"")
                    
        
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if flask.request.method == 'POST':
        first_name = flask.request.form["first_name"].capitalize()
        last_name = flask.request.form["last_name"].capitalize()
        email_address = flask.request.form["email_address"].lower()
        username = flask.request.form["username"].lower()
        password = flask.request.form["password"]

        users = open_users_file("username.txt")

        for user in users:
            if user['username'] == username:
                return get_html_text("templates/signup.html").replace('$replace$',"This username is already taken. Try again.")
            if user['email_address'] == email_address:
                return get_html_text("templates/signup.html").replace('$replace$',"This email is already registered. Try again.")

        

        account(id,first_name,last_name,username,password,email_address).save_to_file()
        return get_html_text("templates/signup.html").replace('$replace$',"Account created successfully! <a href='/'>Go to login</a>")
    
    return get_html_text("templates/signup.html").replace('$replace$',"")


@app.route('/actions', methods=['GET', 'POST'])
def actions():
    if "username" not in flask.session:
        return flask.redirect('/')
    
    if flask.request.method == 'POST':
        if 'add_survey' in flask.request.form:
            return flask.redirect('/add_survey')
        elif 'show_survey' in flask.request.form:
            return flask.redirect('/show_survey')
        elif 'update_survey' in flask.request.form:
            return flask.redirect('/update_survey')
        
    return flask.render_template('actions.html')

@app.route('/show_survey', methods = ["GET","POST"])
def show_survey():
    if flask.request.method == "POST":
        id = int(flask.request.form["id"])
        get_from_data = records[records['id'] == id]
        if get_from_data.empty:
            return get_html_text('templates/show_survey.html').replace('$replace$','No survey found for this ID.')
        else :
            return get_html_text('templates/show_survey.html').replace('$replace$', get_from_data.to_html(index=False))
        
    return get_html_text('templates/show_survey.html').replace('$replace$', '')
            
@app.route('/update_survey', methods = ['GET','POST'])
def update_survey():
    options = ''
    for i in records.columns:
        if i != 'id':
            options+=f"<option value='{i}'>{i}</option>"
    if flask.request.method == "POST":
        id = int(flask.request.form['id'])
        property = flask.request.form['property']
        new_change = flask.request.form['new_change']
        if records[records['id']==id].empty:
            return get_html_text('templates/update.html').replace('$replace$',options).replace('$replace2$','No survey found for this ID.')
        else:
            records.loc[records[records['id'] == id].index,property] = new_change
            records.to_excel('Records.xlsx')
            return get_html_text('templates/update.html').replace('$replace$',options).replace('$replace2$',"This survey has been updated successfully! <a href='/show_survey'>Go check the update..</a>")
    return get_html_text('templates/update.html').replace('$replace$',options).replace('$replace2$',"")

@app.route('/add_survey')
def add_survey():
    return 'this page to add new survey'