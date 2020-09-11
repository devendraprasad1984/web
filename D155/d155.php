<?php
require_once './ChromePHP.php';
require_once './helper.php';

global $success, $failed;
try{
    if(isset($_POST['save'])) handleSave($_POST);
    if(isset($_GET['expenses'])) handleExpensesReport($_GET);
    if(isset($_POST['delete'])) handleDelete($_POST);

}catch (Exception $ex){
    ChromePhp::error($ex->getMessage());
    echo $failed;
}

?>