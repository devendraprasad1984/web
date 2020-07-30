let welcomeBar = $('#welcomeBar');
sessionData = JSON.parse(localStorage.getItem('session'));

function clearSession() {
    localStorage.removeItem('session');
    window.location = './index.php';
    $.ajax({
        type: "POST",
        url: './logout.php',
        dataType: 'text',
        data: {
            unload: 1,
        },
        success: function (response) {
        },
        error: function (response) {
        }
    });
    // alert('logging you out.');
}

$(document).ready(function () {
    handleWelcomeBar();
});


function handleWelcomeBar() {
    let output = ''
    if (typeof sessionData !== 'undefined' && sessionData !== null) {
        if (sessionData.loggedIn === 1) {
            output = '<span class="badge badge-secondary">Welcome, ' + sessionData.name + '</span>';
            output += sessionData.role === 'admin' ? '<a href="./admin.php" class="btn bgpurple">Admin Console</a>' : '';
            output += '<a href="#" onclick="clearSession()" class="btn bgred">Logout</a>';
        } else {
            window.location='./index.php'
        }
    } else {
        output = '<button class="btn btn-primary" data-toggle="modal" data-target="#registerModal">Register</button>';
        output += '<button class="btn btn-success" data-toggle="modal" data-target="#loginModal">Login</button>';
    }
    console.log(sessionData);
    welcomeBar.html(output);
}