<?php
    session_save_path('/tmp');
    session_start();
    unset($_SESSION['loggedIn']);
    session_destroy();
    header('location: index.php');
?>