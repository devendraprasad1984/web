<?php
require_once './ChromePHP.php';
require_once './helper.php';

try{
    $res=[];
//    cors();
    if(isset($_POST['save'])){
        handleSave($_POST);
    }
}catch (Exception $ex){
    $res=[];
    $res['err']=$ex->getMessage();
    echo json_encode($res);
}

?>