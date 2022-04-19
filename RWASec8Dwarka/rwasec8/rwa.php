<?php
require_once './ChromePHP.php';
require_once './headers.php';
require_once './helper.php';

global $success, $conn, $failed;
try{
    if(isset($_POST['save'])) handleSave($_POST);
    if(isset($_POST['saveExpense'])) handleSaveExpense($_POST);
    if(isset($_POST['addMember'])) handleSaveMember($_POST);
    if(isset($_GET['expensesOnly'])) handleExpensesOnly($_GET);
    if(isset($_GET['expensesByMember'])) handleExpensesByMember($_GET);
    if(isset($_GET['expensesGroup'])) handleExpensesGroupByMemId($_GET);
    if(isset($_POST['loginCheck'])) handleLogin($_POST);
    if(isset($_GET['logout'])) handleLogout($_GET);
    if(isset($_GET['loginCheck'])) loginCheck($_GET);
    if(isset($_POST['passwordChange'])) handlePasswordChange($_POST);
    if($conn) mysqli_close($conn);
}catch (Exception $ex){
    if($conn) mysqli_close($conn);
//    ChromePhp::error($ex->getMessage());
    echo $failed;
}
