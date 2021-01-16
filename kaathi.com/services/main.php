<?php
require_once 'libs/ChromePHP.php';

require_once 'helper/common.php';
require_once 'helper/error.php';
require_once 'helper/helper.php';
require_once 'helper/emailer.php';

global $success, $failed;
try {
    $data = $_SERVER["REQUEST_METHOD"] == 'POST' ? $_POST : $_GET;
    if (isset($_POST['contactus'])) handleContactUs($data);

} catch (Exception $ex) {
    writeErrorLog($ex);
    ChromePhp::error($ex->getMessage());
    echo json_encode($failed);
}

?>