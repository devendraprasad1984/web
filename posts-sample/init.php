<?php
$server = $_SERVER['REMOTE_ADDR'];
echo 'you are connected to '.$server;

if ($server == 'localhost' or $server == '127.0.0.1') {
    define('host', 'localhost');
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


