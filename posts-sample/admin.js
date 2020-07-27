const rightContents = $('#rightContents');

$(document).ready(function () {
    clickHandler(undefined, 'home');
})

function displayRightHeading(caller) {
    rightContents.prev().html('<h3>' + caller.innerText + ' Listing</h3>');
}

function clickHandler(caller, type) {
    if (typeof caller !== 'undefined') displayRightHeading(caller);

    $.ajax({
        url: './admin.php',
        method: 'post',
        dataType: 'json',
        data: {
            getData: 1,
            type
        },
        success: function (data) {
            console.log(type, data);
            if (type === 'home') handleHome(data);
            if (type === 'users') handleUsers(data);
            if (type === 'posts') handlePosts(data);
            if (type === 'replies') handleReplies(data);
        },
        error: function (err) {
            let text = err.responseText;
            console.error(text);
            rightContents.html(text);
        }
    });
}

function handleHome(data) {
    rightContents.html('<div class="adminDashboard">' +
        '<span onclick="clickHandler(this,\'users\')">USERS(' + '<b>' + data.users + '</b>' + ')</span>' +
        '<span onclick="clickHandler(this,\'posts\')">POSTS(' + '<b>' + data.posts + '</b>' + ')</span>' +
        '<span onclick="clickHandler(this,\'replies\')">REPLIES(' + '<b>' + data.replies + '</b>' + ')</span>' +
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
        (i !== 0 ? '<span class="btn bgred" data-userid="' + x.userid + '" data-postid="' + x.postid + '">Delete</span>' : '') +
        '</div>'));
}

function handleReplies(data) {
    data.unshift({email: 'Replied By', comment: 'Reply', createdOn: 'Created On'});
    rightContents.html(data.map((x, i) => '<div class="' + (i === 0 ? 'line-header line' : 'line') + '">' +
        '<span>' + x.email + '</span>' +
        '<span>' + x.comment + '</span>' +
        '<span>' + x.createdOn + '</span>' +
        (i !== 0 ? '<span class="btn bgred" data-userid="' + x.userid + '" data-replyid="' + x.replyid + '">Delete</span>' : '') +
        '</div>'));
}
