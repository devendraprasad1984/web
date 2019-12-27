<?php
session_start();
require_once 'js/emailer.php';
require_once 'ServiceDetails.php';
$objMail = new Mailer();
$db = new database();
$objComp=new genericObjects();
//empty the array at any action other than submit at plan wed
echo "<script>forEmail=[]; forEmailComp=[];</script>";


//*****************************************************************************
$id=null; $qur=null;
if(isset($_REQUEST['id'])) $id=$_REQUEST['id'];
if(isset($_POST['id'])) $id=$_POST['id'];
if(isset($_REQUEST['qur'])) $qur=$_REQUEST['qur'];

if ($id=="db" && isset($_REQUEST['func'])) {
//reading the database functions and calling the db routines
try {
    if($qur=="test")
        $contents=$db->test();
    else{
        $fnName=$_REQUEST['func'];
        $contents=call_user_func_array(array($db,$fnName),array($qur));
        echo $contents;
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="getCategories") {
    $cont=$db->getCategTable();
    echo $cont;
}elseif ($id=="regForm") {
try {
    $vals="";
    $msg="";
    if($_REQUEST['tCompanyId']!="" AND $_REQUEST['tCompanyId']!=null AND $_REQUEST['tCompanyId']!="0" ){
        $vals="displayName='".$_REQUEST['tName']."'";
        $vals.=",repName='".$_REQUEST['tRepName']."'";
        $vals.=",repPhone='".$_REQUEST['tRepPhone']."'";
        $vals.=",startUpDate='".date("Y-m-d",strtotime($_REQUEST['tStartupDate']))."'";
        $ct=substr($_REQUEST['categSel'], strpos($_REQUEST['categSel'],"[")+1,strpos($_REQUEST['categSel'],"]")-strpos($_REQUEST['categSel'],"[")-1);
        $vals.=",category='".$ct."'";
        $vals.=",userName='".$_REQUEST['tUserName']."'";
        $vals.=",password='".$_REQUEST['tPassword']."'";
        $vals.=",email='".$_REQUEST['tEmail']."'";
        $sql="Update registration Set $vals where id=".$_REQUEST['tCompanyId'];
        $baseDir=$_REQUEST['tMyPath'];
    }else{
        $fld="name,displayName,repName,repPhone,startUpDate,createdDate,category,userName,password,email,ipAddress,counter,status,mainIcon,sliderImages";
        $nm=str_replace(" ","",$_REQUEST['tName']);
        $vals.="'".$nm."'";
        $vals.=",'".$_REQUEST['tName']."'";
        $vals.=",'".$_REQUEST['tRepName']."'";
        $vals.=",'".$_REQUEST['tRepPhone']."'";
        $vals.=",'".date("Y-m-d",strtotime($_REQUEST['tStartupDate']))."'";
        $vals.=",'".date("Y-m-d h:i:s")."'";
        $ct=substr($_REQUEST['categSel'], strpos($_REQUEST['categSel'],"[")+1,strpos($_REQUEST['categSel'],"]")-strpos($_REQUEST['categSel'],"[")-1);
        $vals.=",'".$ct."'";
        $vals.=",'".$_REQUEST['tUserName']."'";
        $vals.=",'".$_REQUEST['tPassword']."'";
        $vals.=",'".$_REQUEST['tEmail']."'";
        $vals.=",'".$objComp->getIP()."'";
        $vals.=",0";
        $vals.=",'active'";
        $baseDir="services/".$ct."/".$nm;
        //set basepath to hidden variable for upload mainIcon
        $vals.=",'".$baseDir."'";
        $vals.=",''";
        
        //create a folder in the root of the service folder by its name and copy the mainIcon to it and rename the file as mainIcon
        $sql="INSERT INTO registration($fld) VALUES($vals)";
    }
    //print_r($sql);
    $rs=$db->runQur($sql);
    $msg.="Thanks! You are almost done<br>";
    $msg.="<script>document.getElementById('profileBasepath').value='".$baseDir."';</script>";
    $msg.="<script>document.getElementById('frmUpload').style.display='block';</script>";
    //mysql_free_result($rs);
    echo $msg;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="profile") {
try {
    $msg="";
    $vals="";
    if($_REQUEST['tCompanyId']=="" or $_REQUEST['tCompanyId']==null){
    $msg="The Guest Profile cannot be updated";
    }else{
        $vals.="website='".$_REQUEST['tWebsite']."'";
        $vals.=",facebookPage='".$_REQUEST['tFacebookPage']."'";
        $vals.=",twitterPage='".$_REQUEST['tTwitterPage']."'";
        $vals.=",linkedInPage='".$_REQUEST['tLinkedInPage']."'";
        $vals.=",keywords='".$_REQUEST['tKeywords']."'";
        $vals.=",contactInfo='".$_REQUEST['tContactInfo']."'";
        $vals.=",displayData='".$_REQUEST['tDisplayData']."'";
        $vals.=",profileUpdateDate='".date("Y-m-d h:i:s")."'";
        $vals.=",overallCost='".$_REQUEST['tOverallCost']."'";
        $sql="Update registration Set $vals where id=".$_REQUEST['tCompanyId'];
        $rs=$db->runQur($sql);
        $msg.="Congrats!!! Your Profile is updated";
    }
    //mysql_free_result($rs);
    echo $msg;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="loginForm") {
try {
    $msg="";
    $UN=$_REQUEST['tUserName'];
    $PWD=$_REQUEST['tPassword'];
    $sql="Select displayName,id from registration where userName='".$UN."' and password='".$PWD."' and status='active'";
    $rs=$db->runQur($sql);
    if(mysql_numrows($rs)!=0){
        $row=mysql_fetch_assoc($rs);
        $_SESSION["loginId"]=$row["id"];
        $_SESSION["loginName"]=$row["displayName"];
        $msg.="<script>document.getElementById('profileLink').style.display='block';";
        $msg.="document.getElementById('companyId').innerHTML='".$row["id"]."';";
        $msg.="document.getElementById('loginName').innerHTML='Welcome, ".$row["displayName"]."';";
        $msg.="document.getElementById('tdLogin').className='hide';";
        $msg.="document.getElementById('tdLogout').className='show';";
        $msg.="closePanel();</script>";
    }else{
        $msg.="Invalid userName or password!!! Your profile might be deactivated";
    }
    mysql_free_result($rs);
    echo $msg;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="hitCounter") {
try {
    $msg="";
    $comp=$_REQUEST['companyId'];
    $sql="update registration set counter=if(counter is null,0, counter)+1 where id=".$comp;
    $rs=$db->runQur($sql);
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="likeCounter") {
try {
    $msg="";
    $likeId=$_REQUEST['feedbackId'];
    $sql="update feedback set likes=if(likes is null,0, likes)+1 where id=".$likeId;
    $rs=$db->runQur($sql);
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($qur=="srv") {
//call db and get the relevant servic info from registrations
try {
    $contents=$db->getServices($id,"");
    echo $contents;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="myHits") {
try {
    $comp=$_REQUEST['companyId'];
    $sql="select counter from registration where id=".$comp;
    $rs=$db->runQur($sql);
     if(mysql_numrows($rs)!=0){
        $row=mysql_fetch_assoc($rs);
        echo $row["counter"];
    }
    mysql_free_result($rs);
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="reviewCorner") {
try {
    $comp=$_REQUEST['companyId'];
    $contents=$db->getReviews($comp);
    echo $contents;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="submitReview") {
try {
    $comp=$_POST['companyId'];
    $msg=$_POST['msg'];
    $sql="insert into feedback(companyId,review,rating) values(".$comp.",'".$msg."',2)";
    $rs=$db->runQur($sql);
    $data="<p class='bg'>Review Updated Successfully</p>";
    $data.=$db->getReviews($comp);
    echo $data;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="planWed") {
try {
    $orderBy=$_REQUEST["orderBy"];
    $cont=$db->getPlanning($orderBy);
    echo $cont;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="saveVisitor") {
try {
    if(isset($_SESSION["ipFlag"])&&$_SESSION["ipFlag"]=1){
        $vals="";
        $msg="";
        $msg.="<script>sessionFlag=1;</script>";
        $fld="ipaddress,name,mobile,email,country,visitDate,sessionId";
        $vals.="'".$_REQUEST['tIP']."'";
        $vals.=",'".$_REQUEST['tName']."'";
        $vals.=",'".$_REQUEST['tMobile']."'";
        $vals.=",'".$_REQUEST['tEmail']."'";
        $vals.=",'".$_REQUEST['tCountry']."'";
        $vals.=",'".date("Y-m-d h:i:s")."'";
        $vals.=",'".session_id()."'";
        
        $sql="INSERT INTO visitors($fld) VALUES($vals)";
        //print_r($sql);
        $rs=$db->runQur($sql);
        $msg.="Thanks! Enjoy your visit to we.com";
        $msg.="<script>closePanel();</script>";
        $_SESSION["ipFlag"]=0;
        echo $msg;
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}elseif ($id=="deActivateProfile") {
try {
        $msg="";
        $compId=$_REQUEST["companyId"];
        $sql="update registration set status='deactive' where id=".$compId;
        $rs=$db->runQur($sql);
        $msg="Your profile is deactivated. You can renew anytime by calling us. Thanks for being on we.com";
        echo $msg;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
}

//################# DEFININIG CLASSES#######################
class database{
public $myDB = "test";
public $myServer = "127.0.0.1:3306";
public $myUser = "root";
public $myPwd = "admin";  
public function __construct() {
    if($_SERVER['REMOTE_ADDR']=="127.0.0.1"){
        $this->myDB = "test";
        $this->myServer = "127.0.0.1:3306";
        $this->myUser = "root";
        $this->myPwd = "admin";   
    }else{
        $this->myDB = "wecom";
        $this->myServer = "db4free.net:3306";
        $this->myUser = "wecom";
        $this->myPwd = "rbs1984#";    
    }
}
private function openConn(){
    $link = mysql_connect($this->myServer, $this->myUser, $this->myPwd)or die('Could not connect: ' . mysql_error()); //db4free
    return $link;
}
private function closeConn($link){
    if(isset($link))
        mysql_close($link);
}
private function getDB($link){
    if(isset($link))
        $db= mysql_select_db($this->myDB, $link) or die("DB Error: ".mysql_error());
    else
        $db=null;
    return $db;
}
public function runSql($sqlFile){
    try{
    $cn=$this->openConn();
    $dbase=$this->getDB($cn);
    if(isset($cn) && isset($dbase)){
        $sql=$this->readQuery($sqlFile);
        //if(strtolower(substr($sql,0,6))=="select")
//            $rs=mysql_query($sql,$cn) or die("error running sql: ".mysql_error());
//        else
            $rs=mysql_query($sql,$cn) or die("error running sql: ".mysql_error());
    }
    $this->closeConn($cn);
    return $rs;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
    }
}
public function runQur($sql){
    try{
    $cn=$this->openConn();
    $dbase=$this->getDB($cn);
    if(isset($cn) && isset($dbase)){
        //if(strtolower(substr($sql,0,6))=="select")
//            $rs=mysql_query($sql,$cn) or die("error running sql: ".mysql_error());
//        else
            $rs=mysql_query($sql,$cn) or die("error running sql: ".mysql_error());
    }
    $this->closeConn($cn);
    return $rs;
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
    }
}
private function readQuery($fileName){
    return file_get_contents('./database/'.$fileName, FILE_USE_INCLUDE_PATH);
}
public function getTableFromRS($qur){
    $myRS=$this->runSql($qur);
    $result="";
    if (isset($myRS)){
        $cols=mysql_num_fields($myRS);
        while (($row = mysql_fetch_array($myRS)) != null) {
            $result.="<tr>";
            for($i=0; $i<$cols; $i++){
            $result.="<td>".$row[$i]."</td>";    
            }
            $result.="</tr>";
        }
    }
    return $result;
}
public function getCategTable(){
    $rs=$this->runQur("select categName,folderAlias,icon from category order by sortorder asc;");
    $result="<table id='sideBar1' cellspacing=1 cellpadding=1>";
    if (isset($rs)){
        $cols=mysql_num_fields($rs);
        $cnt=0;
        while (($row = mysql_fetch_array($rs)) != null) {
            $result.="<tr>";
            $name=$row[1];
            $icon="<img src='".$row[2]."' style='width:15px; height:15px;'>";
            $setBgImage="mainContainerBgImage('".$row[2]."');";
            $myClick="sideMe(this); $('#mainContentPanel').load('database.php?id=".$row[1]."&qur=srv'); $setBgImage";
            if($cnt==0)
                $result.="<td name='".$name."' id='current' class='click' style='font-weight: bold; font-size:8pt;' onclick=\"$myClick\">".$icon." ".$row[0]."</td>";
            else
                $result.="<td name='".$name."' class='click' style='font-weight: bold; font-size:8pt;' onclick=\"$myClick\">".$icon." ".$row[0]."</td>";
            $result.="</tr>";
            $cnt+=1;
        }
    }
    $result.="</table>";
    $result.="<script>$('#mainContentPanel').load('database.php?id=wp&qur=srv');</script>";
    return $result;
}

public function getSearchResultSet($searchData){
    $result=$searchData;
    //call main function which displays the companies in MainContentPanel (getServices(0,searchString)))
    $result=$this->getServices(0,$searchData);
    return $result;
}

public function getServices($id,$searchData) {
    $cont = "";
    $cont.="<table border=0 cellspacing=5 cellpadding=0>";
    $rs=$this->runQur("select categName,icon from category where folderAlias='".$id."'");
    $row = mysql_fetch_array($rs);
    $icon="<img src='".$row[1]."' style='width:50px; height:50px;'>";
    $cont.="<th colspan=5><div class='ta la baseHead'>".$icon." ".$row[0]."</div></th>";
    $counter = 0;
    if($searchData==""){
        $rs=$this->runQur("select id, name, displayName, counter, mainIcon, website,facebookPage,twitterPage,linkedinPage from registration where category='".$id."' and status='active'");
    }
    else{
        $searchStr="(displayName like '%$searchData%' OR name like '%$searchData%' OR website like '%$searchData%'";
        $searchStr.=" OR facebookPage like '%$searchData%' OR twitterPage like '%$searchData%' OR linkedinPage like '%$searchData%')";
        $rs=$this->runQur("select id, name, displayName, counter, mainIcon, website,facebookPage,twitterPage,linkedinPage from registration where $searchStr and status='active' order by counter");
    }
    if(mysql_num_rows($rs)==0){
        $cont.="<tr>";
        $cont.="<td colspan=5 class='error'>oops, No Records Found.</td>";
        $counter=5;
    }
    while (($row = mysql_fetch_assoc($rs)) != null) {
        $dispName=str_replace(" ", "&nbsp;",substr($row['displayName'],0,25));
        
        $companyId=$row['id'];
        $reviewClick="reviewClickAction('".$companyId."');  incrementHits(".$companyId.");";
        $wbpage="";$fbpage="";$twpage="";$lnpage="";
        if($row['website'] != null) $wbpage="redirectPage('".$row['website']."'); incrementHits(".$companyId.");";
        if($row['facebookPage'] != null) $fbpage="redirectPage('".$row['facebookPage']."'); incrementHits(".$companyId.");";
        if($row['twitterPage'] != null) $twpage="redirectPage('".$row['twitterPage']."'); incrementHits(".$companyId.");";
        if($row['linkedinPage'] != null) $lnpage="redirectPage('".$row['linkedinPage']."'); incrementHits(".$companyId.");";

        $baseInfo="<div class='subheading3'>".$dispName."</div>";
        $mainIcon = $row['mainIcon'] . "/mainIcon.png";
        if (!file_exists($mainIcon)) $mainIcon = $row['mainIcon'] . "/mainIcon.jpg";
        if (!file_exists($mainIcon)) $mainIcon = $row['mainIcon'] . "/mainIcon.jpeg";

        $missingIcon = "img/missingIcon.jpg";
        //main contents holder
        $sLink = "loadMyDetails(".$companyId.");  incrementHits(".$companyId."); setTopPanel(); showPanel('servicePanel');";
        if($counter==0) $cont.="<tr>";
        $cont.="<td class='mainContainer'>";
        $cont.="<span class='click' widht=auto onClick=\"" . $sLink . "\">$baseInfo</span>";
        if (file_exists($mainIcon))
            $cont.="<img class='mainImageBox' src='" . $mainIcon . "' onClick=\"" . $sLink . "\"/>";
        else
            $cont.="<img class='mainImageBox' src='" . $missingIcon . "' onClick=\"" . $sLink . "\"/>";
        //footer panel of the service page
        //$cont.="<div class='bg'>visits: ".rand(100,100000);
        $stl=" style='width:15px; height:15px'";
        $hit = "<img $stl src='img/hit.png' class='pt' onClick='incrementHits(".$companyId.");'/>";
        $cont.="<div>";
        $cont.=" <span class='pt' onClick=\"".$reviewClick."\"><img $stl src='img/rw.png'></span>";
        if($wbpage!="")$cont.=" <span class='pt' onClick=\"".$wbpage."\"><img $stl src='img/wb.png'></span>";
        if($fbpage!="")$cont.=" <span class='pt' onClick=\"".$fbpage."\"><img $stl src='img/fb.png'></span>";
        if($twpage!="")$cont.=" <span class='pt' onClick=\"".$twpage."\"><img $stl src='img/tw.png'></span>";
        if($lnpage!="")$cont.=" <span class='pt' onClick=\"".$lnpage."\"><img $stl src='img/ln.png'></span>";
        $cont.=" <span id='hit".$companyId."' style='font-size: 8pt; font-weight: bold'>".$row['counter']."</span>$hit";
        $cont.="</div>";
        $cont.="</td>";
        $counter+=1;
        if ($counter==5){
            $cont.="</tr>";
            $counter=0;
        }
    }
    for($i=0;$i<5-$counter;$i++){
        $cont.="<td class='mainContainer'></td>";
    }
    $cont.="</tr>";
    $cont.="</table>";
    mysql_free_result($rs);
    return $cont;
}

public function test(){
    //return $this->readQuery("getCategory");
    echo date("m-d-Y h:i:sa");
    //print $this->getCategTable("getCategory.sql");
}

public function getHits($id){
    $sql="select counter from registration where id=".$id;
    $rs=$this->runQur($sql);
     if(mysql_numrows($rs)!=0){
        $row=mysql_fetch_assoc($rs);
        echo $row["counter"];
    }
    mysql_free_result($rs);
}

public function getReviews($id){
    $data="";
    $cnt=0;
    $data.="<div id='myReviewTable'>";
    $data.="<table id='reviewTable' cellspacing=2 cellpadding=2>";
    $sql="select a.id,review,rating,displayName,likes from feedback a 
    inner join registration b ON a.companyId=b.id where a.companyId=".$id." order by likes desc";
    $submitIcon="<input type='button' value='Submit' onClick='submitReview(".$id.");' style='width:70pt;'/>";
    $rs=$this->runQur($sql);
     if(mysql_numrows($rs)!=0){
        while (($row = mysql_fetch_assoc($rs)) != null) {
            if($cnt==0){
                //$submitIcon="<img class='pt' height=40 width=100 src='img/submit2.png' onClick='submitReview(".$id.");' />";
                $data.="<th colspan=4 class='la heading bg'>".$row["displayName"]."</th>"; 
                $data.="<tr class='ra'><td colspan=4 class='mybox' style='height: 4em;'><textarea rows=4 cols=20 max=1000 id='tMyReviewBox_".$id."' placeholder='write your review'></textarea>
                <br/>$submitIcon</td></tr>";
            }
            $likeIcon="<img class='pt' height=20 width=20 src='img/like1.png' onClick=\"incrementLikes(".$row["id"].");\"/>";
            $data.="<tr><td class='mybox' style='height: 2em;'>".$row["review"]."</td><td></td><td class='pt' id='like".$row["id"]."' onClick=\"incrementLikes(".$row["id"].");\">".$row["likes"]."</td><td>$likeIcon</td></tr>";
            $cnt+=1;
        }
    }else{
        $data.="<tr><td colspan=4 class='mybox' style='height: 4em;'><textarea rows=4 cols=20 max=1000 id='tMyReviewBox_".$id."' placeholder='write your review'></textarea>
        <br/>$submitIcon</td></tr>";
        $data.="<tr><td class='subheading'>No Reviews done</td></tr>";
    }
    $data.="</table>";
    $data.="</div>";
    mysql_free_result($rs);
    return $data;
}

    Public function getPlanning($orderBy){
        $data="";
        $forEmail="";
        $sql="select f.* from (";
        $sql.=" select  @num := if(@type = b.categName, @num + 1, 1) as Row";
        $sql.=" ,@type:=b.categName as Type,";
        $sql.=" if(a.displayName is null,b.categName,a.displayName) as DN,if(a.mainIcon is null,'None',a.mainIcon) as MI, if(a.counter is null,0,a.counter) as CN,b.categName,a.id,a.email,a.repName,a.repPhone,a.contactInfo,a.website,a.facebookPage,a.linkedInPage,a.twitterPage,if(a.overallCost is null,0,a.overallCost) as OC,b.icon from registration a"; 
        $sql.=" right join category b ON a.category=b.folderAlias";
        $sql.=" inner join (select @num=1, @type='') r";
        if($orderBy==1)$sql.=" order by b.sortOrder asc,a.counter desc";
        if($orderBy==2)$sql.=" order by b.sortOrder asc,a.overallCost asc";
        $sql.=" ) f where f.Row<=3;";

        //$missingIcon = "img/missing1.png";
        $missingIcon = "";
        $imgMn="<img src='img/rupee.png' style='width:15px; height:15px;'>";
        $hit = "<img style='margin:1px; width:15px; height:15px' src='img/hit.png'/>";
        $rs=$this->runQur($sql);
        $cnt=0;
        $style="style='width:100px; height:75px'";
        $style1="style='width:100%; height:100px'";
        $stl2="style='width:15px; height:15px'";
        $data="<div class='bg1 ra'><input type='text' id='emailPwGuest' placeholder='Your Email' value='devendraprasad1984@gmail.com' style='width:400px;' />&nbsp;<span class='pt' onClick=\"sendPlanWedEmailToGuest('emailPwGuest');\">Mail Me</span>
        <br/><span id='emailStatus'></span>
        </div>";
        $data.="<table>";
        $data.="<th colspan=5><p class='heading la'>Your Wedding Helpers...</p></th>";
        $data.="<tr><td colspan=5 class='la' style='color:red; font-size:12pt; font-weight: bold;'>Your Wedding $imgMn <span id='mySelectCost'>0</span></td></tr>";
        $numRows=mysql_numrows($rs);
         if($numRows!=0){
            while (($row = mysql_fetch_assoc($rs))!=null) {
                $companyId=$row["id"];
                $myCost=$row["OC"];
                $icon="<img src='".$row["icon"]."'>";
                $events="onClick='toggleColor(this, $companyId);'";
                $forEmail="<span style='font-sixe:8pt;'>";
                $forEmail.="Contact Person: ".$row["repName"]."(".$row["repPhone"].")"."<br/>";
                $forEmail.="<img src='img/ph.png' $stl2> ".$row["contactInfo"]."<br/>";
                $forEmail.="<img src='img/wb.png' $stl2> ".$row["website"]."<br/>";
                $forEmail.="<img src='img/fb.png' $stl2> ".$row["facebookPage"]."<br/>";
                $forEmail.="<img src='img/tw.png' $stl2> ".$row["twiiterPage"]."<br/>";
                $forEmail.="$imgMn ".$myCost."<br/>";
                $forEmail.="</span>";
                $viewClicks="incrementHits(".$companyId."); loadMyDetails(".$companyId."); setTopPanel(); showPanel('servicePanel');";
                if($cnt==0) {$data.="<tr>";}
                if($row['MI']=="None" || $row['MI'] == null){
                    $img="<img $style src='".$missingIcon."' class='mainImageBox' />";
                    $img1="<img $style1 src='".$missingIcon."' class='mainImageBox' />";
                }else{
                    $mainIcon = $row['MI'] . "/mainIcon.png";
                    if (!file_exists($mainIcon)) $mainIcon = $row['MI'] . "/mainIcon.jpg";
                    if (!file_exists($mainIcon)) $mainIcon = $row['MI'] . "/mainIcon.jpeg";
                    if (file_exists($mainIcon)) $img="<img $style src='".$mainIcon."' class='mainImageBox' />";
                    $img1="<img $style1 src='".$mainIcon."' class='mainImageBox' />";
                }
                $data.="<td class='planWedContainer' $events><div class='bg pt' onClick=\"".$viewClicks."\">".$row["DN"]."</div>".$img."<br/>
                <div class='va pt' onClick='incrementHits(".$companyId.");'>$hit<span id='hit".$companyId."'>".$row["CN"]."</span>
                $imgMn <span id='myCost".$companyId."'>$myCost</span>
                </div>";

                $data.="<div id='forMail".$companyId."' class='hide'><table border=1 cellspacing=1 cellpadding=1><th colspan=2 class='ta la'>".$icon." ".$row["DN"]."</th>
                <tr><td width='20%' style='text-align: left; vertical-align: top;'>$img1</td><td width='80%' style='text-align: left; vertical-align: top;'>$forEmail</td></tr>
                </table></div>";
                $data.="</td>";
                $cnt=$cnt+1;
                if ($cnt==5) {$data.="</tr>"; $cnt=0;}
            }//while loop
        }//if loop
        if($numRows%5 !=0 )$data.="</tr>";
        $data.="</table>";
        mysql_free_result($rs);
    return $data;
    }
}//main class end

echo "<script>unsetText();</script>";

?>