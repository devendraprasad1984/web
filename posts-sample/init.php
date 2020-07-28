<?php
try {
    session_save_path('./');
    session_start();

    $server = $_SERVER['REMOTE_ADDR'];
    if ($server == 'localhost' or $server == '127.0.0.1') {
        define('host', 'localhost:3306');
        define('user', 'root');
        define('pwd', '');
        define('db', 'ibdn');
    } else {
        define('host', 'localhost:3306');
        define('user', 'wp_p9ii9');
        define('pwd', 'rbs1984#');
        define('db', 'wp_8oy2w');
    }

    $conn = new mysqli(host, user, pwd, db);
} catch (Exception $ex) {
    exit($ex->getTraceAsString());
}


