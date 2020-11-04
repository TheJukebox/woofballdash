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
            console.log(data);
            if (data.statusCode == 401){
                if (data.error == 'Invalid token'){
                    logout();
                }
            }
            try{
                allAudits = data.body.auditsFound;
                currentAudits = data.body.auditsFound;
            } catch (e){
                currentAudits = [];
            }
            populateAuditTable(currentAudits);
        },
    })
}

function searchAudits(){
    let searchOBJ = {};
    searchOBJ.criteria = {};
    let noSearch = true;

    searchOBJ.token = token;

    if ($('#auditsearch').val() != ''){
        searchOBJ.criteria.locationString = $('#auditsearch').val()
        noSearch = false;
    }

    if ($('#startdate').val() != '' && $('#enddate').val() != ''){
        searchOBJ.criteria.date1 = $('#startdate').val();
        searchOBJ.criteria.date2 = $('#enddate').val()
        noSearch = false;
    } else if ($('#startdate').val() != ''){
        searchOBJ.criteria.date = $('#startdate').val();
        noSearch = false;
    } else if ($('#enddate').val() != ''){
        searchOBJ.criteria.date = $('#enddate').val();
        noSearch = false;
    }

    if ($('#auditscore').val() != ''){
        searchOBJ.criteria.score = $('#auditscore').val();
        noSearch = false;
    }

    if ($('#audittype').val() != ''){
        searchOBJ.criteria.auditType = $('#audittype').val()
        noSearch = false;
    }

    if (noSearch){
        currentAudits = allAudits;
        populateAuditTable(currentAudits);
        return;
    }

    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: auditURL,
        dataType: 'json',
        async: true,
        data: JSON.stringify(searchOBJ),
        fail: function(){
            console.log('fail :(')
        },
        success: function(data){
            if (data.statusCode == 401){
                if (data.error == 'Invalid token'){
                    logout();
                }
            }
            try{
                currentAudits = data.body.audits;
            } catch (e){
                currentAudits = [];
            }
            populateAuditTable(currentAudits);
        },
    })
}

function viewAllAudits(){
    showJSON(currentAudits);

    let temp = JSON.stringify(currentAudits);
    temp = [temp];
    let blob = new Blob(temp, {type: "text/plain;charset=utf-8"});
    let url = window.URL;
    download = url.createObjectURL(blob);
    let a = document.createElement('a');
    a.id = 'downloadAuditLink';
    a.download = 'audits.json';
    a.href = download;
    a.classList.add('btn', 'btn-outline-primary');
    $('#audit-toolbar').prepend(a);
    a.innerText = 'Download JSON'

    $('#audit-container').show();
}

function viewAudit(index){
    showJSON(currentAudits[index]);

    let temp = JSON.stringify(currentAudits[index]);
    temp = [temp];
    let blob = new Blob(temp, {type: "text/plain;charset=utf-8"});
    let url = window.URL;
    download = url.createObjectURL(blob);
    let a = document.createElement('a');
    a.id = 'downloadAuditLink';
    a.download = 'audit-' + currentAudits[index].auditID + '.json';
    a.href = download;
    a.classList.add('btn', 'btn-outline-primary');
    $('#audit-toolbar').prepend(a);
    a.innerText = 'Download JSON'

    $('#audit-container').show();
}

function closeAudit(index){
    $('#audit-container').hide();
    $('#downloadAuditLink').remove();
}

function showJSON(json){
    $('#json-renderer').jsonViewer(json);
}

function resetAudits(){
    $('#auditsearch').val('');
    $('#startdate').val('');
    $('#enddate').val('');
    $('#auditscore').val('');
    $('#audittype').val('');
    currentAudits = allAudits;
    populateAuditTable(currentAudits);
}

function populateAuditTable(audits){
    let tableRows = [];
    if (audits.length == 0){
        $('#resultNo').text(audits.length + ' audits');
        $('#audit-list').html('');
        return;
    } else if (audits.length == 1){
        $('#resultNo').text(audits.length + ' audit');
    } else {
        $('#resultNo').text(audits.length + ' audits');
    }
    audits.forEach(
        (audit, i) => {
            let index = i + 1;
            let tableRow = `<tr>
                <th scope="row">` + index + `</th>
                <td>` + audit.auditType + `</td>
                <td><a target="_blank" href="https://www.google.com/maps/search/`+ audit.latlng +`/">` + audit.location.locale + `, ` + audit.location.state + `, ` + audit.location.country + `</a></td>
                <td>`+ audit.date +`</td>
                <td>`+ audit.score +`</td>
                <td class="text-right"><button class="btn btn-outline-primary" onclick="viewAudit(` + i + `);"><img class="buttonIMG" draggable="false" src="icons/feather/list.svg"/></button></td>
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

$('#auditsearch, #startdate, #enddate, #auditscore, #audittype').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$('#search-btn').click();
	}
});