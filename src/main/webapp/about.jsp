<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>О нас</title>
<link rel="stylesheet" href="/static/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet" href="/static/css/style.css" />
<link rel="stylesheet" href="/static/css/lib/fancybox/jquery.fancybox.css" />
<link rel="stylesheet" href="/static/css/lib/jquery.Jcrop.css" />
<link rel="stylesheet" href="/static/js/bower_components/select2/select2.css" />

    <link rel="shortcut icon" href="/static/i/landing/vmesteonline.png">

<script src="/static/js/lib/jquery-2.0.3.js"></script>
<!--[if lt IE 9]>
    <script>
        document.createElement('header');
        document.createElement('section');
        document.createElement('footer');
        document.createElement('aside');
        document.createElement('nav');
    </script>
    <![endif]-->

</head>
<body>

	<div class="navbar navbar-default" id="navbar">

		<div class="navbar-container coming-soon" id="navbar-container">
			<div class="navbar-header pull-left">
				<a href="/" class="navbar-brand"> <img src="/static/i/logo.png" alt="логотип" />
				</a>
			</div>
		</div>
	</div>

	<div class="container coming-soon about">

		<div class="main-container" id="main-container">
			<div class="main-container-inner">

				<br />
				<h1>Что такое ВместеОнлайн</h1>
				<p>ВместеОнлайн - это закрытая социальная сеть только для соседей. ВместеОнлайн - это самый простой и безопасный способ для Вас и Ваших соседей общаться онлайн и сделать Вашу реальную жизнь
					немного комфортней. Люди используют ВместеОнлайн для того чтобы:</p>
				<ul>
					<li>получить отзыв о детском саде или школе поблизости;</li>
					<li>создать инициативную группу для решения проблемы;</li>
					<li>обсудить работу управляющей компании;</li>
					<li>организовать групповую закупку;</li>
					<li>выбрать интернет-провайдера;</li>
					<li>узнать как зовут соседей.</li>
				</ul>
				<p>Используя современные технологии мы создаем добрососедские отношения!</p>
				<br />

				<h1>Во что мы верим</h1>
				<p>Мы создали ВместеОнлайн потому, что мы верим, что добрососедские отношения - это очень важный шаг на пути к более комфортной и более безопасной жизни. Мы верим, что вокруг нас живет много
					хороших и небезразличных людей, которые вместе смогут сделать окружающий мир лучше. ВместеОнлайн - это удобный и современный способ общения. Мы сделали ВместеОнлайн для Вас.</p>
				<br />

				<h1>Приватность</h1>
				<p>Онлайн-приватность никогда не бывает лишней. На сайте ВместеОнлайн Вы можете обсуждать с соседями онлайн все, что обсуждаете лично, встречаясь у лифта.</p>
				<p>Мы гарантируем, что:</p>
				<ul>
					<li>Доступ на сайт возможен только по коду-приглашению, который доставляется в почтовый ящик;</li>
					<li>Вся информация передается по шифрованному протоколу HTTPS;</li>
					<li>Мы никогда не дадим рекламодателям доступ к Вашим данным;</li>
					<li>Содержимое сайта никогда не будет доступно поисковым системам.</li>
				</ul>
                <div>
                    <a href="/main">Вернуться на главную</a>
                </div>
                <br/>
			</div>
		</div>

		<div class="footer footer-bottom clearfix">
			<div class="pull-left"><span class="copypast">&copy;</span> ВместеОнлайн 2014</div>
			<div class="pull-right">
				<ul>
					<li><a href="about">О сайте</a></li>
					<li><a href="blog">Блог</a></li>
					<li><a href="contacts">Контакты</a></li>
				</ul>
			</div>
		</div>

	</div>


	<!-- файлы thrift -->
	<script src="/static/js/thrift.js" type="text/javascript"></script>
	<script src="/gen-js/bedata_types.js" type="text/javascript"></script>
	<script src="/gen-js/messageservice_types.js" type="text/javascript"></script>
	<script src="/gen-js/MessageService.js" type="text/javascript"></script>
	<!-- -->
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							var transport = new Thrift.Transport(
									"/thrift/MessageService");
							var protocol = new Thrift.Protocol(transport);
							var messageClient = new com.vmesteonline.be.thrift.messageservice.MessageServiceClient(
									protocol);

							var h = $(window).height() - 105;
							$('.container.coming-soon .main-container').css({
								'min-height' : h
							});

							$('.send-in-blog').click(function() {
								//userClient.postMessage();
							})
						});
	</script>

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function() {
                try {
                    w.yaCounter25964365 = new Ya.Metrika({id:25964365,
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        trackHash:true,
                        ut:"noindex"});
                } catch(e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                    s = d.createElement("script"),
                    f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
    </script>
    <noscript><div><img src="//mc.yandex.ru/watch/25964365?ut=noindex" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->


</body>


</html>