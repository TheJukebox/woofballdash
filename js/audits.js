var auditURL = 'https://z5vplyleb9.execute-api.ap-southeast-2.amazonaws.com/release/getAudit';
var allAuditURL = 'https://z5vplyleb9.execute-api.ap-southeast-2.amazonaws.com/release/getAllAudits';
var token, login, username, allAudits, currentAudits;

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

$('#current-user').text('User: ' + username);

function getAllAudits(){
    let response;
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: allAuditURL,
        dataType: 'json',
        async: true,
        data: JSON.stringify({'token': token}),
        fail: function(){
            console.log('fail :(')
        },
        success: function(data){
            allAudits = data.body.auditsFound;
            currentAudits = data.body.auditsFound;
            populateAuditTable(allAudits);
        },
    })
}

function downloadAllAudits(){
    var new_page = window.open();
    new_page.document.write(JSON.stringify(currentAudits));
}

function downloadAudit(index){
    var new_page = window.open();
    new_page.document.write(JSON.stringify(currentAudits[index]));
}

function populateAuditTable(audits){
    let tableRows = [];
    console.log(audits);
    $('#resultNo').text(audits.length + ' audits');
    audits.forEach(
        (audit, i) => {
            let index = i + 1;
            let tableRow = `<tr>
                <th scope="row">` + index + `</th>
                <td>` + audit.auditType + `</td>
                <td><a target="_blank" href="https://www.google.com/maps/search/`+ audit.latlng +`/">` + audit.location.locale + `, ` + audit.location.state + `, ` + audit.location.country + `</a></td>
                <td>`+ audit.date +`</td>
                <td>`+ audit.score +`</td>
                <td class="text-right"><button class="btn btn-outline-primary" onclick="downloadAudit(` + i + `);"><img class="buttonIMG" draggable="false" src="icons/feather/list.svg"/></button></td>
            </tr>`

            tableRows.push(tableRow);
        }
    )
    $('#audit-list').html(tableRows);
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