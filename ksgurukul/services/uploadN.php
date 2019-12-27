    <?php
try{
    if(!isset($_POST["profileBasepath"])||$_POST["profileBasepath"]==""){
        return "Path not set";
    }
    
    $ftpUpload=1;
    $prefix="www/we.com/";
    $target_dir = $prefix.$_POST["profileBasepath"];
    echo "Uploading to $target_dir <br>";

    if (!is_dir($target_dir) && $ftpUpload==0)
        mkdir($target_dir, 0777, true);

    $ftp_server="ftp.sonicageindia.co.in";
    $ftp_user_name="sonicageindia";
    $ftp_user_pass="ehz79xa5";
    $conn_id = ftp_connect($ftp_server) or die('Could not connect: ' . mysql_error());
    $login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass) or die('Could not connect: ' . mysql_error());
    if (!ftp_chdir($conn_id,$target_dir) && $ftpUpload==1) {
        if (ftp_mkdir($conn_id, $target_dir)) {
         echo "successfully created $target_dir <br>";
        } else {
         echo "There was a problem while creating $target_dir <br>";
        }
    }
    $boolFlag=0;
    $names=$_FILES["uploadArr"]["name"]; //store image names
    $tmpnames=$_FILES["uploadArr"]["tmp_name"];
    if(!isset($names)){
        $names=$_FILES["upload"]["name"]; //store image names
        $tmpnames=$_FILES["upload"]["tmp_name"];
        $boolFlag=1;
    }
    
    $i=0;
    //iterate over each image and upload it -max5
    foreach($names as $baseFileName){
        if($i>4){ return "Max 5 files can be uploaded"; exit;}
        
        $check = getimagesize($tmpnames[$i]);
        $imageFileType=pathinfo(baseName($baseFileName),PATHINFO_EXTENSION);
        if($boolFlag==0){
            $target_file =$target_dir."/".$i.".".$imageFileType; //$target_dir."/".$baseFileName;
            $myIcon=$i.".".$imageFileType;
        }
        else{
            $target_file = $target_dir."/mainIcon.".$imageFileType;
            $myIcon = "mainIcon.".$imageFileType;
        }

        if (file_exists($target_file)) {
            unlink($target_file);
        }
        $uploadOk = 1;
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists<br>";
            $uploadOk = 0;
        }
        
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
            $uploadOk = 0;
        }
    
        $filename=$tmpnames[$i];
        $percent =0.7;
        list($width, $height) = getimagesize($filename);
        $new_width = $width * $percent;
        $new_height = $height * $percent;
        $image_p = imagecreatetruecolor($new_width, $new_height);
    
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file $baseFileName was not uploaded.<br>";
        } else {
            if( $ftpUpload==0){
                if($imageFileType=="jpg" or $imageFileType=="jpeg"){
                    $img = imagecreatefromjpeg($filename);
                    imagecopyresampled($image_p, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                    imagejpeg($image_p,$target_file,9);// need to find for ftp
                }
                if($imageFileType=="png"){
                    $img = imagecreatefrompng($filename);
                    imagecopyresampled($image_p, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                    imagpng($image_p,$target_file,9); //need to find for ftp
                }
                imagedestroy($image_p);
                echo "The file ". $baseFileName. " has been uploaded.<br>";
            }
            if($login_result && isset($conn_id) &&  $ftpUpload==1){
                ftp_chdir($conn_id, $target_dir); 
                if (ftp_put($conn_id, $myIcon, $filename, FTP_BINARY))
                    echo "The file ". $baseFileName . " has been uploaded.";
                else
                    echo "Cannot upload your file";
            }
        }

        $i++;
    }
if( $ftpUpload==1 && $login_result && isset($conn_id)) ftp_close($conn_id);//close ftp connection
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}
?>