// These functions for input restrictions on add_survey inputs
function isNumber(text){
    if (isNaN(Number(text))){
        return false;
    } else {
        return true;
    }
}

function isNineDigitNumber(text){
    if (isNumber(text)){
        if (text.length==9){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/////////////////////

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
    }
})

//////////////
document.getElementById('add_survey').addEventListener('submit',function(event) {
    let city = document.getElementsByName('city')[0].value;
    let municipality = document.getElementsByName('municipality')[0].value;
    let neighborhood = document.getElementsByName('neighborhood')[0].value;
    let street = document.getElementsByName('street')[0].value;
    let building_use = document.getElementsByName('building_use')[0].value;
    let building_status = document.getElementsByName('building_status')[0].value;
    let current_place_of_residence = document.getElementsByName('current_place_of_residence')[0].value;
    let propertyList = [city,municipality,neighborhood,street,building_status,building_use,current_place_of_residence]
    let propertyNames = ['City', 'Municipality', 'Neighborhood', 'Street', 'Building Status', 'Building Use', 'Current Residence'];
    for (let i = 0; i < propertyList.length; i++) {
        if (isContainNumber(propertyList[i]) || isEmpty(propertyList[i]) || isContainSymbol(propertyList[i])) {
            event.preventDefault();
            document.getElementById('message').innerHTML = propertyNames[i] + " is invalid:<br>1- Must not be empty.<br>2- Must not contain numbers.<br>3- Must not contain symbols.";
            break;
        }
    }
    }
)