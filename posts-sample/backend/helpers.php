<?php
//require_once 'init.php';

function createCommentRows($data, $isReply)
{
    try {
        global $conn;
        $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id where a.commentId='" . $data['id'] . "' order by a.id";

        $response = !$isReply ? '<div class="comment">' : '<div class="comment-replies">';
        $response .= !$isReply ? '<div class="userCommentTitle"> ' . 'Posted By: ' . $data['name'] . '<span class="time">' . $data['createdOn'] . '</span>' . '</div>' : '<div class="userReplyTitle"> ' . $data['name'] . ' replied on ' . $data['createdOn'] . '</div>';
        $response .= '<div class="userComment">' . $data['comment'] . ' <a class="badge" href=javascript:void(0)" data-commentID="' . $data['id'] . '" onclick="reply(this)">REPLY</a></div>';
        $response .= '<div class="replies">';

        $sql = $conn->query($queryStr);
        while ($dataR = $sql->fetch_assoc())
            $response .= createCommentRows($dataR, true);
        $response .= '</div></div>';

        return $response;
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}

function pullAllposts($start, $latestOnly, $isReply)
{
    try {
        global $conn;
        if ($latestOnly)
            if ($isReply == true || $isReply == 1)
                $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id order by a.id desc limit 1";
            else
                $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from posts a inner join users b ON a.userId=b.id order by a.id desc limit 1";
        else
            $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from posts a inner join users b ON a.userId=b.id order by a.id desc";

        $sql = $conn->query($queryStr);
        $res = '';
        while ($data = $sql->fetch_assoc())
            $res .= createCommentRows($data, $isReply);
        return $res;
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}

function pullPosts($start)
{
    try {
        global $conn;
        $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from posts a inner join users b ON a.userId=b.id order by a.id desc";
        $sql = $conn->query($queryStr);
        $rows = array();
        while ($row = $sql->fetch_assoc())
            $rows[] = $row;
        return json_encode($rows);
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}
function pullReplies($commentId)
{
    try {
        global $conn;
        $queryStr = "select a.id,name,comment,date_format(a.createdOn,'%Y-%m%-%d') as createdOn from replies a inner join users b ON a.userId=b.id where a.commentId=" . filter_var($commentId,FILTER_SANITIZE_NUMBER_INT ). " order by a.id desc";
        $sql = $conn->query($queryStr);
        $rows = array();
        while ($row = $sql->fetch_assoc())
            $rows[] = $row;
        return json_encode($rows);
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}
function fetchpostsCount()
{
    try {
        global $conn;
        $sql = $conn->query("select count(id) as num from posts");
        return $sql->fetch_assoc()['num'];
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}


function getAllFromTable($query)
{
    try {
        global $conn;
        $sql = $conn->query($query);
        $rows = array();
        while ($row = $sql->fetch_assoc())
            $rows[] = $row;
        return json_encode($rows);
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}


function getAdminHome()
{
    try {
        global $conn;
        $rows = array();
        $sql = $conn->query('select count(id) as num from users');
        $rows['users'][] = $sql->fetch_assoc()['num'];
        $sql = $conn->query('select count(id) as num from posts');
        $rows['posts'][] = $sql->fetch_assoc()['num'];
        $sql = $conn->query('select count(id) as num from replies');
        $rows['replies'][] = $sql->fetch_assoc()['num'];
        return json_encode($rows);
    } catch (Exception $ex) {
        return $ex->getTraceAsString();
    }
}