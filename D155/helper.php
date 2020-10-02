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
    global $conn;
    $search = $data['by'];
    $qur = "select a.* from expenses a
            where (concat('@',name) like '%$search%' or date like '%$search%' or amount like '%$search%' or remarks like '%$search%')
            order by  str_to_date(concat('01 ',a.date),'%d %M %Y') desc ,a.when desc";
//    ChromePhp::log($qur);
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    mysqli_close($conn);
    echo(json_encode($rows));
}

function handleSummary1($data)
{
    global $conn;
    $qur = "select concat(upper(name),' Ji') as name,sum(amount) as amt from expenses where amount>0 group by name union all
            select 'Paid outs',sum(amount) as amt from expenses where amount<0
            ";
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    mysqli_close($conn);
    echo(json_encode($rows));
}


function sendWhatsApp($data)
{
    ChromePhp::log('whatsapp data', $data);
    $username = "919582797772";
    $password = "";
    $wa = new WhatsProt($username, "WhatsApp", true);
    $wa->connect();
    //$wa->loginWithPassword($password);
    $no = "919582797772";
    $msg = "hello test automate message";
    try {
        $wa->sendMessage($no, $msg);
        echo 'Text Message Sent';
    } catch (Exception $e) {
        ChromePhp::log($e->getTrace());
        echo "ERROR : Text Message Sending Failed";
    }
}