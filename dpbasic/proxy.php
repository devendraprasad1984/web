<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
header('Content-Type: text/html');
$url=$_GET['url'];
$homepage = file_get_contents($url);
echo $homepage;
//$handle=fopen($url,"r");
//if($handle){
//    while (!feof($handle)){
//        $buffer=fgets($handle,4096);
//        echo $buffer;
//    }
//}
//fclose($handle);
?>
