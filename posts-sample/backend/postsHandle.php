<?php
session_start();
require './backend/init.php';
require './backend/helpers.php';

//$_SESSION['loggedIn']=1;
//$_SESSION['name']='devendra';
//$_SESSION['role']='admin';

$loggedIn = false;
if (isset($_SESSION['loggedIn']) && isset($_SESSION['name'])) {
    $loggedIn = true;
}
global $conn;


if (isset($_POST['getPostsAndReplies'])) {
    $start = $conn->real_escape_string($_POST['start']);
    exit(pullAllposts($start, false, false));
}

if (isset($_POST['addComment'])) {
    if (!$loggedIn) exit('notLoggedIn');
    $commentId = $conn->real_escape_string($_POST['commentId']);
    $comment = $conn->real_escape_string($_POST['comment']);
    $isReply = filter_var($conn->real_escape_string($_POST['isReply']), FILTER_VALIDATE_BOOLEAN);
    if ($isReply == true || $isReply == 1) {
        $conn->query("insert into replies(userid,comment,commentid,createdOn) values('" . $_SESSION['userId'] . "','$comment','$commentId',now())");
        exit(pullAllposts(0, true, $isReply));
    } else {
        $conn->query("insert into posts(userid,comment,createdOn) values('" . $_SESSION['userId'] . "','$comment',now())");
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
        $sql = $conn->query("select id,password,name,role from users where email='$email'");
        if ($sql->num_rows == 0) {
            exit('failed');
        } else {
            $data = $sql->fetch_assoc();
            $password_hash = $data['password'];
            if (password_verify($password, $password_hash)) {
                $_SESSION['timeit'] = time();
                $_SESSION['loggedIn'] = 1;
                $_SESSION['userId'] = $data['id'];
                $_SESSION['name'] = $data['name'];
                $_SESSION['email'] = $email;
                $_SESSION['role'] = $data['role'];
                $res=$_SESSION;
                echo('success');
//                exit('success');
//                exit(implode(',',$_SESSION));
//                exit(json_encode($res));
            } else {
                exit('failed');
            }
        }
    } else {
        exit('failed');
    }
}






