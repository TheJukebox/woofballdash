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
                    localStorage.setItem('first-login', true);
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', 'token');
                } else {
                    sessionStorage.setItem('loggedin', true);
                    sessionStorage.setItem('first-login', true);
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
    if (username == 'wrong' || username == ''){
        $('.signin').removeClass('slide-in');
        $('.signin').addClass('shake');
        $('#username').addClass('is-invalid');
        $('#password').addClass('is-invalid');
        $('#incorrect-text').removeClass('no-height');
        setTimeout(
            function(){$('.signin').removeClass('shake');
        }, 1000);
    } else {
        $('.signin').addClass('slide-out');
        setTimeout(function(){
            if (remember){
                localStorage.setItem('loggedin', true);
                localStorage.setItem('username', username);
                localStorage.setItem('first-login', true);
                localStorage.setItem('token', 'token');
            } else {
                sessionStorage.setItem('loggedin', true);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('first-login', true);
                sessionStorage.setItem('token', 'token');
            }
            window.location.replace('index.html');
        }, 2000);
    }
}

$('#username, #password').on('input', function() { 
    $('#username').removeClass('is-invalid');
    $('#password').removeClass('is-invalid');
    $('#incorrect-text').addClass('no-height');
});

$('#username, #password').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
        console.log('enter');
		$('#login-btn').click();
	}
});