<?php
// Include and initialize phpmailer class
require 'PHPMailer/PHPMailerAutoload.php';
$mail = new PHPMailer;

// SMTP configuration
$mail->isSMTP();
$mail->Host = '10.50.0.183';
$mail->Port = 25;
$mail->Username = "support@kaathi.com";
$mail->Password = "Rbs6200#";
$mail->SMTPAuth = false;
$mail->SMTPSecure = false;
$mail->SMTPAutoTLS = false;
$mail->SMTPDebug  = 0;

$mail->setFrom('support@kaathi.com');
//$mail->addReplyTo('info@example.com', 'CodexWorld');

// Add a recipient
$mail->addAddress('nextraonline@gmail.com');

// Email subject
$mail->Subject = 'Send Email via SMTP using PHPMailer';

// Set email format to HTML
$mail->isHTML(true);

// Email body content
$mailContent = "<h1>Send HTML Email using SMTP in PHP</h1>
    <p>This is a test email has sent using SMTP mail server with PHPMailer.</p>";
$mail->Body = $mailContent;

// Send email
if(!$mail->send()){
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}else{
    echo 'Message has been sent';
}