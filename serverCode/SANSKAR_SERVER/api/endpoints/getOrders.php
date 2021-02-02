<?php
require_once '../include.php';
try {
    $data = $_GET;
    $id = $data['agentid'];
    $type = $data['type'];
    if ($type == 'history') pullTable('misc_order_item', "where agentid=$id", "order by date desc");
    if ($type == '3m') pullTable('misc_order_item', "where (TIMESTAMPDIFF(MONTH, date, NOW())<=3 or state<>'success') and agentid=$id", "order by date desc");

} catch (Exception $ex) {
    echo json_encode($ex);
}

