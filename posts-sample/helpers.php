<?php
function createCommentRows($data, $isReply)
{
    global $conn;
    $response = '<div class="comment">';
    $response .= '<div class="user"> ' . ($isReply ? 'Replied: ' : 'Commented: ') . $data['name'] . '
                    <span class="time" style="float: right">' . $data['createdOn'] . '</span>
                    <div class="userComment">' . $data['comment'] . ' <a class="badge" href=javascript:void(0)" data-commentID="' . $data['id'] . '" onclick="reply(this)">REPLY</a></div>
                    <div class="replies">
                 ';
    $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id where a.commentId='" . $data['id'] . "' order by a.id";
    $sql = $conn->query($queryStr);
    while ($dataR = $sql->fetch_assoc())
        $response .= createCommentRows($dataR, true);
    $response .= '</div></div>';
    return $response;
}

function pullAllComments($conn, $start, $latestOnly, $isReply)
{
//    $numComments = fetchCommentsCount($conn);
    if ($latestOnly)
        if ($isReply)
            $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id order by a.id desc limit 1";
        else
            $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from comments a inner join users b ON a.userId=b.id order by a.id desc limit 1";
    else
        $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from comments a inner join users b ON a.userId=b.id order by a.id desc limit $start,20";

    $sql = $conn->query($queryStr);
    $res = '';
    while ($data = $sql->fetch_assoc())
        $res .= createCommentRows($data, $isReply);
    return $res;
}

if (isset($_POST['getAllComments'])) {
    $start = $conn->real_escape_string($_POST['start']);
    $numComments = fetchCommentsCount();
    exit(pullAllComments($conn, $start, false, false));
}

function fetchCommentsCount()
{
    global $conn;
    $sql = $conn->query("select count(id) as num from comments");
    return $sql->fetch_assoc()['num'];
}

