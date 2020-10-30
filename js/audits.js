var loginURL = '';
var token, login, username;

if ((login = sessionStorage.getItem('loggedin')) == 'true'){
    username = sessionStorage.getItem('username');
    token = sessionStorage.getItem('token');
} else if ((login = localStorage.getItem('loggedin')) == 'true'){
    username = localStorage.getItem('username');
    token = localStorage.getItem('token');
} else {
    logouterer();
}

function logout(){
    $('body').addClass('fadeout');
    setTimeout(function(){
        logouterer();
    }, 2000);
}

function logouterer(){
    sessionStorage.removeItem('loggedin');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    localStorage.removeItem('loggedin');
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    window.location.replace('login.html');
}

function displayAudits(){
    fetch(url + token).then(
        x => {
            
        }
    )
}