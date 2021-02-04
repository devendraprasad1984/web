<?php
require_once '../include.php';
try {
    $data = $_GET;
    $id = $data['agentid'];
    $type = $data['type'];
    $data = array();
    $misc = array();
    $orders = array();
    $ord = "order by date desc";
    if ($type == 'history') {
        $whr = "where agentid=$id";
    }
    if ($type == '3m') {
        $whr = "where (TIMESTAMPDIFF(MONTH, date, NOW())<=3 or state<>'success') and agentid=$id";
    }
    $qur = "select a.*,b.orderItems from orders a
            inner join (select orderid,group_concat(concat(qty,' pieces of ',p.name,' = ',calcline) separator '~') as orderItems 
            from orderitems oi inner join products p ON p.id=oi.prodid group by orderid) b on a.id=b.orderid
            $whr $ord";

    $misc = pullTableRows('misc_order_item', $whr, $ord);
    $orders = pullTableRowsByQuery($qur);
    $data['misc'] = $misc;
    $data['orders'] = $orders;
    echo(json_encode($data));
} catch (Exception $ex) {
    echo json_encode($ex);
}

