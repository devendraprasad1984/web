<?php
require_once '../include.php';
try {
    $data = $_GET;
//    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['agentid'];
    pullTable('misc_order_item', "where TIMESTAMPDIFF(MONTH, date, NOW())<=3 and agentid=$id", "order by date desc");
} catch (Exception $ex) {
    echo json_encode($ex);
}

