<?php
session_start();
require_once '../backend/init.php';
require_once '../backend/helpers.php';

if (isset($_POST['getPosts'])) {
    $start = $conn->real_escape_string($_POST['start']);
    exit(pullPosts($start));
} else if (isset($_POST['getReplies'])) {
    $commentId = $conn->real_escape_string($_POST['commentId']);
    exit(pullReplies($commentId));
} else if (isset($_POST['getAllReplies'])) {
    exit(pullAllReplies());
}

