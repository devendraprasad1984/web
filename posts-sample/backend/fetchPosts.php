<?php
session_start();
require_once 'init.php';
require_once 'helpers.php';

$loggedIn=checkIfLoggedIn();
if($loggedIn){
    global $conn;
    $queryStr = "SELECT a.*,b.name,b.email FROM xposts a inner join users b ON a.userid=b.id ORDER BY comment_id desc,parent_comment_id desc";
    $sql = $conn->query($queryStr);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    mysqli_close($conn);
    echo(json_encode($rows));
}
?>