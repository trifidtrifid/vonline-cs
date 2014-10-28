<?

// пример запроса
// vmesteonline.ru/send.php?from=a@a.ru&to=b@b.ru&cc=asd&subject=asd&body=asdfgh

$message = '<html><head>
 <title>'.$_POST['subject'].'</title>
</head>
<body>'.$_POST['body'].'</body>
</html>';

$message = wordwrap($message,70);

$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: ".$_POST['from']."\r\n";
$headers .= "Bcc: ".$_POST['cc']."\r\n";
$headers .= "To: ".$_POST['to']."\r\n";
$newsubject = '=?UTF-8?B?'.base64_encode($_POST['subject']).'?=';

if( mail($_POST['to'], $newsubject, $message, $headers)){
	echo 'OK';
} else {
	echo 'FAIL';
}

?>
