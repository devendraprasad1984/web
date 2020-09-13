<?php

function writeErrorLog($e)
{
    $arr=[];
    $arr['message'] = $e->getMessage();
    $arr['file'] = $e->getFile();
    $arr['line'] = $e->getLine();
    $arr['trace'] = $e->getTraceAsString();
    // Check message
    if ($arr['message'] != '') {
        $db = new Database;
        try {
            $db->query('INSERT INTO errorlog (desc) VALUES (:message)');
            $db->bind(':message', json_encode($arr));
            if ($db->execute()) {
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
