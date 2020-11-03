let loginURL = 'https://z5vplyleb9.execute-api.ap-southeast-2.amazonaws.com/release/authUser';

if (sessionStorage.getItem('loggedin') == 'true'){
    window.location.replace('index.html');
} else if (localStorage.getItem('loggedin') == 'true'){
    window.location.replace('index.html');
}

function login(username, password, remember){
    if (username != ''){
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: loginURL,
            dataType: 'json',
            async: true,
            data: JSON.stringify({'username': username, 'password' : password}),
            fail: function(){
                loginError('Unable to connect to server.', false)
            },
            success: function(data){
                if (data.statusCode == 200){
                    $('.signin').addClass('slide-out');
                    setTimeout(function(){
                        if (remember){
                            localStorage.setItem('loggedin', true);
                            localStorage.setItem('username', username);
                            localStorage.setItem('first-login', true);
                            localStorage.setItem('token', data.body.token);
                        } else {
                            sessionStorage.setItem('loggedin', true);
                            sessionStorage.setItem('username', username);
                            sessionStorage.setItem('first-login', true);
                            sessionStorage.setItem('token', data.body.token);
                        }
                        window.location.replace('index.html');
                    }, 2000);
                } else if (data.statusCode == 401) {
                    loginError('Incorrect username or password.', true);
                } else {
                    loginError('Unable to connect to server.', false)
                }
            },
        })
    }
}

function loginError(message, badPassword){
    $('#incorrect-text').text(message);
    $('.signin').removeClass('slide-in');
    $('#incorrect-text').removeClass('no-height');
    if(badPassword){
        $('.signin').addClass('shake');
        $('#username').addClass('is-invalid');
        $('#password').addClass('is-invalid');

        setTimeout(
            function(){$('.signin').removeClass('shake');
        }, 1000);
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
		$('#login-btn').click();
	}
});