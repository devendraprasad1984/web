let commentId = 0;
let userComments = $('.userComments');
let sessionData = JSON.parse(localStorage.getItem('session'));

$(document).ready(function () {
    $('#registerBtn').on('click', fnRegister);
    $('#loginBtn').on('click', fnLogin);
    listComment();
})

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

function postReply(caller,id) {
    commentId = id;
    $(".replyRow").insertAfter(caller);
    $(".replyRow").show();
}

function fnAddComments(caller, isReply) {
    if (typeof sessionData === "undefined" || sessionData === null) {
        alert('you are not logged in');
        return;
    }
    $("#comment-message").css('display', 'none');
    let comment = isReply ? $('#replyComment').val() : $('#mainComment').val();

    $.ajax({
        url: "./backend/addPosts.php",
        data: {
            comment_id: commentId,
            comment,
            loggedIn: sessionData.loggedIn,
            userid: sessionData.userid
        },
        type: 'post',
        success: function (response) {
            let result = eval('(' + response + ')');
            if (response) {
                $("#comment-message").css('display', 'inline-block');
                $("#name").val("");
                $("#comment").val("");
                $("#commentId").val("");
                listComment();
            } else {
                alert("Failed to add comments !");
                return false;
            }
        }
    });
};

function listComment() {
    $.post("./backend/fetchPosts.php",
        function (data) {
            data = JSON.parse(data);
            $("#idNumComments").html(data.length+' Messages Found.');
            let comments = "";
            let replies = "";
            let parent = -1;
            let list = $("<ul class='outer-comment'>");
            let item = $("<li>").html(comments);
            for (let i = 0; (i < data.length); i++) {
                let commentId = data[i]['comment_id'];
                parent = data[i]['parent_comment_id'];
                if (parent == "0") {
                    comments = "<div class='comment'>" +
                        "<div class='userCommentTitle'><span>" + data[i]['name'] + " </span> <span class='time'>" + data[i]['date'] + "</span></div>" +
                        "<div class='userComment'>" + data[i]['comment'] + " <a class='purple' onClick='postReply(this," + commentId + ")'>Reply</a></div>" +
                        "</div>";

                    let item = $("<li>").html(comments);
                    list.append(item);
                    let reply_list = $('<ul>');
                    item.append(reply_list);
                    listReplies(commentId, data, reply_list);
                }
            }
            $("#userComments").html(list);
        });
}

function listReplies(commentId, data, list) {
    for (let i = 0; (i < data.length); i++) {
        if (commentId == data[i].parent_comment_id) {
            let comments = "<div class='comment'>" +
                "<div class='userReplyTitle'><span class='time-reply'>" + data[i]['name'] + ' replied on ' + data[i]['date'] + "</span></div>" +
                "<div class='userComment-reply'><span>" + data[i]['comment'] + "</span> <a class='purple' onClick='postReply(this," + data[i]['comment_id'] + ")'>Reply</a></div>" +
                "</div>";
            let item = $("<li>").html(comments);
            let reply_list = $('<ul>');
            list.append(item);
            item.append(reply_list);
            listReplies(data[i].comment_id, data, reply_list);
        }
    }
}