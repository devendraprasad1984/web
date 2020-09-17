<?php

$success = array('status' => 'success');
$failed = array('status' => 'failed');

$server = $_SERVER['REMOTE_ADDR'];
if ($server == '::1' or $server == 'localhost' or $server == '127.0.0.1') {
    define('host', 'localhost:3306');
    define('user', 'root');
    define('pwd', 'dpadmin');
    define('db', 'kaathi');
} else {
    define('host', 'localhost:3306');
    define('user', 'dpkaathi');
    define('pwd', 'rbs1984#');
    define('db', 'dlrgvkes_kaathi');
}


$red="background-color:tomato;";
$green="background-color:mediumseagreen;";
$styleBtn="
        color:white;
        text-decoration:none;
        border-color: #007bff;
        display: inline-block;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        padding: .275rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        cursor: pointer;
       ";
define('RED',$red);
define('GREEN',$green);
define('STYLEBTN',$styleBtn);

