#!/usr/bin/php
<?php

$link=mysql_connect("localhost", "root", "redhat7.3");
mysql_select_db("landing-vo");
//$sql = "select a.code, substring( a.addr, 23, 10) as aa, u.email, count(*) from addr a right join users u on a.code=u.code where a.addr like 'улица Ленинградская 7%' group by code,email";
$sql = "select email, code,  substring( addr, 23, 10) as aa  from aaa";

$result = mysql_query($sql);

echo $sql."\n";

if (false === $result) {
    echo mysql_error();
}

while($row = mysql_fetch_array($result)) {
    	$recipient = $row['email'];
	$addr = $row['aa'];
	$code = $row['code'];
	echo $addr;

	$to = $recipient;
//	$to = 'info@vmesteonline.ru';
	$subject = "ВместеОнлайн.ру. Сайт дома Ленинградская д. 7. Регистрация.";

	$body = "<html><title>".$subject."</title><body><b>Здраствуйте,</b><p>";
	$body .= "Вы ввели правильный код-приглашение на сайте <a href=\"https://vmesteonline.ru\">vmesteonline.ru</a>.</p>";
	$body .= "<p> Для того, чтобы завершить регистрацию перейдите по <a href=\"";
	$body .= "https://www.vmesteonline.ru/registration.html#email=".$recipient.";mapUrl=";
	$body .= "https://static-maps.yandex.ru/1.x/?l=map&pt=30.515070,59.914687,pm2blm&size=450,450&spn=0.0045,0.0045".";address=";
	$body .= rawurlencode("Россия, Ленинградская Обл. п. Кудрово, \nулица Ленинградская дом 7 кв ".$addr).";code=".$code."\">ссылке</a></p>";
	$body .= "<p>На сайте зарегистрировано 235 ваших соседей.</p>";
	$body .= "<p>C уважением, Команда <a href=\"https://www.vmesteonline.ru/blog\">ВместеОнлайн</a></p></body></html>";
	
	$headers = 'From: info@vmesteonline.ru' . "\r\n" ;
	$headers .= "Content-type: text/html; charset=utf-8 \r\n";

	mail($to, $subject, $body, $headers);
	echo "mail sent to:".$recipient." body: ".$body."\r\n";
}

?>
