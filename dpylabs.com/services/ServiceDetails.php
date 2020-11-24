<?php
//session_start();
require_once 'emailer.php';
require_once '../services/token/JWT.php';

use Firebase\JWT\JWT;

$objMail = new Mailer();
$objSer = new genericObjects();
$users = json_decode('[
{"username":"user1","password":"pwd1"}
,{"username":"user2","password":"pwd2"}
,{"username":"user3","password":"pwd3"}
,{"username":"root","password":"admin"}
]', true);
$allowAdmin = true;


Class genericObjects
{
    public $div2LoadIn = "";
    public $counter = 0;
    public $baseDataPath = '../data/';
    public $secret_key = "genericmailsender2019";

    public function getTokenArray()
    {
        $token = [
            "host" => $this->getHost()
            , "fakekey" => $this->secret_key . "-nouse"
            , "timestamp" => date("H:i:s")
        ];
        return $token;
    }

    public function __construct()
    {
        @set_exception_handler(array($this, 'myErrorHandler'));
    }

    public function myErrorHandler($exception)
    {
        $this->writeLog($exception->getMessage() . ", trace: " . $exception->getTraceAsString() . ", line: " . $exception->getLine());
//        exit(-1);
    }

    public function getIP()
    {
        return $_SERVER['REMOTE_ADDR'];
    }

    public function getHost()
    {
        $host = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
        return $host;
    }
    public function getHostRef()
    {
        $ref = str_replace("index.html","", $_SERVER['HTTP_REFERER'])."data/";
        return $ref;
    }

    public function writeLog($someData)
    {
        $host = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $host .= ", host IP: " . $_SERVER['HTTP_CLIENT_IP'] . ", " . $_SERVER['HTTP_X_FORWARDED_FOR'];
//        $host.= explode(',', $_SERVER[$header]);
        $filename = $this->baseDataPath . "logging.log";
        $strData = "User: " . $host . ' - ' . date("F j, Y, g:i a") . PHP_EOL .
            "info: " . $someData . PHP_EOL .
            "-------------------------" . PHP_EOL;
        $f = fopen($filename, "a");
        fwrite($f, $strData . "\n");
        fclose($f);
    }

    public function readLog()
    {
        return $this->readFileContents($this->baseDataPath, "logging.log");
    }

    public function writeToFile($filename, $strData)
    {
        $sName = $this->baseDataPath . $filename;
        $f = fopen($sName, "w");
        fwrite($f, $strData . "\n");
        fclose($f);
    }

    public function deleteFile($filename)
    {
        $sName = $this->baseDataPath . $filename;
        $newName = str_replace(".txt", ".del", $sName);
        $check = rename("$sName", "$newName");
        $msg = "resource deleted successfully";
        if ($check === false)
            $msg = "there is some error,please contact admin";
        return $msg;
    }

    public function readFolders($folderPath, $withFileContent, $isEcho = true)
    {
        $sName = $this->baseDataPath . $folderPath;
        $searchString = "";
        if (isset($_REQUEST['getDataFile']))
            $spath = $_REQUEST['getDataFile'];
        if (isset($_REQUEST['search']))
            $searchString = $_REQUEST['search'];
        $host = $this->getHost();
//        $dirs = array_slice(preg_grep('~\.(txt)$~', scandir($folderPath)), 2);
        $dirs = array_slice(scandir($sName), 2);
//        print_r($dirs);
        $data = "";
        $allData = "";
        $this->counter += 1;
        $myCurId = "myCurSelect" . $this->counter;
        if ($withFileContent === "option") {
            $allData = "<select id='$myCurId' onchange=\"getServerData(this.value,'$this->div2LoadIn')\">";
            $allData .= "<option value='$host?fileRead=none'>Choose.....</option>";
        }
        foreach ($dirs as $key => $value) {
            $xPath = $folderPath . "/" . $value;
            $fullPath=$this->getHostRef().$xPath;
//            echo "<br/>path: ".$xPath;
            if ((strpos($value, ".pdf")<0) && (strpos($value, ".txt") === false && $spath !== "data") || (strpos($value, ".log") > 0 || $value === "slider")) {
//                echo "skipping: $value";
                continue;
            }
            $label = str_replace(".txt", "", $value);

            if ($withFileContent === "yes") {
                $data = "<div class='box ltqt' style='margin-top: 4px;'>";
                if ($this->div2LoadIn != "" && $this->div2LoadIn != "no")
                    $data .= "<div style='font-weight: bolder; font-size: 15pt;'>$label</div>";
                if (strpos($value, ".txt")>0)
                    $data .= "<div>" . $this->readFileContents($folderPath, $value) . "</div>";
                else if (strpos($value, ".pdf")>0)
                    $data .= "<div id='obj$this->counter' class='pdfView' style='background-color: white; height: 300px;'><object data='$fullPath' type='application/pdf' class='pdfView'></object></div>";
                else if (strpos($value, ".png")>0 || strpos($value, ".jpg")>0)
                    $data .= "<div><img src='$fullPath' class='imgInDiv'/></div>";
                $data .= "</div>";
            } elseif ($withFileContent === "anchor") {
                $data = "<span><a class='btn' href='#' onclick=\"getServerData('$host?fileRead=$xPath&loadnormal=1','$this->div2LoadIn','$label')\">$label</a></span>";
            } elseif ($withFileContent === "option") {
                if ($spath === "data") {
                    $data = "<option value='$host?fileRead=$xPath' class='font-weight-bold bg-info text-white' style='font-size: 13pt;'><div>$label</div></option>";
                } else {
                    $data = "<option value='$host?fileRead=$xPath&loadnormal=1' class='font-weight-bold' style='font-size: 11pt;'><div>$label</div></option>";
                }
                $xPath = str_replace("//", "/", $xPath);
                $files = array_slice(scandir($this->baseDataPath . $value), 2);
//                print_r($files);
                foreach ($files as $k1 => $v1) {
                    if (strpos(strtolower($v1), ".txt") > 0 && $spath === "data") {
                        if ($searchString !== "") {
                            if (strpos(strtolower("*$v1"), $searchString) > 0)
                                $data .= "<option value='$host?fileRead=$xPath/$v1' style='font-size: 9pt;'>*" . str_replace(".txt", "", $v1) . "</option>";
                        } else {
                            $data .= "<option value='$host?fileRead=$xPath/$v1' style='font-size: 9pt;'>*" . str_replace(".txt", "", $v1) . "</option>";
                        }
                    }
                }
            }
            $allData .= $data;
        }
        if ($withFileContent === "option") {
            $allData .= "</select>";
        }
        if ($isEcho)
            echo html_entity_decode($allData);
        return html_entity_decode($allData);
    }

    public function readFileContents($filePath, $fileName)
    {
        $context = stream_context_create(
            array(
                "http" => array(
                    "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
                )
            )
        );
        $sName = $this->baseDataPath . $filePath;
        if (strpos($sName, ".txt") > 0) {
            $absPath = $sName;
        } else {
            $absPath = $sName . "/" . $fileName;
        }
        $data = file_get_contents("$absPath", false, $context);
//        $data="";
//        foreach(glob("$absPath") as $file) {
//            foreach(file($file) as $line) {
//                $data.=$line;
//            }
//        }
        return $data;
    }

    public function getSliderInfo()
    {
        $arr = array();
        $sliderPath = $this->baseDataPath . "slider/";
        $imgArr = array_slice(scandir($sliderPath), 2);
        foreach ($imgArr as $key => $value) {
            array_push($arr, $sliderPath . $value);
        }
        return $arr;
    }

    public function generateToken()
    {
        $jwt = "";
        try {
            JWT::$leeway = 60 * 60; // $leeway in seconds
            $jwt = JWT::encode($this->getTokenArray(), $this->secret_key);
        } catch (Exception $ex) {
            $this->writeLog("error in generating auth token: " . $ex->getMessage() . ', trace: ' . $ex->getTraceAsString());
        }
        return $jwt;
    }

    public function validateToken()
    {
        $isValid = false;
        if (isset($_REQUEST['jwt'])) {
            $jwt = $_REQUEST['jwt']; //most prob get it in post with every call
            try {
                $tokenVal = $this->getTokenArray();
                $decoded = JWT::decode($jwt, $this->secret_key, array('HS256'));
                //see how token array will be matched with decoded objects
                $isValid = true;
            } catch (Exception $ex) {
                $this->writeLog("the token cannot be validated, may be an attempt to hack");
                $isValid = false;
            }
        }
        return $isValid;
    }

}

