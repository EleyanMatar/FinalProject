document.getElementById('sign_in').addEventListener('submit', function(event) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username.trim() === "") {
        event.preventDefault();
        document.getElementById('message').textContent = 'Empty username cannot be submitted, enter username..'
    } else if (password.trim( )=== "") {
        event.preventDefault();
        document.getElementById('message').textContent = 'Empty password cannot be submitted, enter password..'
}
})