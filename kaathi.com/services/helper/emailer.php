<?php
require_once '../libs/email.php';

    function sendEmail($data){
        $send = new Email();
        $mailDetails = ['email' => $data['email']];
        $message = '<p>Dear ' . $data['name'] . ',</p>';

        if ($data['emailtype'] == "contact-email"){
            $mailDetails['subject']  = 'Kaathi.com Notification';
            $message .= '<div>you have a message as follows</div>';
            $message .= '<div>Message: ' . $data['message'] . '<br>
                        Name: ' . $data['name'] . '<br>
                        Email: ' . $data['email'] . '<br>
                        Contact: ' . $data['contact'] . '<br>
                        </div>';
            $message .= '<div style="font-weight: bold; font-size: 12px; margin: 2px;"> 
                <a href="' . $data['approveurl'] . '" style="'.STYLEBTN.GREEN.'" > Reply </a>
                </div>';

        }
        else if($data['emailtype'] == "notifyPostOwner"){
            $mailDetails['subject']  = 'Kaathi.com Posts';
            $message .= '<div>You have received a message on your post.</div>';
            $message .= '<div>'.$data['comment'].'</div>';
        }
        $mailDetails['message'] = $message;
        $send->sendMail($mailDetails);

    }