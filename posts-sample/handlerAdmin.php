<?php
require_once './init.php';
require_once './helpers.php';

$loggedIn = false;
if (isset($_SESSION['loggedIn']) && isset($_SESSION['name'])) {
    $loggedIn = true;
}
global $conn;


if (isset($_POST['getData']) && $_POST['type'] == 'home') {
    $data=getAdminHome();
    exit($data);
}

if (isset($_POST['getData']) && $_POST['type'] == 'users') {
    $query="select id,email,name,createdOn from users order by id desc";
    $data=getAllFromTable($query);
    exit($data);
}


if (isset($_POST['getData']) && $_POST['type'] == 'posts') {
    $query="select a.id as postid,a.userid,b.name,b.email,b.createdOn,a.comment from posts a inner join users b ON a.userId=b.id order by a.id desc";
    $data=getAllFromTable($query);
    exit($data);
}

if (isset($_POST['getData']) && $_POST['type'] == 'replies') {
    $query="select a.id as replyid,a.userid,b.email,b.createdOn,a.comment from replies a inner join users b ON a.userId=b.id order by a.id desc";
    $data=getAllFromTable($query);
    exit($data);
}
