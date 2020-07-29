<?php
try {
//    $curdir=dirname(__FILE__);
//    session_save_path($curdir);
    session_start();
    unset($_SESSION['loggedIn']);
    session_destroy();
    header('location: index.php');
} catch (Exception $ex) {
    exit($ex->getTraceAsString());
}
?>