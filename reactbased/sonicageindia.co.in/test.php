<?php
$target_dir = "test/";
$target_file = $target_dir . basename($_FILES["fTest"]["name"]);
if (move_uploaded_file($_FILES["fTest"]["tmp_name"], $target_file)) {
    echo "Success";
} else {
    echo "Sorry, there was an error";
}
?>