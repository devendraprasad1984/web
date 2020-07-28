<?php
try {
    session_save_path('./');
    session_start();
    unset($_SESSION['loggedIn']);
    session_destroy();
    header('location: ./index.php');
} catch (Exception $ex) {
    exit($ex->getTraceAsString());
}
?>