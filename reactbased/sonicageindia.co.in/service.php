<?php

require_once 'js/emailer.php';
$cntDir = new DirReader();
$objMail = new Mailer();

class DirReader {

    public $path = "";

    function getImageSlier() {
        $img = "";
        if ($handle = opendir($this->path)) {
            while (false !== ($entry = readdir($handle)) && strtolower($entry) != "thumbs.db") {
                if ($entry != "." && $entry != "..") {
                    $img.= "<img style='display:none;' height=200 width=100% src='" . $this->path . $entry . "' alt='" . $entry . "' title='" . $entry . "'/>";
                }
            }
            closedir($handle);
            return $img;
        }
    }


    function getDirFilesAsLinks() {
        $img = "";
        if ($handle = opendir($this->path)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    $pt_p = $this->path . $entry . "/index.php";
                    $pt_h = $this->path . $entry . "/index.html";
                    if (file_exists($pt_p)) {
                        $img.= "<li><a target='_blank' href=" . $pt_p . ">$entry</a></li>";
                    } else {
                        $img.= "<li><a target='_blank' href=" . $pt_h . ">$entry</a></li>";
                    }
                }
            }
            closedir($handle);
            return $img;
        }
    }
    
    function getDirListForDownload() {
        $counter = 0;
        $totalList=0;
        $img = "";
        $sTable = "<table border=0 cellspacing=4 cellpadding=4>";
        $sTable.="<tr><td style='width:50%;'>";
        if ($handle = opendir($this->path)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    $pt_p = $this->path . $entry;
                    if (file_exists($pt_p)) {
                        $img.= "<li><a href=" . $pt_p . ">$entry</a></li>";
                        $counter+=1;
                        if (($counter % 10) == 0) {
                            $sTable.=$img . "</td><td>";
                            $img = "";
                        }
                        if (($counter % 20) == 0) {
                            $sTable.=$img . "</td><tr><td style='width:50%;'>";
                            $img = "";
                        }
                    }
                    $totalList+=1;
                }
            }
            closedir($handle);
            $sTable.="<thead><h1 class='subheading'>Total Items:$totalList</h1></thead>";
            $sTable.="</td></tr></table>";
            return $sTable;
        }
    }

}

if (isset($_REQUEST['slider'])) {
    //echo("<script>alert(1);</script>");
    $id = $_REQUEST['slider'];
    $cntDir->path = "img/slider/";
    $content = $cntDir->getImageSlier();
    echo $content;
} elseif (isset($_REQUEST['id']) && $_REQUEST['id'] == "datepanel") {
    //echo("<script>alert(2);</script>");
    echo "<p>" . date('l F d, Y') . "</p>";
} elseif (isset($_REQUEST['id']) && $_REQUEST['id'] == "sample") {
   // echo("<script>alert(3);</script>");
    try {
        $cntDir->path = "./samples/";
        $content = $cntDir->getDirFilesAsLinks();
        echo $content;
    }
    catch (Exception $e) {
        echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
    }
} elseif ($_REQUEST['id'] == "getVBAGalaxy") {
    //echo("<script>alert(4);</script>");
    try {
        $cntDir = new DirReader();
        $cntDir->path = "./VBAGalaxy/";
        $content = $cntDir->getDirListForDownload();
        echo $content;
    }
    catch (Exception $e) {
        echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
    }
} elseif (isset($_REQUEST['id']) && $_REQUEST['id'] != "sample") {
    //echo("<script>alert(5);</script>");
    try {
        $id = $_REQUEST['id'];
        $content = $cnt->page($id);
        echo $content;
    }
    catch (Exception $e) {
        echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
    }
} elseif (isset($_REQUEST['mail']) && $_REQUEST['mail'] == "cb") {
    //echo("<script>alert(6);</script>");
    $content = "";
    $objMail->emailData = "";
    $objMail->emailData.="<table>";
    $objMail->emailData.="<tr><td>EMail: " . $_REQUEST['txtemail'] . "</td></tr>";
    $objMail->emailData.="<tr><td>Query: " . $_REQUEST['txtmsg'] . "</td></tr>";
    $objMail->emailData.="</table>";

    $email = $_REQUEST['txtemail'];
    $msg = "<pre style='font-size: 12pt;'>" . $_REQUEST['txtmsg'] . "</pre>";
    $content.= $objMail->saveQuery($email, $msg);
    $content.= $objMail->sendMail();
    echo $content;
} elseif (isset($_REQUEST['mail']) && $_REQUEST['mail'] == "mail_1") {
    //echo("<script>alert(7);</script>");
    $content = "";
    $objMail->emailData = "";
    $objMail->contact_email = $_REQUEST['temail'];
    $objMail->contact_name = $_REQUEST['tname'];
    $objMail->contact_subject = $_REQUEST['tsub'];
    $objMail->emailData.="<table>";
    $objMail->emailData.="<tr><td>Name: " . $_REQUEST['tname'] . "</td></tr>";
    $objMail->emailData.="<tr><td>Email: " . $_REQUEST['temail'] . "</td></tr>";
    $objMail->emailData.="<tr><td>Mobile: " . $_REQUEST['tmob'] . "</td></tr>";
    $objMail->emailData.="<tr><td>Subject: " . $_REQUEST['tsub'] . "</td></tr>";
    $objMail->emailData.="<tr><td>Query: <pre style='font-size: 12pt;'>" . $_REQUEST['tmsg'] . "</pre></td></tr>";
    $objMail->emailData.="</table>";
    //echo("<script>alert($objMail->emailData);</script>");
    $content.= $objMail->sendMail();
    echo $content;
    echo "<script>clearTimeoutHtml('#mail_1',2000);</script>";
    echo "<script>clearTimeoutVal('#tname,#temail,#tmob,#tsub,#tmsg',2000);</script>";

} else {
//echo "<p class='subheading'>Page Under Construction</p>";
}

//echo "<script>hide('divstatus');fade('in');</script>";
?>

