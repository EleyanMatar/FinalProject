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

document.getElementById('submit').addEventListener('submit',function(event) {
    let id = document.getElementsByName('id')[0].value;
    let property = document.getElementsByName('property')[0].value;
    let new_change = document.getElementsByName('new_change')[0].value;
    let propertyNames = ['city', 'municipality', 'neighborhood', 'street', 'building_status', 'building_use', 'current_place_of_residence'];
    let propertyNamesNumbers = ['land_number','distination_number','number_of_floors','number_of_units','floor_number','unit_number','family_member','unit_area','number_of_rooms','building_number'];
    if (!isNineDigitNumber(id)){
        event.preventDefault();
        document.getElementById('message').innerHTML = " ID should be nine digit numbers";
    } else {
        if (propertyNames.includes(property)){
            if (isContainNumber(new_change) || isEmpty(new_change) || isContainSymbol(new_change)) {
            event.preventDefault();
            document.getElementById('message').innerHTML = property + " is invalid:<br>1- Must not be empty.<br>2- Must not contain numbers.<br>3- Must not contain symbols.";  
    }} else {
        if (!isNumber(new_change) || isEmpty(new_change)) {
            event.preventDefault();
            document.getElementById('message').innerHTML = property + " is invalid:<br>1- Must not be empty.<br>2- Must be number.";
        }
    }}})