<?php

$res = [];

//define('APP_ROOT','http://localhost/web/posts-sample/');

//$loggedIn = false;
$success = json_encode(array('status' => 'success'));
$failed = json_encode(array('status' => 'failed, not allowed'));

$server = $_SERVER['REMOTE_ADDR'];
if ($server == '::1' or $server == 'localhost' or $server == '127.0.0.1') {
    define('HOST', 'localhost:3306');
    define('USER', 'root');
    define('PWD', 'dpadmin');
    define('DB', 'rwasec8');
} else {
    define('HOST', 'localhost:3306');
    define('USER', 'wp_p9ii9');
    define('PWD', 'rbs1984#');
    define('DB', 'wp_8oy2w');
}

$conn = new mysqli(HOST, USER, PWD, DB);

function returnDataset($qur)
{
    global $conn;
//    $result = mysqli_query($conn, $qur);
//    ChromePhp::log($qur);
//    return mysqli_fetch_all($result);
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    mysqli_close($conn);
    return $rows;
}

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
//    global $conn;
    $search = $data['by'];
    $qur = "select * from expenses";
    if ($search == '>0' || $search == '<0')
        $qur .= " where amount" . $search;
    else
        $qur .= " where (concat('@',name) like '%$search%' or date like '%$search%' or amount like '%$search%' or remarks like '%$search%')";
    $qur .= " order by  str_to_date(concat('01 ', `date`), '%d %M %Y') desc ,`when` desc";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
}

function handleSummary1($data)
{
    $qur = "select name,sum(amount) as amt from expenses where amount > 0 group by name union all
            select 'Paid outs',sum(amount) as amt from expenses where amount < 0
            ";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
}
