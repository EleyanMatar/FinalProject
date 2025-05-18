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

document.getElementById('add_survey').addEventListener('submit',function(event) {
    let id = document.getElementsByName('id')[0].value;
    let building_number = document.getElementsByName('building_number')[0].value;
    let city = document.getElementsByName('city')[0].value;
    let municipality = document.getElementsByName('municipality')[0].value;
    let neighborhood = document.getElementsByName('neighborhood')[0].value;
    let street = document.getElementsByName('street')[0].value;
    let building_use = document.getElementsByName('building_use')[0].value;
    let building_status = document.getElementsByName('building_status')[0].value;
    let current_place_of_residence = document.getElementsByName('current_place_of_residence')[0].value;
    let propertyList = [city,municipality,neighborhood,street,building_status,building_use,current_place_of_residence]
    let propertyNames = ['City', 'Municipality', 'Neighborhood', 'Street', 'Building Status', 'Building Use', 'Current Residence'];
    let land_number = document.getElementsByName('land_number')[0].value;
    let distination_number = document.getElementsByName('distination_number')[0].value;
    let number_of_floors = document.getElementsByName('number_of_floors')[0].value;
    let number_of_units = document.getElementsByName('number_of_units')[0].value;
    let floor_number = document.getElementsByName('floor_number')[0].value;
    let unit_number = document.getElementsByName('unit_number')[0].value;
    let family_member = document.getElementsByName('family_member')[0].value;
    let unit_area = document.getElementsByName('unit_area')[0].value;
    let number_of_rooms = document.getElementsByName('number_of_rooms')[0].value;

    let propertyListNumbers = [land_number,distination_number,number_of_floors,number_of_units,floor_number,unit_number,family_member,unit_area,number_of_rooms,building_number];
    let propertyNamesNumbers = ['land_number','distination_number','number_of_floors','number_of_units','floor_number','unit_number','family_member','unit_area','number_of_rooms','building_number'];
    if (!isNineDigitNumber(id)){
        event.preventDefault();
        document.getElementById('message').innerHTML = " ID should be nine digit numbers";
        return;
    }
    for (let i = 0; i < propertyListNumbers.length; i++) {
        if (!isNumber(propertyListNumbers[i]) || isEmpty(propertyListNumbers[i])) {
            event.preventDefault();
            document.getElementById('message').innerHTML = propertyNamesNumbers[i] + " is invalid:<br>1- Must not be empty.<br>2- Must be number.";
            break;
        }
    }
    for (let i = 0; i < propertyList.length; i++) {
        if (isContainNumber(propertyList[i]) || isEmpty(propertyList[i]) || isContainSymbol(propertyList[i])) {
            event.preventDefault();
            document.getElementById('message').innerHTML = propertyNames[i] + " is invalid:<br>1- Must not be empty.<br>2- Must not contain numbers.<br>3- Must not contain symbols.";
            break;
        }
    }
    localStorage.setItem('logInUser','Added new survey');
    })