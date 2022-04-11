<?php

$res = [];

//define('APP_ROOT','http://localhost/web/posts-sample/');

//$loggedIn = false;
$success = json_encode(array('status' => 'success'));
$failed = json_encode(array('status' => 'failed, not allowed'));
$recordExists = json_encode(array('status' => 'Record already exists, cannot add more'));

$server = $_SERVER['REMOTE_ADDR'];
if ($server == '::1' or $server == 'localhost' or $server == '127.0.0.1') {
    define('HOST', 'localhost:3306');
    define('USER', 'root');
    define('PWD', null);
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
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    return json_encode($rows);
}

function handleSave($data)
{
    global $success, $conn;
    $memid = $conn->real_escape_string($data['memid']);
    $time = $conn->real_escape_string($data['time']);
    $amount = $conn->real_escape_string($data['amount']);
    $remarks = $conn->real_escape_string($data['remarks']);
    $ip = 'ip & location';

    $sql = "INSERT INTO rwa_expenses(memid,date,amount,remarks,iploc) values('$memid','$time','$amount','$remarks','$ip')";
    $result = $conn->query($sql);
    echo $success;
//    mysqli_close($conn);
}

function handleSaveExpense($data)
{
    global $success, $conn;
    $amount = $conn->real_escape_string($data['amount']);
    $remarks = $conn->real_escape_string($data['reason']);
    $amount = 0 - $amount;
    $adminRow = returnDataset("select id from rwa_members where memkey='admin' and type='admin'");
    $decoded = json_decode($adminRow);
    $adminid = $decoded[0]->id;
    $sql = "INSERT INTO rwa_expenses(memid,amount,remarks) values('$adminid','$amount','$remarks')";
    $result = $conn->query($sql);
    echo $success;
//    mysqli_close($conn);
}


function handleSaveMember($data)
{
    global $success, $conn, $recordExists;
    $memid = $conn->real_escape_string($data['memberid']);
    $name = $conn->real_escape_string($data['name']);
    $address = $conn->real_escape_string($data['address']);
    $pic = '';

    $result = returnDataset("select count(*) as count from rwa_members where memkey='$memid'");
    $count = json_decode($result)[0]->count;
    if ($count == 1) {
        echo $recordExists;
    } else {
        $sql = "INSERT INTO rwa_members(memkey,name,address,pic) values('$memid','$name','$address','$pic')";
        $result = $conn->query($sql);
        echo $success;
    }
//    mysqli_close($conn);
}

function handleExpensesOnly($data)
{
    $qur = "
        select * from rwa_expenses where amount<0 order by `when` desc
    ";
    $rows = returnDataset($qur);
    echo $rows;
}

function handleExpensesByMember($data)
{
    $qur = "select * from rwa_expenses where memid='${data['id']}' order by `when` desc";
    $rows = returnDataset($qur);
    echo($rows);
}

function handleExpensesGroupByMemId($data)
{
    global $conn;
    $name = $conn->real_escape_string($data['name']);
    $searchByNameQur = "";
    if ($name <> '') {
        $searchByNameQur = " and (name like '%$name%' OR memkey like '%$name%')";
    }
    $qur = "
        select m.id,m.name,m.memkey,A.amount from (
           select m.id, sum(coalesce(amount, 0)) as amount
           from rwa_expenses e right outer join rwa_members m on e.memid = m.id
           where type = 'member' and isactive=1  $searchByNameQur
           group by m.id
        ) A inner join rwa_members m ON A.id=m.id
        union all
        select 'expenses','z_expenses','',sum(coalesce(amount,0)) as amt from rwa_expenses where amount < 0
        union all
        select 'credits','z_credits','',sum(coalesce(amount,0)) as amt from rwa_expenses where amount > 0
        union all
        select 'members','z_members','',count(*) from rwa_members where type='member'
        order by name
        ";
    $rows = returnDataset($qur);
    echo $rows;
}


function handleLogin($data)
{
    global $failed, $conn;
    $id = $conn->real_escape_string($data['id']);
    $pass = $conn->real_escape_string($data['pwd']);
    $rows = returnDataset("select id,username,type,`when` from rwa_admin where username='$id' and password='$pass'");
    if (json_decode($rows, true)) {
        echo $rows;
    } else {
        echo $failed;
    }
}

function handleLoginGet($data)
{
    global $failed, $conn, $success;
    $id = $conn->real_escape_string($data['id']);
    $user = $conn->real_escape_string($data['user']);
    $rows = returnDataset("select id,username,type,`when` from rwa_admin where id='$id' and username='$user'");
    if (json_decode($rows, true)) {
        echo $success;
    } else {
        echo $failed;
    }
}

function handlePasswordChange($data)
{
    global $success, $conn;
    $id = $conn->real_escape_string($data['id']);
    $username = $conn->real_escape_string($data['user']);
    $password = $conn->real_escape_string($data['pwd']);
    $sql = "update rwa_admin set password='$password' where id='$id' and username='$username'";
    $result = $conn->query($sql);
    echo $success;
}