//**************************************************************
if (isset($_REQUEST['getDataFile']) && isset($_REQUEST['getType'])) {
    try {
        $objSer->div2LoadIn = $_REQUEST['toload'];
        $sPath = $_REQUEST['getDataFile'];
        if (strtolower($_REQUEST['getDataFile']) !== "none") {
            if ($sPath === "data") {
                if (!$allowAdmin || !$objSer->validateToken()) exit();
                $sPath = "";
                $objSer->readFolders($sPath, $_REQUEST['getType']);
                exit();
            }
            $objSer->readFolders($sPath, $_REQUEST['getType']);
        }
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['saveData'])) {
    try {
        $data = "";
        $val2check = $_REQUEST['saveData'];
        $fileName = $_POST['tag'];
        $data2Save = $_POST['data'];
        if ($val2check === "2") {
            $data2Save = strip_tags($data2Save);
            $data = $objSer->writeToFile($fileName, $data2Save);
            $objSer->writeLog($fileName . " - has been saved");
        } else {
            if (!$allowAdmin || !$objSer->validateToken()) exit();
            $data = $objSer->writeToFile($fileName, $data2Save);
            $objSer->writeLog($fileName . " - has been saved");
        }
        echo $data;
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['fileRead'])) {
    try {
        if (!$allowAdmin) exit();
        if (!isset($_REQUEST['loadnormal']) && !$objSer->validateToken()) {
            exit(); //coming from admin and hence validation to be checked
        }
        $filePath = $_REQUEST['fileRead'];
        $data = $objSer->readFileContents($filePath, '');
        $data = "<pre>$data</pre>";
        echo $data;
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['fileDelete'])) {
    try {
        if (!$allowAdmin || !$objSer->validateToken()) exit();
        $filePath = $_REQUEST['fileDelete'];
        $data = $objSer->deleteFile($filePath);
        $data = "<pre>$data</pre>";
        $objSer->writeLog($filePath . " - has been deleted");
        echo $data;
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['mail'])) {
    try {
        $content = "";
        $content .= "<div style='background-color:#28a745; text-align: center; font-size: 12pt;font-weight: bolder'>Query From Web</div>";
        $content .= "<table width='100%' cellpadding='2' cellspacing='2'>";
        foreach ($_REQUEST as $key => $value) {
            if ($key != 'mail')
                $content .= "<tr><td style='font-weight: bolder'>$key</td><td>$value</td></tr>";
        }
        $content .= "</table>";
        $objMail->emailData = $content;
        $msg = $objMail->sendMail();
        $objSer->writeLog("mail: " . $msg);
        echo $msg;
//        throw new Exception("mail: " . $msg);
        //throw new Exception($ex);
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['login'])) {
    try {
        if (!$allowAdmin) exit();
        $username = $_POST['username'];
        $password = $_POST['password'];
        $content = 0;
        foreach ($users as $key => $value) {
            if ($value["username"] === $username && $value["password"] === $password) {
                $content = 1;
//                session_start();
//                $_SESSION['lol'] = 1;
                $jwt = $objSer->generateToken();
                $ret = json_encode(["isLoggedIn" => $content, "jwt" => $jwt]);
                break;
            }
        }
        echo $ret;
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['logout'])) {
    try {
        if (!$allowAdmin || !$objSer->validateToken()) exit();
        $content = 0;
//        $_SESSION['lol'] = 0;
//        session_unset();
//        session_destroy();
        echo $content;
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['forgotPassword'])) {
    try {
        if (!$allowAdmin || !$objSer->validateToken()) exit();
        $content = "";
        $content .= "<div style='background-color:#28a745; text-align: center; font-size: 14pt;font-weight: bolder'>Your login details</div>";
        foreach ($users as $key => $value) {
            $content .= "<div style='font-weight: bolder'>" . $value["username"] . "<span style='color: #1c7430'>->" . $value["password"] . "</span></div>";
        }
        $objMail->emailData = $content;
        $msg = $objMail->sendMail();
        if (strpos($msg, "err:") > 0) {
            $objSer->writeLog($msg);
            echo $msg;
//            throw new Exception($msg);
        } else {
            echo "forgot password mail has been sent to your registered email id";
        }
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['slider'])) {
    try {
        $content = $objSer->getSliderInfo();
        echo implode(";", $content);
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['manageSlider'])) {
    try {
//        if(!$allowAdmin || !$objSer->validateToken()) exit();
        if (!$allowAdmin) exit();
        if ($_REQUEST['manageSlider'] === "1") {
            if (!$objSer->validateToken()) exit();
            $content = $objSer->getSliderInfo();
            echo implode(";", $content);
        } else if ($_REQUEST['manageSlider'] === "add") {
            $baseFileName = basename($_FILES["file2upload"]["name"]);
            $tmpFileName = $_FILES["file2upload"]["tmp_name"];
            $savePath = $objSer->baseDataPath . "slider/$baseFileName";
            $imageFileType = strtolower(pathinfo($savePath, PATHINFO_EXTENSION));
            $check = getimagesize($tmpFileName);
            $msg = "some info: $check,  $baseFileName , $tmpFileName , $savePath , $imageFileType ";
            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                $msg .= "$imageFileType - Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }
            if ($check !== false) {
                $msg .= "File is an image - " . $check["mime"] . ".";
                $msg .= "<br/>saved slider - $baseFileName - $tmpFileName";
                if (move_uploaded_file($tmpFileName, $savePath)) {
                    $msg = "The file " . $baseFileName . " has been uploaded.";
                    $uploadOk = 1;
                } else {
                    $msg .= "Sorry, there was an error uploading your file.";
                    $uploadOk = 0;
                }
            } else {
                $msg .= "File is not an image.";
                $uploadOk = 0;
            }
            echo $msg;
        } else if ($_REQUEST['manageSlider'] === "del") {
            if (!$objSer->validateToken()) exit();
            $fn = $_REQUEST['filename'];
            $delFile = $objSer->baseDataPath . "slider/" . $fn;
            if (unlink($delFile)) {
                $msg = "$fn is deleted";
            } else {
                $msg = "error deleting file - $fn";
            }
            echo $msg;
        }
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_REQUEST['logging'])) {
    try {
        if (!$allowAdmin || !$objSer->validateToken()) exit();
        echo "<pre class='log text-white'>" . $objSer->readLog() . "</pre>";
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
} else if (isset($_POST['loadAll'])) {
    try {
        $allObj = $_POST['alldata'];
        foreach ($allObj as $i => $v) {
            $xcall = substr($v["uri"], strpos($v["uri"], "?") + 1);
            $strArray = explode("&", $xcall);
            $spath = substr($strArray[0], 1 + strpos($strArray[0], "="));
            $getType = substr($strArray[1], 1 + strpos($strArray[1], "="));
            if (sizeof($strArray) === 3)
                $toload = substr($strArray[2], 1 + strpos($strArray[2], "="));
            $objSer->div2LoadIn = $toload;
            if (strpos($v["uri"], "slider") > 0) {
                $sdata = $objSer->getSliderInfo();
            } else {
                $sdata = $objSer->readFolders($spath, $getType, false);
            }
            $allObj[$i]["jsdata"] = $sdata;
        }
        echo json_encode($allObj);
    } catch (Exception $ex) {
        $objSer->writeLog($ex->getMessage() . "->" . $ex->getTraceAsString());
        //throw new Exception($ex);
    }
}
ob_implicit_flush(true);
//die();
exit();

?>


