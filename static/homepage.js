document.getElementById("sign_in").addEventListener('submit', function(event) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    // Sign in and sign out are both submit type, as coded in the first line that the even happens if we act a submit, so both of these button will create this event. 
    // Solution for this problem is to check which button has been clicked by the following
    let clickedButton = document.activeElement;
    // Return object with name property
    if (clickedButton.name== 'sign_in') {
        if (username.trim() === "") {
            event.preventDefault();
            document.getElementById('message').textContent = 'Empty username cannot be submitted, enter username..'
        } else if (password.trim()=== "") {
            event.preventDefault();
            document.getElementById('message').textContent = 'Empty password cannot be submitted, enter password..'
        } else {
            localStorage.setItem('logInUser','logged in');
        }
    }

    })