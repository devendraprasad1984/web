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
    return $rows;
}

function handleSave($data)
{
    global $success, $conn;
    $memid = $conn->real_escape_string($data['memid']);
    $time = $conn->real_escape_string($data['time']);
    $amount = $conn->real_escape_string($data['amount']);
    $remarks = $conn->real_escape_string($data['remarks']);
    $ip = 'ip & location';

    $sql = "INSERT INTO expenses(memid,date,amount,remarks,iploc) values('$memid','$time','$amount','$remarks','$ip')";
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
    $adminRow = returnDataset("select id from members where memkey='admin' and type='admin'");
    $adminid = $adminRow[0]['id'];
    $sql = "INSERT INTO expenses(memid,amount,remarks) values('$adminid','$amount','$remarks')";
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

    $result = returnDataset("select count(*) as count from members where memkey='$memid'");
    $count = $result[0]['count'];
    if ($count == 1) {
        echo $recordExists;
    } else {
        $sql = "INSERT INTO members(memkey,name,address,pic) values('$memid','$name','$address','$pic')";
        $result = $conn->query($sql);
        echo $success;
    }
//    mysqli_close($conn);
}

//function handlePullMembersList($data)
//{
//    $qur = "select id,concat(memkey,'  ',name) as name from members where type='member' order by name";
//    $rows = returnDataset($qur);
//    echo(json_encode($rows));
//}

function handleExpensesOnly($data)
{
    $qur = "select * from expenses where amount<0 order by `when` desc";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
}

function handleExpensesByMember($data)
{
    $qur = "select * from expenses where memid='${data['id']}' order by `when` desc";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
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
           from expenses e right outer join members m on e.memid = m.id
           where type = 'member' $searchByNameQur
           group by m.id
        ) A inner join members m ON A.id=m.id
        union all
        select 'expenses','z_expenses','',sum(coalesce(amount,0)) as amt from expenses where amount < 0
        order by name    ";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
}
