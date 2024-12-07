<?php
    header("Content-Type: application/json; charset=UTF-8");
    $name=$_POST['name'];
    $email=$_POST['email'];
    $contact=$_POST['contact'];
    $message=$_POST['message'];
    $res=Array(
        'msg'=>'Thanks '.$name.' for contacting us. We will respond to you asap'
    );
    echo json_encode($res);
?>