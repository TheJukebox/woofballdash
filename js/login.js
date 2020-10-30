let loginURL = '';
let token = '';

if (sessionStorage.getItem('loggedin') == 'true'){
    window.location.replace('index.html');
} else if (localStorage.getItem('loggedin') == 'true'){
    window.location.replace('index.html');
}

function login(username, password, remember){
    $.post(loginURL, {username: username, password: password})
        .done(function(data) {
            if(data.success){
                //uses localstorage to remember the login, sessionstorage if not
                if (remember){
                    localStorage.setItem('loggedin', true);
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', 'token');
                } else {
                    sessionStorage.setItem('loggedin', true);
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('token', 'token');
                }
                window.location.replace('index.html');
            } else {
                loginError();
            }
        })
        .fail(function() {
            loginError();
        })
}


//delete this when API implemented
function tempLogin(username, password, remember){
    console.log(remember);
    if (remember){
        localStorage.setItem('loggedin', true);
        localStorage.setItem('username', username);
        localStorage.setItem('token', 'token');
    } else {
        sessionStorage.setItem('loggedin', true);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', 'token');
    }
    
    window.location.replace('index.html');
}