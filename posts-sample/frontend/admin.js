const rightContents = $('#rightContents');
const searchBox = $('#searchBox');
let currentType = 'users';
let currentClickElem = undefined;
sessionData = JSON.parse(localStorage.getItem('session'));
// console.log(sessionData, sessionData.timeit, sessionData.userid, sessionData.name);


$(document).ready(function () {
    clickHandler($('#navHome'), 'home');
})

function displayRightHeading(caller) {
    // currentType = caller.innerText||'';
    currentClickElem = caller;
    rightContents.prev().html('<h3>' + currentType.toUpperCase() + ' Listing</h3>');
}

function clickSearch(caller) {
    // let ipos = currentClickElem.innerText.indexOf('(');
    // currentType = ipos !== -1 ? currentClickElem.innerText.substring(0, ipos) : currentClickElem.innerText;
    clickHandler(caller, currentType);
}

function clickHandler(caller, type) {
    currentType = type;
    if (typeof caller !== 'undefined') displayRightHeading(caller);

    $.ajax({
        url: './admin.php',
        method: 'post',
        dataType: 'json',
        data: {
            getData: 1,
            loggedIn: sessionData.loggedIn,
            userid: sessionData.userid,
            searchText: searchBox.val().toLowerCase(),
            type
        },
        success: function (data) {
            console.log(type, data);
            if (type === 'home') handleHome(data);
            if (type === 'users') handleUsers(data);
            if (type === 'posts') handlePosts(data);
        },
        error: function (err) {
            let text = err.responseText;
            console.error(text);
            rightContents.html(text);
        }
    });
}

function deletePost(caller,postid) {
    $.ajax({
        url: "./backend/delPosts.php",
        data: {
            postid,
            loggedIn: sessionData.loggedIn,
            userid: sessionData.userid
        },
        type: 'post',
        success: function (response) {
            if (response === 'success') {
                // window.location = window.location;
                console.log($(caller).parent());
            } else {
                alert("Failed to delete, check logs!");
                return false;
            }
        }
    });
}

function handleHome(data) {
    rightContents.html('<div>' +
        '<div class="adminDashboard card" onclick="clickHandler(this,\'users\')"><div class="card-header blue" >USERS</div><div class="card-body blue">' + data.users + '</div></div>' +
        '<div class="adminDashboard card" onclick="clickHandler(this,\'posts\')"><div class="card-header red">POSTS</div><div class="card-body red">' + data.posts + '</div></div>' +
        '</div>');
}

function handleUsers(data) {
    data.unshift({name: 'Username', email: 'Email', createdOn: 'Created On'});
    rightContents.html(data.map((x, i) => '<div class="' + (i === 0 ? 'line-header line' : 'line') + '">' +
        '<span>' + x.name + '</span>' +
        '<span>' + x.email + '</span>' +
        '<span>' + x.createdOn + '</span>' +
        (i !== 0 ? '<span class="btn bgred" data-userid="' + x.id + '">Delete</span>' : '') +
        '</div>'));
}

function handlePosts(data) {
    data.unshift({name: 'Created By', email: 'Email', comment: 'Posts', createdOn: 'Created On'});
    rightContents.html(data.map((x, i) => '<div class="' + (i === 0 ? 'line-header line' : 'line') + '">' +
        '<span>' + x.name + '</span>' +
        '<span>' + x.email + '</span>' +
        '<span>' + x.comment + '</span>' +
        '<span>' + x.createdOn + '</span>' +
        (i !== 0 ? '<span href="javascript:void(0)" class="btn red" onclick="deletePost(this,'+x.postid+')">Delete</span>' : '') +
        '</div>'));
}

