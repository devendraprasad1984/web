<?php
require 'init.php';
require 'helpers.php';

global $conn;
if (isset($_POST['register'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $sql = $conn->query("select id from users where email='$email'");
        if ($sql->num_rows > 0) {
            exit('failedUserExists');
        } else {
            $ePassword = password_hash($password, PASSWORD_BCRYPT);
            $conn->query("insert into users (name,email,password,createdOn) values('$name','$email','$ePassword',now())");
            $sql = $conn->query("select id from users order by id desc limit 1");
            $data = $sql->fetch_assoc();
            exit('success');
        }
    } else {
        exit('failedEmail');
    }
} else if (isset($_POST['login'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $sql = $conn->query("select id,password,name,role from users where email='$email'");
        if ($sql->num_rows == 0) {
            exit('failed');
        } else {
            $data = $sql->fetch_assoc();
            $password_hash = $data['password'];
            if (password_verify($password, $password_hash)) {
                $rows = array();
                $rows['timeit'] = time();
                $rows['loggedIn'] = 1;
                $rows['userid'] = $data['id'];
                $rows['name'] = $data['name'];
                $rows['email'] = $email;
                $rows['role'] = $data['role'];
                exit(json_encode($rows));
            } else {
                exit('failed');
            }
        }
    } else {
        exit('failed');
    }
}






