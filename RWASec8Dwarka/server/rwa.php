<?php
require_once './ChromePHP.php';
require_once './headers.php';
require_once './helper.php';

global $success, $failed;
try{
    if(isset($_POST['save'])) handleSave($_POST);
    if(isset($_POST['saveExpense'])) handleSaveExpense($_POST);
    if(isset($_POST['addMember'])) handleSaveMember($_POST);
    if(isset($_GET['membersList'])) handlePullMembersList($_GET);
    if(isset($_GET['expensesOnly'])) handleExpensesOnly($_GET);
    if(isset($_GET['expensesByMember'])) handleExpensesByMember($_GET);
    if(isset($_GET['expensesGroup'])) handleExpensesGroupByMemId($_GET);
    if(isset($_POST['delete'])) handleDelete($_POST);
}catch (Exception $ex){
    ChromePhp::error($ex->getMessage());
    echo $failed;
}
