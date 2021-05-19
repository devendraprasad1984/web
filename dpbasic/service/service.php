<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("ACCESS-CONTROL-ALLOW-ORIGIN: $http_origin");

$isget = isset($_REQUEST['get']);
$isset = isset($_REQUEST['set']);
$counterFileName = 'counter.json';
$handle = fopen($counterFileName, 'r');
$counterContent = fread($handle, filesize($counterFileName));
$counter = json_decode($counterContent);

if ($isget) {
    if ($handle) fclose($handle);
    $data = array();
    $data['data'] = 'getter';
    $data['status'] = 'success';
    $data['counter'] = $counter;
    $res = json_encode($data);
}
if ($isset) {
    $post = json_decode(file_get_contents('php://input', true), true);
//    $cnt = $counter['visits'];
//    $cnt = $cnt + 1;
//    $counter['visits'] = $cnt;
    $iscreated = file_put_contents($counterFileName, json_encode($counter));
    $msg = $iscreated ? 'created' : 'couldnt create';
    $data = array();
    $data['data'] = 'setter';
    $data['status'] = "success - $msg";
    $data['counter'] = $counter;
    $data['post'] = $post;
    $res = json_encode($data);
}
echo $res;

