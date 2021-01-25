<?php
require_once '../include.php';
try{
    pullTable('adrotator',"where placeOnApp='offer'");
}catch (Exception $ex){
    echo json_encode($ex);
}

