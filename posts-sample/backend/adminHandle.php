<?php
require_once './backend/init.php';
require_once './backend/helpers.php';

global $loggedIn;
try {
    if (isset($_SESSION['loggedIn']) && isset($_SESSION['name'])) {
        $loggedIn = true;
    }
    global $conn;
    if (isset($_POST['getData']) && $_POST['type'] == 'home') {
        $data = getAdminHome();
        exit($data);
    } elseif (isset($_POST['getData']) && $_POST['type'] == 'users') {
        $searchText = $conn->real_escape_string($_POST['searchText']);
        $query = "select id,email,name,createdOn from users where (name like '%$searchText%' or email like '%$searchText%') order by id desc";
        $data = getAllFromTable($query);
        exit($data);
    } elseif (isset($_POST['getData']) && $_POST['type'] == 'posts') {
        $searchText = $conn->real_escape_string($_POST['searchText']);
        $query = "select a.id as postid,a.userid,b.name,b.email,b.createdOn,a.comment from posts a inner join users b ON a.userId=b.id
    where (name like '%$searchText%' or email like '%$searchText%'  or comment like '%$searchText%')
    order by a.id desc";
        $data = getAllFromTable($query);
        exit($data);
    } elseif (isset($_POST['getData']) && $_POST['type'] == 'replies') {
        $searchText = $conn->real_escape_string($_POST['searchText']);
        $query = "select a.id as replyid,a.userid,b.email,b.createdOn,a.comment from replies a inner join users b ON a.userId=b.id 
    where (email like '%$searchText%'  or comment like '%$searchText%')
    order by a.id desc";
        $data = getAllFromTable($query);
        exit($data);
    }
} catch (Exception $ex) {
    exit($ex->getTraceAsString());
}
