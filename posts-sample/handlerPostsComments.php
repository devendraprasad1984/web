<?php
require_once './init.php';
require_once './helpers.php';

$loggedIn = false;
if (isset($_SESSION['loggedIn']) && isset($_SESSION['name'])) {
    $loggedIn = true;
}
//print_r($_SESSION);
//print_r($_POST);
global $conn;

if (isset($_POST['getAllposts'])) {
    $start = $conn->real_escape_string($_POST['start']);
    exit(pullAllposts($start, false, false));
}


if (isset($_POST['addComment'])) {
    if (!$loggedIn) exit('notLoggedIn');
    $commentId = $conn->real_escape_string($_POST['commentId']);
    $comment = $conn->real_escape_string($_POST['comment']);
    $isReply = filter_var($conn->real_escape_string($_POST['isReply']),FILTER_VALIDATE_BOOLEAN);
    if ($isReply==true || $isReply==1) {
        $conn->query("insert into replies(userid,comment,commentid,createdOn) values('" . $_SESSION['userId'] . "','$comment','$commentId',now())");
//        exit('reply is been added');
        exit(pullAllposts(0, true, $isReply));
    } else {
        $conn->query("insert into posts(userid,comment,createdOn) values('" . $_SESSION['userId'] . "','$comment',now())");
//        exit('comments is been added');
        exit(pullAllposts(0, true, $isReply));
    }
}

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
            $_SESSION['loggedIn'] = 1;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['userId'] = $data['id'];
            exit('success');
        }
    } else {
        exit('failedEmail');
    }
}


if (isset($_POST['login'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $sql = $conn->query("select id,password,name from users where email='$email'");
        if ($sql->num_rows == 0) {
            exit('failed');
        } else {
            $data = $sql->fetch_assoc();
            $password_hash = $data['password'];
            if (password_verify($password, $password_hash)) {
                $_SESSION['loggedIn'] = 1;
                $_SESSION['name'] = $data['name'];
                $_SESSION['email'] = $email;
                $_SESSION['userId'] = $data['id'];
                exit('success');
            } else {
                exit('failed');
            }
        }
    } else {
        exit('failed');
    }
}