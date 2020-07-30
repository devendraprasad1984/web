let commentId = 0;
let userComments = $('.userComments');
sessionData = JSON.parse(localStorage.getItem('session'));

$(document).ready(function () {
    // $('#idNumComments').text(max + ' Comments');
    $('#registerBtn').on('click', fnRegister);
    $('#loginBtn').on('click', fnLogin);
    // $('#addComment, #addReply').on('click', fnAddComments);
    // getPosts(0, undefined);
    handlePostsAndReplies();
})

function getPosts(start, max) {
    // console.log('start', start, 'max', max);
    if (parseInt(start) > parseInt(max)) {
        return;
    }

    $.ajax({
        url: 'index.php',
        method: 'post',
        dataType: 'text',
        data: {
            getPostsAndReplies: 1,
            start: parseInt(start)
        },
        success: function (data) {
            // console.log(data);
            userComments.html(data);
            // handlePostsAndReplies(false, data);
            // getPosts(parseInt(start) + 20, parseInt(max));
        },
        error: function (err) {
            console.log(err);
            userComments.html(err);
        }
    });
}

function handleReplies(posts, replies, latest) {
    console.log('posts:', posts, 'replies:', replies);
    let res = '';
    for (let row of posts) {
        // console.log('post:', row);
        res += '<div class="comment">';
        res += '<div class="userCommentTitle">Posted By: ' + row.name + ' <span class="time">' + row.createdOn + '</span></div>';
        res += '<div class="userComment">' + row.comment + ' <a class="badge" href=javascript:void(0)" data-commentID="' + row.id + '" onclick="reply(this)">REPLY</a></div>';
        res += replies.filter(x => x.postid === row.id.toString()).map(x => ''
            + '<div class="comment-replies">'
            + '<div class="userComment-reply">' + x.comment
            + '<a class="badge" href=javascript:void(0)" data-commentID="' + x.id + '" onclick="reply(this)">REPLY</a>'
            + '<span class="time-reply">' + x.name + ' replied on ' + x.createdOn + '</span>'
            + '</div>'
            + '</div>'
        ).join('');
        res += '</div>';
        res += '</div>';
    }
    if (latest)
        userComments.prepend(res);
    else
        userComments.append(res);
}

function handlePosts(posts, params) {
    $.ajax({
        url: './backend/api.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: (replies) => handleReplies(posts, replies, params.latest),
        error: function (err) {
            console.log(err);
        }
    });
}

async function handlePostsAndReplies() {
    $.ajax({
        url: './backend/api.php',
        method: 'post',
        dataType: 'json',
        data: {
            getPosts: 1,
            start: 0,
            latest: false
        },
        success: (posts) => handlePosts(posts, {getReplies: 1, latest: false, commentId: '*'}),
        error: function (err) {
            console.log(err);
        }
    });
}

function fnRegister() {
    let name = $('#userName').val();
    let email = $('#userEmail').val();
    let password = $('#userPassword').val();
    if (name !== '' && email !== '' && password !== '') {
        $.ajax({
            url: 'index.php',
            method: 'post',
            dataType: 'text',
            data: {
                register: 1,
                name, email, password
            },
            success: function (response) {
                // console.log(response);
                if (response === 'failedEmail') {
                    alert('plz insert valid email');
                } else if (response === 'failedUserExists') {
                    alert('user already exist');
                } else {
                    alert('you have been registered, once approved, you will be notified');
                    //window.location = window.location;
                }
            },
            error: function (response) {
                console.log(response);
                userComments.html(response);
            }
        });
    } else {
        alert('plz enter values');
    }
}


function fnLogin() {
    let email = $('#userLEmail').val();
    let password = $('#userLPassword').val();
    if (email !== '' && password !== '') {
        $.ajax({
            url: 'index.php',
            method: 'post',
            dataType: 'text',
            data: {
                login: 1,
                email, password
            },
            success: function (response) {
                console.log(response);
                if (response === 'failed') {
                    alert('plz check your login details');
                } else {
                    sessionData = response;
                    // localStorage.setItem(session, sessionData);
                    localStorage.setItem('session', sessionData);
                    window.location = window.location;
                }
            },
            error: function (response) {
                console.log(response);
                userComments.html(response);
            }
        });
    } else {
        alert('plz enter values');
    }
}


function fnAddComments(caller, isReply) {
    let comment = isReply ? $('#replyComment').val() : $('#mainComment').val();
    if (comment.length > 5) {
        $.ajax({
            url: 'index.php',
            method: 'post',
            dataType: 'text',
            data: {
                addComment: 1,
                userid: sessionData.userid || 0,
                comment,
                isReply,
                commentId
            },
            success: function (posts) {
                // console.log(caller,isReply,response);
                if (posts === 'notLoggedIn') {
                    alert('you are not logged in');
                    return;
                }

                // max++;
                // $('#idNumComments').text(max + ' Comments');
                if (!isReply) {
                    // userComments.prepend(response);
                    handlePosts(posts, {getReplies: 1, latest: true, commentId})
                    $('#mainComment').val("");
                } else {
                    commentId = 0;
                    $('#replyComment').val("");
                    $(".replyRow").hide();
                    $(".replyRow").parent().next().append(posts);
                }
            },
            error: function (response) {
                console.log(response);
                userComments.html(response);
            }
        });
    } else {
        alert('plz enter values');
    }
}

function reply(caller) {
    // console.log('reply from', caller);
    commentId = $(caller).attr('data-commentID');
    $(".replyRow").insertAfter(caller);
    $(".replyRow").show();
}
