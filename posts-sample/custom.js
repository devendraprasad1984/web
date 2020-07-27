let commentId = 0;
$(document).ready(function () {
    // $('#idNumComments').text(max + ' Comments');
    $('#registerBtn').on('click', fnRegister);
    $('#loginBtn').on('click', fnLogin);
    // $('#addComment, #addReply').on('click', fnAddComments);
    getCommentsFromDB(0, max);
})

function getCommentsFromDB(start, max) {
    // console.log('start', start, 'max', max);
    if (parseInt(start) > parseInt(max)) {
        return;
    }

    $.ajax({
        url: './index.php',
        method: 'post',
        dataType: 'text',
        data: {
            getAllposts: 1,
            start: parseInt(start)
        },
        success: function (response) {
            // console.log(response);
            $('.userComments').append(response);
            getCommentsFromDB(parseInt(start) + 20, parseInt(max));
        },
        error: function (response) {
            console.log(response)
        }
    });
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
                if (response === 'failedEmail') {
                    alert('plz insert valid email');
                } else if (response === 'failedUserExists') {
                    alert('user already exist');
                } else {
                    window.location = window.location;
                }
            },
            error: function (response) {
                console.log(response)
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
                // console.log(response);
                if (response === 'failed') {
                    alert('plz check your login details');
                } else {
                    window.location = window.location;
                }
            },
            error: function (response) {
                console.log(response)
            }
        });
    } else {
        alert('plz enter values');
    }
}


function fnAddComments(caller,isReply) {
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

                max++;
                $('#idNumComments').text(max + ' Comments');
                if (!isReply) {
                    $('.userComments').prepend(response);
                    $('#mainComment').val("");
                } else {
                    commentId = 0;
                    $('#replyComment').val("");
                    $(".replyRow").hide();
                    $(".replyRow").parent().next().append(response);
                }
            },
            error: function (response) {
                console.log(response)
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
