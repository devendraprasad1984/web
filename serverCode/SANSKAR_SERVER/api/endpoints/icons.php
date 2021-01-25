<?php
require_once '../include.php';
try{
    pullTable('listingicons');
}catch (Exception $ex){
    echo json_encode($ex);
}

