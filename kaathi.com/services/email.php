<?php
    require_once 'common.php';
    require_once 'PHPMailer/class.phpmailer.php';
    require_once 'PHPMailer/class.smtp.php';
    require_once 'PHPMailer/class.pop3.php';
    $ob=new common();
    // $arr = $ob->getArrayAsString($_POST);
    // $arr = $_POST['name'].$_POST['email'].$_POST['message'].$_POST['contact'];
    // $arr=print_r($_POST);

    $name = isset($_POST['name']) ? $_POST['name'] : 'Dummy';
    $email = isset($_POST['email']) ? $_POST['email'] : 'devendraprasad1984@gmail.com';
    $contact = isset($_POST['contact']) ? $_POST['contact'] : 'Dummy contact';
    $message = isset($_POST['message']) ? $_POST['message'] : 'dummy message';
    $br = $ob->br;
    $body = $br."Name: ".$name . $br ."Email: ". $email . $br . "Contacted By: ".$contact . $br . "Query: ". $message;
    try {
        $mail=new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPAutoTLS=false;
        $mail->SMTPSecure = false;
        $mail->SMTPDebug  = 0;
        $mail->Host = 'mail.kaathi.com';
        $mail->Port = 25;
        $mail->IsHTML(true);
        $mail->Username = 'support@kaathi.com';
        $mail->Password = 'Rbs6200#';
        $mail->SetFrom('support@kaathi.com');
        $mail->Subject = 'support query on ' . date("Y-m-d");
        $mail->Body = "Support query has been raised. kindly look" . $br . $body;
        $mail->AddAddress('delhi.kaathi@gmail.com');
        $mail->addBCC('devendraprasad1984@gmail.com');
        $isSent = $mail->send();
        header("Content-Type: application/json; charset=UTF-8");
        $res = Array('msg' => 'none');
        if ($isSent) {
            $res = Array(
                'msg' => 'Thanks ' . $name . ' for contacting us. We will respond to you asap'
            );
        } else {
            $res = Array(
                'msg' => 'message could not be sent'
            );
        }
    } catch (Exception $e) {
        $res = Array(
            'msg' => 'Message could not be sent. kindly contact support team' . $br. $mail->ErrorInfo
        );
    }
    echo json_encode($res);
?>