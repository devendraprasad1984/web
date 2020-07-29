let commentId = 0;
let userComments = $('.userComments');

$(document).ready(function () {
    // $('#idNumComments').text(max + ' Comments');
    $('#registerBtn').on('click', fnRegister);
    $('#loginBtn').on('click', fnLogin);
    // $('#addComment, #addReply').on('click', fnAddComments);
    // getPosts(0, max);
    getPosts(0);
})

function getPosts(start, max) {
    // console.log('start', start, 'max', max);
    if (parseInt(start) > parseInt(max)) {
        return;
    }

    $.ajax({
        url: './backend/api.php',
        method: 'post',
        dataType: 'text',
        data: {
            getPostsAndReplies: 1,
            start: parseInt(start)
        },
        success: function (data) {
            console.log(data);
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

async function handlePostsAndReplies(isreply, data) {
    if (JSON.parse(data).length === 0) return;
    data = JSON.parse(data);
    let res = '';
    for (let row of data) {
        // console.log('post:', row);
        res += (isreply === false ? '<div class="comment">' : '<div class="comment-replies">');
        res += (isreply === false ? '<div class="userCommentTitle">Posted By: ' + row.name + ' <span class="time">' + row.createdOn + '</span></div>' : '<div class="userReplyTitle"> ' + row.name + ' replied on ' + row.createdOn + '</div>');
        res += '<div class="userComment">' + row.comment + ' <a class="badge" href=javascript:void(0)" data-commentID="' + row.id + '" onclick="reply(this)">REPLY</a></div>';
        let params={
            method:'post',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                getReplies: 1,
                commentId: parseInt(row.id)
            })
        }
        let call1=await fetch('./backend/api.php', params);
        let call2=await call1.text();
        console.log(call1,call2);
        //console.log(replies);
        res += '</div></div>';
    }
    userComments.append(res);
}

function fnRegister() {
    let name = $('#userName').val();
    let email = $('#userEmail').val();
    let password = $('#userPassword').val();
    if (name !== '' && email !== '' && password !== '') {
        $.ajax({
            url: './index.php',
            method: 'post',
            dataType: 'text',
            data: {
                register: 1,
                name, email, password
            },
            success: function (response) {
                console.log(response);
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
            url: './index.php',
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
            url: './index.php',
            method: 'post',
            dataType: 'text',
            data: {
                addComment: 1,
                comment,
                isReply,
                commentId
            },
            success: function (response) {
                // console.log(caller,isReply,response);
                if (response === 'notLoggedIn') {
                    alert('you are not logged in');
                    return;
                }

                // max++;
                // $('#idNumComments').text(max + ' Comments');
                if (!isReply) {
                    userComments.prepend(response);
                    $('#mainComment').val("");
                } else {
                    commentId = 0;
                    $('#replyComment').val("");
                    $(".replyRow").hide();
                    $(".replyRow").parent().next().append(response);
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
