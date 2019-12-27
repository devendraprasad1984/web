<?php

require_once '../services/token/JWT.php';
use Firebase\JWT\JWT;

$key = "example_key";
$token = array(
    "iss" => "http://localhost/ksgurukul",
    "aud" => "http://localhost/ksgurukul",
    "iat" => 1356999524,
    "nbf" => 1357000000
);


JWT::$leeway = 60*60; // $leeway in seconds
$jwt = JWT::encode($token, $key);
echo $jwt;
$decoded = JWT::decode($jwt, $key, array('HS256'));
print_r($decoded);


?>