<?php
require_once './init.php';
require_once './helpers.php';

$loggedIn = false;
if (isset($_SESSION['loggedIn']) && isset($_SESSION['name'])) {
    $loggedIn = true;
}
global $conn;

if (isset($_POST['getData']) && $_POST['type']=='users') {
    $data=array('user1','user2','user3');
    $response=json_encode($data, JSON_PRETTY_PRINT);
    exit($response);
}


if (isset($_POST['getData']) && $_POST['type']=='posts') {
    $data=array('Post1','post2','post3');
    $response=json_encode($data, JSON_PRETTY_PRINT);
    exit($response);
}

if (isset($_POST['getData']) && $_POST['type']=='replies') {
    $data=array('reply1','reply2','reply3');
    $response=json_encode($data, JSON_PRETTY_PRINT);
    exit($response);
}
