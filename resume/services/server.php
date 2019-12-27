<?php
$objCounter = new clsServerLog();

try {
    if (isset($_REQUEST["id"]) && $_REQUEST["id"] == "getServerLog") {
        echo $objCounter->getServerLog($_SERVER);
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}


// get server log
class clsServerLog
{
    private $serverLog;

    function getServerLog($svr)
    {
        $this->serverLog = json_encode($svr);
        return $this->serverLog;
    }
}


?>