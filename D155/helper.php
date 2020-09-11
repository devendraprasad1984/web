<?php

$res = [];

//define('APP_ROOT','http://localhost/web/posts-sample/');

//$loggedIn = false;
$success = json_encode(array('status' => 'success'));
$failed = json_encode(array('status' => 'failed, not allowed'));

$server = $_SERVER['REMOTE_ADDR'];
if ($server == '::1' or $server == 'localhost' or $server == '127.0.0.1') {
    define('host', 'localhost:3306');
    define('user', 'root');
    define('pwd', 'dpadmin');
    define('db', 'd155');
} else {
    define('host', 'localhost:3306');
    define('user', 'wp_p9ii9');
    define('pwd', 'rbs1984#');
    define('db', 'wp_8oy2w');
}

$conn = new mysqli(host, user, pwd, db);


function handleSave($data)
{
    global $success, $conn;
    $name = $conn->real_escape_string($data['name']);
    $time = $conn->real_escape_string($data['time']);
    $amount = $conn->real_escape_string($data['amount']);
    $remarks = $conn->real_escape_string($data['remarks']);
    $ip = 'ip & location';

    $sql = "INSERT INTO expenses(name,date,amount,remarks,iploc) values('$name','$time','$amount','$remarks','$ip')";
    $result = $conn->query($sql);
    echo $success;
    mysqli_close($conn);
}

function handleDelete($data)
{
    global $success, $conn;
    $id = $conn->real_escape_string($data['id']);

    $sql = "delete from expenses where id=$id";
    $result = $conn->query($sql);
    echo $success;
    mysqli_close($conn);
}

function handleExpensesReport($data)
{
    global  $conn;
    $search=$data['by'];
    $qur = "select a.* from expenses a
            where (concat('@',name) like '%$search%' or date like '%$search%' or amount like '%$search%' or remarks like '%$search%')
            order by a.when desc";
//    ChromePhp::log($qur);
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    mysqli_close($conn);
    echo(json_encode($rows));
}