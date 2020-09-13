<?php
require_once './libs/ChromePHP.php';

require_once './helper/common.php';
require_once './helper/helper.php';
require_once './helper/emailer.php';
require_once './helper/error.php';

global $success, $failed;
try{
//    if(isset($_POST['save'])) handleSave($_POST);
//    if(isset($_POST['delete'])) handleDelete($_POST);
    if(isset($_POST['contactus'])) handleContactUs($_POST);

}catch (Exception $ex){
    writeErrorLog($ex);
    ChromePhp::error($ex->getMessage());
    echo $failed;
}

//$data['name'] = $rejectedUser->username;
//$data['email'] = $rejectedUser->email;
//$data['emailtype'] = "userRejectEmail";
//sendEmail($data);


?>