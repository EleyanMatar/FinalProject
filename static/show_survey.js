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


document.getElementById('show_survey').addEventListener('submit', function (event){
    let id = document.getElementsByName('id')[0].value;
    if (!isNineDigitNumber(id)){
        event.preventDefault();
        document.getElementById('message').innerHTML = " ID should be nine digit numbers";
    } else {
        localStorage.setItem('logInUser','Displayed old survey');
    }
    
})
    