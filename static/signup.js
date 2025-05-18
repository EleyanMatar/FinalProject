function isContainNumber(text){
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    for (let i=0;i<text.length;i++) {
        if (numbers.includes(text[i])) {
            return true;
        }
    }
    return false;
}

function isEmpty(text){
    if (text.trim() === "") {
        return true;
    } else {
        return false;
    }
}

function isContainSymbol(text){
    const forbiddenSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '\\', '|', '`', '~'];
    for (let i=0;i<text.length;i++) {
        if (forbiddenSymbols.includes(text[i])) {
            return true;
        }
    }
    return false;
}

function startsWithNumber(text){
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    return numbers.includes(text[0]);
}

document.getElementById('sign_up').addEventListener('submit',function(event) {
    let first_name = document.getElementsByName('first_name')[0].value;
    let last_name = document.getElementsByName('last_name')[0].value;
    let username = document.getElementsByName('username')[0].value;
    let password = document.getElementsByName('password')[0].value;
    let email_address = document.getElementsByName('email_address')[0].value;

    if (isContainNumber(first_name) || isEmpty(first_name) || isContainSymbol(first_name)) {
        event.preventDefault();
        document.getElementById('message').innerHTML = "First name should:<br>1- not be empty text.<br>2- not contain symbols like !:@#$%^&*<br>3- not contain numbers.";
    } else if (isContainNumber(last_name) || isEmpty(last_name) || isContainSymbol(last_name)) {
        event.preventDefault();
        document.getElementById('message').innerHTML = "Last name should:<br>1- not be empty text.<br>2- not contain symbols like !:@#$%^&*<br>3- not contain numbers.";
    } else if (isContainSymbol(username) || startsWithNumber(username) || isEmpty(username)) {
        event.preventDefault();
        document.getElementById('message').innerHTML = "Username should:<br>1- not be empty text.<br>2- not contain symbols like !:@#$%^&*<br>3- not start with a number";
    } else if (isEmpty(password) || !isContainSymbol(password) || !isContainNumber(password)) {
        event.preventDefault();
        document.getElementById('message').innerHTML = "Password should:<br>1- not be empty.<br>2- contain at least one number.<br>3- contain at least one symbol like !:@#$%^&*";
    }else if (isEmpty(email_address) || !email_address.includes('@') || !email_address.includes('.')) {
        event.preventDefault();
        document.getElementById('message').innerHTML = "email address should:<br>1- not be empty.<br>2- contain '@' and '.'";
    } else {
        localStorage.setItem('logInUser','Registered');
    }
})

