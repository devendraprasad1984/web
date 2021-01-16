<?php

class config {

    function getConfig($id) {
        $cont = "";
        $xmlFileName = "js/config.xml";
        $xml = simplexml_load_file($xmlFileName);
        foreach ($xml as $tag) {
            if ($id == "") {
                $cont.=$tag->getName() . "->" . $tag . "<br/>";
            }
            if ($tag->getName() == $id) {
                $cont = $tag;
            }
        }
        return $cont;
    }

}

Class Mailer {

    public $emailData = "";
    public $contact_name = "";
    public $contact_email = "";
    public $contact_subject = "";

    function getIP() {
        return $_SERVER['REMOTE_ADDR'];
    }

    function saveQuery($email, $msg) {
        $time = date('d-M-Y H:i:s');
        $strData = "";
        $strData.="<query>\n";
        $strData.="<ip>" . $this->getIP() . "</ip>\n";
        $strData.="<time>" . $time . "</time>\n";
        $strData.="<email>" . $email . "</email>\n";
        $strData.="<data><![CDATA[" . $msg . "]]></data>\n";
        $strData.="</query>\n";
        $filename = "doc/queries.xml";
        file_put_contents($filename, $strData . "\n", FILE_APPEND);
        return "<p class='subheading1'>Query Saved</p>";
    }

    function sendMail() {
        require_once 'js/class.phpmailer.php';
        //enable openSSL.dll in php ini and extension dir must be set to the ext folder
        $mail = new PHPMailer();
        $cfg = new config();
        $mail->isSMTP(true);
        $mail->SMTPDebug = (int) $cfg->getConfig("SMTPDebug");
        $mail->Mailer = $cfg->getConfig("Mailer");
        $mail->CharSet = 'UTF-8';
        $mail->Host = $cfg->getConfig("Host");
        $mail->Port = (int) $cfg->getConfig("Port");
        $mail->SMTPAuth = true; // settype($cfg->getConfig("SMTPAuth"),'bool');
        $mail->Username = $cfg->getConfig("Username");
        $mail->Password = $cfg->getConfig("Password");
        $mail->SMTPSecure = $cfg->getConfig("SMTPSecure");
        $mail->PluginDir = $cfg->getConfig("Plugdir");

        if (!$mail->SmtpConnect()) {
            echo 'Could not connect to mail server<br/>';
            exit;
        } else {
            $from = $cfg->getConfig("FromAddress");
            $mail->From = $from;
            $mail->FromName = $from;
            $to = $cfg->getConfig("ToAddress");
            $reply = $cfg->getConfig("ReplyAddress");
            $mail->addAddress($to, $to);  // Add a recipient
            //$mail->addReplyTo($reply, $reply);
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            $mail->WordWrap = (int) $cfg->getConfig("Wordwrap");
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            $mail->isHTML(true);

            $mail->Subject = $cfg->getConfig("Subject");
            $mail->Body = "Client IP: " . $this->getIP() . "<hr/><br/>" . $this->emailData;
            //$mail->AltBody = 'SonicAgeIndia mailer';

            if (!$mail->send()) {
                $msg = 'Message could not be sent.';
                $msg.= 'Mailer Error: ' . $mail->ErrorInfo;
                return $msg;
                exit;
            }
        }
        $mail = null;
        $cfg = null;
        return "Your message has been sent. We will get back to you soon.";
    }

}

?>