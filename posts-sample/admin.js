const rightContents = $('#rightContents');

function displayRightHeading(caller) {
    rightContents.prev().html('<h3>' + caller.innerText + ' Listing</h3>');
}

function clickHandler(caller,type) {
    displayRightHeading(caller);
    $.ajax({
        url: './admin.php',
        method: 'post',
        dataType: 'json',
        data: {
            getData: 1,
            type
        },
        success: function (data) {
            if(type==='users') handleUsers(data);
            if(type==='posts') handlePosts(data);
            if(type==='replies') handleReplies(data);
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function handleUsers(data){
    console.log(data);
}
function handlePosts(data){
    console.log(data);
}
function handleReplies(data){
    console.log(data);
}
