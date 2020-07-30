<?php
require './backend/init.php';
require './backend/helpers.php';

$loggedIn = false;
try {
    if ((isset($_POST['loggedIn']) && $_POST['loggedIn'] == 1)) {
        $loggedIn = true;
    }
    global $conn;
    if (isset($_POST['getData']) && $_POST['type'] == 'home' && $loggedIn==true) {
        $data = getAdminHome();
        exit($data);
    } else if (isset($_POST['getData']) && $_POST['type'] == 'users' && $loggedIn==true) {
        $searchText = $conn->real_escape_string($_POST['searchText']);
        $query = "select id,email,name,createdOn from users where (name like '%$searchText%' or email like '%$searchText%') order by id desc";
        $data = getAllFromTable($query);
        exit($data);
    } else if (isset($_POST['getData']) && $_POST['type'] == 'posts' && $loggedIn==true) {
        $searchText = $conn->real_escape_string($_POST['searchText']);
        $query = "select a.id as postid,a.userid,b.name,b.email,b.createdOn,a.comment from posts a inner join users b ON a.userId=b.id
    where (name like '%$searchText%' or email like '%$searchText%'  or comment like '%$searchText%')
    order by a.id desc";
        $data = getAllFromTable($query);
        exit($data);
    } else if (isset($_POST['getData']) && $_POST['type'] == 'replies' && $loggedIn==true) {
        $searchText = $conn->real_escape_string($_POST['searchText']);
        $query = "select a.id as replyid,a.userid,b.email,b.createdOn,a.comment from replies a inner join users b ON a.userId=b.id 
    where (email like '%$searchText%'  or comment like '%$searchText%')
    order by a.id desc";
        $data = getAllFromTable($query);
        exit($data);
    }
} catch (Exception $ex) {
    die($ex->getTraceAsString());
}
