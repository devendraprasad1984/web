<?php
require_once '../include.php';
try {
    $data = $_GET;
    $id=$data['agentid'];
    pullTable('misc_order_item', "where agentid=$id");
} catch (Exception $ex) {
    echo json_encode($ex);
}

