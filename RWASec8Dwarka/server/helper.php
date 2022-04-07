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
    mysqli_close($conn);
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
    mysqli_close($conn);
}

function handleSaveExpense($data)
{
    global $success, $conn;
    $amount = $conn->real_escape_string($data['amount']);
    $remarks = $conn->real_escape_string($data['reason']);
    $amount = 0 - $amount;
    $adminid = '15';

    $sql = "INSERT INTO expenses(memid,amount,remarks) values('$adminid','$amount','$remarks')";
    $result = $conn->query($sql);
    echo $success;
    mysqli_close($conn);
}


function handleSaveMember($data)
{
    global $success, $conn, $recordExists;
    $memid = $conn->real_escape_string($data['memberid']);
    $name = $conn->real_escape_string($data['name']);
    $address = $conn->real_escape_string($data['address']);
    $pic = '';

    $selsql = "select count(*) as count from members where memkey='$memid'";
    $result = $conn->query($selsql)->fetch_all(MYSQLI_ASSOC);
    $count = $result[0]['count'];
    if ($count == 1) {
        echo $recordExists;
    } else {
        $sql = "INSERT INTO members(memkey,name,address,pic) values('$memid','$name','$address','$pic')";
        $result = $conn->query($sql);
        echo $success;
    }
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

//function handleExpensesReport($data)
//{
//    $search = $data['by'];
//    $qur = "select * from expenses";
//    if ($search == '>0' || $search == '<0')
//        $qur .= " where amount" . $search;
//    else
//        $qur .= " where (concat('@',memid) like '%$search%' or date like '%$search%' or amount like '%$search%' or remarks like '%$search%')";
//    $qur .= " order by  str_to_date(concat('01 ', `date`), '%d %M %Y') desc ,`when` desc";
//    $rows = returnDataset($qur);
//    echo(json_encode($rows));
//}

function handlePullMembersList($data)
{
    $qur = "select id,concat(memkey,'  ',name) as name from members where type='member' order by name";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
}

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
    $searchByNameQur="";
    if ($name <> '') {
        $searchByNameQur = " and (name like '%$name%' OR memkey like '%$name%')";
    }
    $qur = "
        select memid,name,memkey,sum(coalesce(amount,0)) as amount from expenses e
        right outer join members m on e.memid=m.id
        where type='member' $searchByNameQur 
        group by e.memid,m.name,memkey
        union all
        select 'expenses','z_expenses','',sum(coalesce(amount,0)) as amt from expenses where amount < 0
        order by name
    ";
    $rows = returnDataset($qur);
    echo(json_encode($rows));
}
