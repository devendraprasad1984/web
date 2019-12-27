<?php
$target_dir = "../../codeSamples/";
$subFolder=$_POST["dirName"]."/";
$target_file = $target_dir.$subFolder . basename($_FILES["fTest"]["name"]);
//echo $target_file;
if (move_uploaded_file($_FILES["fTest"]["tmp_name"], $target_file)) {
//    echo "<br/>The file " . basename($_FILES["fTest"]["name"]) . " has been successful.";
    echo "<script>alert('The file " . basename($_FILES["fTest"]["name"]) . " has been successful');</script>";
} else {
    echo "<script>alert('there seems to be some error');</script>";
}
?>
