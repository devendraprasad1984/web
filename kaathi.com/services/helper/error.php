<?php

function writeErrorLog($e)
{
    global $conn;
    $arr=[];
    $arr['message'] = $e->getMessage();
    $arr['file'] = $e->getFile();
    $arr['line'] = $e->getLine();
    $arr['trace'] = $e->getTraceAsString();
    // Check message
    if ($arr['message'] != '') {
        try {
            $xdata=getArrayAsString(', ',$arr);
            $sql = "INSERT INTO errorlog (desc) VALUES ('$xdata')";
            $result = $conn->query($sql);
            mysqli_close($conn);
            if ($result) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            die($error);
        }
    }
}
