<?php
require_once '../backend/init.php';
require_once '../backend/helpers.php';

if (isset($_POST['getPostsAndReplies'])) {
    $start = $conn->real_escape_string($_POST['start']);
    exit(pullAllposts($start,false,false));
}elseif (isset($_POST['getPosts'])) {
    $start = $conn->real_escape_string($_POST['start']);
    exit(pullPosts($start));
} elseif (isset($_POST['getReplies'])) {
    $commentId = $conn->real_escape_string($_POST['commentId']);
    exit(pullReplies($commentId));
}
