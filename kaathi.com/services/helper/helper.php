<?php

$res = [];
$conn = new mysqli(host, user, pwd, db);

function getArrayAsString($delim, $arr)
{
//    $output = implode($delim, array_map(
//        function ($v, $k) {
//            return sprintf("%s='%s'", $k, $v);
//        },
//        $arr,
//        array_keys($arr)
//    ));
    $output = implode($delim, $arr);
    return $output;
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
    global $success, $conn;
    $ip = $_SERVER['REMOTE_ADDR'];
    $xdata = getArrayAsString(', ', $data);
    $sql = "INSERT INTO queries(iploc, data) values('$ip','$xdata')";
    $result = $conn->query($sql);
    mysqli_close($conn);
//    ChromePhp::log('from handler',$data);
    $data['emailtype'] = "contact-email";
    sendEmail($data);
    $success['msg'] = 'response recorded, check your email, we will get back to you';
    echo json_encode($success);
}