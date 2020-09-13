<?php

$res = [];
$conn = new mysqli(host, user, pwd, db);

function getArrayAsString($arr)
{
    $str = '';
    foreach ($arr as $v) {
        $str .= $v . ', ';
    }
    return $str;
}

//function handleSave($data)
//{
//    global $success, $conn;
//    $name = $conn->real_escape_string($data['name']);
//    $time = $conn->real_escape_string($data['time']);
//    $amount = $conn->real_escape_string($data['amount']);
//    $remarks = $conn->real_escape_string($data['remarks']);
//    $ip = 'ip & location';
//
//    $sql = "INSERT INTO expenses(name,date,amount,remarks,iploc) values('$name','$time','$amount','$remarks','$ip')";
//    $result = $conn->query($sql);
//    echo $success;
//    mysqli_close($conn);
//}

//function handleDelete($data)
//{
//    global $success, $conn;
//    $id = $conn->real_escape_string($data['id']);
//
//    $sql = "delete from expenses where id=$id";
//    $result = $conn->query($sql);
//    echo $success;
//    mysqli_close($conn);
//}
//
//function handleExpensesReport($data)
//{
//    global  $conn;
//    $search=$data['by'];
//    $qur = "select a.* from expenses a
//            where (concat('@',name) like '%$search%' or date like '%$search%' or amount like '%$search%' or remarks like '%$search%')
//            order by a.when desc";
////    ChromePhp::log($qur);
//    $sql = $conn->query($qur);
//    $rows = $sql->fetch_all(MYSQLI_ASSOC);
//    mysqli_free_result($sql);
//    mysqli_close($conn);
//    echo(json_encode($rows));
//
//}


function handleContactUs($data)
{
    global $success;
    ChromePhp::log('from handler',$data);
//    $data['name'] = $rejectedUser->username;
//    $data['email'] = $rejectedUser->email;
//    $data['emailtype'] = "userRejectEmail";
//    sendEmail($data);
    $success['msg'] = 'email sent';
    echo json_encode($success);
}