<?php
$nodatafound = "no data found or some fetch error, contact admin";

function pullTableRows($table, $where = '', $orderBy = '', $fld = '*')
{
    global $conn;
    $qur = "select $fld from $table $where $orderBy";
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    return $rows;
}

function pullTableRowsByQuery($query)
{
    global $conn;
    $sql = $conn->query($query);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    return $rows;
}

function ifExists($tableObject, $where)
{
    global $conn;
    $qur = "select count(*) as num from $tableObject $where";
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    return $rows;
}

function pullTable($table, $where = '', $orderBy = '', $fld = '*')
{
    global $conn;
    $qur = "select $fld from $table $where $orderBy";
    $sql = $conn->query($qur);
    $rows = $sql->fetch_all(MYSQLI_ASSOC);
    mysqli_free_result($sql);
    if ($conn) mysqli_close($conn);
    echo(json_encode($rows));
}

function handleSupportQueries($data)
{
    global $conn, $success, $failed;
    $name = $conn->real_escape_string($data['name']);
    $mobile = $conn->real_escape_string($data['mobile']);
    $email = $conn->real_escape_string($data['email']);
    $queries = $conn->real_escape_string($data['query']);
    $agentid = $conn->real_escape_string($data['agentid']);
    $query = "insert into supportqueries(name, mobile, email, query, agentid) values('$name','$mobile','$email','$queries',$agentid)";
    $result = $conn->query($query);
    if ($conn) mysqli_close($conn);
//    $response['query']=$query;
//    echo json_encode($response);
    echo $result ? $success : $failed;
}

function handleMiscOrder($data)
{
    global $conn, $success, $failed;
    $orders = $conn->real_escape_string($data['orders']);
    $remarks = $conn->real_escape_string($data['remarks']);
    $agentid = $conn->real_escape_string($data['id']);
    $query = "insert into misc_order_item(agentid, orderItems, remarks) values($agentid,'$orders','$remarks')";
    $result = $conn->query($query);
    if ($conn) mysqli_close($conn);
//    $response['query']=$query;
//    echo json_encode($response);
    echo $result ? $success : $failed;
}

function handleCancelOrder($data)
{
    global $conn, $success, $failed;
//    $successX = ["status" => "success"];
//    $successX['data'] = $data;
    $isCancel = $data['cancel'];
    $type = $data['type'];
    $id = $data['id'];
    $agentid = $data['agentid'];
    $result = false;
    if ($type == 'misc') {
        $qur = "update misc_order_item set state='cancelled' where id=$id and agentid=$agentid";
        $result = $conn->query($qur);
    }
    if ($conn) mysqli_close($conn);
//    echo json_encode($successX);
    echo $result ? $success : $failed;
}


function handleAgentValidation($data)
{
    global $conn, $failed;
    $isAgent = $data['agent'];
    $isValidate = $data['validate'];
    $result = false;
    $success1 = ['status' => 'success'];
    if ($isAgent == 1 && $isValidate == 1) {
        $guid = $data['pin'];
        $isOk = ifExists('dealers', "where guid='$guid'")[0]['num'];
        if ($isOk == "1") {
            $row = pullTableRowsByQuery("select a.*,a2.type as xtype from dealers a inner join agenttype a2 on a.type = a2.id where a.guid='$guid'")[0];
            $success1["info"] = $row;
            $result = true;
        }
    }
    if ($conn) mysqli_close($conn);
    echo $result ? json_encode($success1) : $failed;
}


function handleForgotAgentCode($data)
{
    global $conn, $failed, $success;
    $isAgent = $data['agent'];
    $isForgot = $data['forgot'];
    if ($isAgent == 1 && $isForgot == 1) {
        $successUpdated = array('status' => 'success');
        $successUpdated['data'] = $data;
        $pin = $data['pin'];
        $isOk = ifExists('dealers', "where agentid='$pin'")[0]['num'];
        $successUpdated['isok'] = $isOk;
        $result = false;
        if ($isOk == "1") {
            $rows = pullTableRows('dealers', "where agentid='$pin'")[0];
            $successUpdated['rows'] = $rows;
            $objMail = ['emailtype' => 'forgotAgentMail'];
            $objMail['name'] = $rows['agentid'] . ' / ' . $rows['name'];
            $objMail['guid'] = $rows['guid'];
            $objMail['agentid'] = $rows['agentid'];
            $objMail['email'] = $rows['email'];
            $successUpdated['objmail'] = $objMail;
            $result = sendEmail($objMail);
        }
    }
    if ($conn) mysqli_close($conn);
    echo $result ? $success : $failed;
//    echo json_encode($successUpdated);
}





