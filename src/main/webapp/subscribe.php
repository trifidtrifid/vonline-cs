<?php
session_start();
header('Content-Type: text/html; charset=utf8');
/*$apiKey = 'e04c8d1186959dbfc5e645a02805a3d9-us7';
$listId = 'bdcd4b0a73';
$double_optin=true;
$send_welcome=true;
$email_type = 'html';
$email = $_POST['email'];
//replace us2 with your actual datacenter
$submit_url = "http://us7.api.mailchimp.com/1.3/?method=listSubscribe";

echo "test1";

$data = array(
    'email_address'=>$email,
    'apikey'=>$apiKey,
    'id' => $listId,
    'double_optin' => $double_optin,
    'send_welcome' => $send_welcome,
    'email_type' => $email_type
);
$payload = json_encode($data);


echo "test2";
 
$ch = curl_init();
echo "test2";


curl_setopt($ch, CURLOPT_URL, $submit_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, urlencode($payload));

echo "test";
 
$result = curl_exec($ch);
curl_close ($ch);
$data = json_decode($result);
if ($data->error){
    echo $data->error;
} else {
    echo "Got it, you've been added to our email list.";
}*/


/* здесь нужно ввести реальные данные для подключения к БД */
//$connect = mysql_connect("mysql.default_host","mysql.default_user","mysql.default_password");
$connect = mysql_connect("localhost","anton","Antuan4MySQL");
mysql_select_db("landing-vo",$connect);

// $_POST значения передаются через ajax
// в файле index.html

if($_POST['isOnlyAddUser']){
    // только добавление юзера в базу без опроса
    // должно рсабатывать при клике на "Подписаться" при переходе к опросу
    $email = $_POST['email'];
    $code = (int)$_POST['code'];

    if(!$code){
        $code = 999999;
    }

    $result = mysql_query("SELECT * FROM codes WHERE code = $code");
    $row = mysql_fetch_array($result);
        if($row){
            mysql_query("INSERT INTO `users`(`email`,`code`)VALUES('$email','$code')");
            echo 'Ваш email успешно добавлен !';
        }else{
            echo 'Неверный код !';
        }

}else if($_POST['isAddress']){
    //$address = $_POST['address'];
    $address  = iconv("UTF-8","UTF-8", $_POST['address']);
    mysql_query("SET NAMES utf8");
    mysql_query("INSERT INTO `addresses`(`address`)VALUES('$address')");
}else{
    $email = $_POST['email'];
    $code = (int)$_POST['code'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $userAgent = $_POST['userAgent'];
    $sessionID = session_id();

    $answersHash = $_POST['answersHash'];

    $temp = explode(";",$answersHash);
    $tempSize = sizeof($temp);
    for($i = 0; $i < $tempSize-1; $i++){
        $oneAnswerArr = explode(",",$temp[$i]);

        /*$answers[$i] = $oneAnswerArr[0];
        $timesAsk[$i] = $oneAnswerArr[1];
        $timesAnswer[$i] = $oneAnswerArr[2];*/

        /* вносим в БД */

        mysql_query("INSERT INTO `poll-result` (`email`,`code`,`ip`,`answer`,`timeAsk`,`timeAnswer`,`userAgent`,`sessionID`)VALUES('$email','$code','$ip','$oneAnswerArr[0]','$oneAnswerArr[1]','$oneAnswerArr[2]','$userAgent','$sessionID')");
    }
}
?>
