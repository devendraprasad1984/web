<?php
require_once '../include.php';
try {
    $data = json_decode(file_get_contents('php://input'), true);
    handleOrderSave($data);
} catch (Exception $ex) {
    echo json_encode($ex);
}
