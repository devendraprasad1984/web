<?php
$objCounter = new clsVisitCounters();

try {
    if (isset($_REQUEST["id"]) && $_REQUEST["id"] == "getVisitCounter") {
        //$objCounter->setVisitCounter();
//        echo $objCounter->getVisitCounter();
        echo 2000;
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}


// define class and relevant methods to get and set visits counter
class clsVisitCounters
{
    private $counterVal = 2500;

    function getVisitCounter()
    {
        return $this->counterVal;
    }

    function setVisitCounter()
    {
        $this->counterVal += 1;
        return $this->counterVal;
    }
}


?>
