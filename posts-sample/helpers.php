<?php
function createCommentRows($data, $isReply)
{
    global $conn;
    $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id where a.commentId='" . $data['id'] . "' order by a.id";

    $response = !$isReply ? '<div class="comment">' : '<div class="comment-replies">';
    $response .= !$isReply ? '<div class="userCommentTitle"> ' . 'Commented By: ' . $data['name']. '<span class="time">'.$data['createdOn'].'</span>' . '</div>' : '<div class="userReplyTitle"> ' .  $data['name'].' replied on '.$data['createdOn'] . '</div>';
    $response .= '<div class="userComment">' . $data['comment'] . ' <a class="badge" href=javascript:void(0)" data-commentID="' . $data['id'] . '" onclick="reply(this)">REPLY</a></div>';
    $response .= '<div class="replies">';

    $sql = $conn->query($queryStr);
    while ($dataR = $sql->fetch_assoc())
        $response .= createCommentRows($dataR, true);
    $response .= '</div></div>';

    return $response;
}

function pullAllposts($start, $latestOnly, $isReply)
{
    global $conn;
    if ($latestOnly)
        if ($isReply == true || $isReply == 1)
            $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id order by a.id desc limit 1";
        else
            $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from posts a inner join users b ON a.userId=b.id order by a.id desc limit 1";
    else
        $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from posts a inner join users b ON a.userId=b.id order by a.id desc limit $start,20";

    $sql = $conn->query($queryStr);
    $res = '';
    while ($data = $sql->fetch_assoc())
        $res .= createCommentRows($data, $isReply);
    return $res;
}

function fetchpostsCount()
{
    global $conn;
    $sql = $conn->query("select count(id) as num from posts");
    return $sql->fetch_assoc()['num'];
}

