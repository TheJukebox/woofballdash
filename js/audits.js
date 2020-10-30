var loginURL = '';
var token, login, username;

if ((login = sessionStorage.getItem('loggedin')) == 'true'){
    username = sessionStorage.getItem('username');
    token = sessionStorage.getItem('token');
    if (sessionStorage.getItem('first-login') == 'true'){
        sessionStorage.setItem('first-login', false);
        $('body').css('opacity', '1');
        $('.navbar').addClass('slide-in-nav');
        $('.container').addClass('fadein');
    } else {
        $('body').css('opacity', '1');
        $('.container').addClass('fadein');
    }
} else if ((login = localStorage.getItem('loggedin')) == 'true'){
    username = localStorage.getItem('username');
    token = localStorage.getItem('token');
    if (localStorage.getItem('first-login') == 'true'){
        localStorage.setItem('first-login', false);
        $('body').css('opacity', '1');
        $('.navbar').addClass('slide-in-nav');
        $('.container').addClass('fadein');
    } else {
        $('body').css('opacity', '1');
        $('.container').addClass('fadein');
    }
} else {
    logouterer();
}

function clickyFade(url){
    $('.container').addClass('fadeout');
    setTimeout(function(){
        window.location.replace(url);
    }, 1000);
}

function logout(){
    $('.navbar').addClass('slide-out-nav');
    $('.container').addClass('fadeout');
    sessionStorage.removeItem('loggedin');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    localStorage.removeItem('loggedin');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setTimeout(function(){
        window.location.replace('login.html');
    }, 1500);
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