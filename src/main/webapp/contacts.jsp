
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.List"%>
<%@ page import="com.vmesteonline.be.UserServiceImpl"%>
<%@ page import="com.vmesteonline.be.thrift.ShortUserInfo"%>
<%@ page import="com.vmesteonline.be.thrift.UserContacts"%>
<%@ page import="com.vmesteonline.be.AuthServiceImpl"%>
<%@ page import="com.vmesteonline.be.thrift.InvalidOperation"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%
    HttpSession sess = request.getSession();
    pageContext.setAttribute("isAuth",true);
    Boolean isAuth = true;

    try {
        AuthServiceImpl.checkIfAuthorised(sess.getId());

        UserServiceImpl userService = new UserServiceImpl(request.getSession());

        ShortUserInfo shortUserInfo = userService.getShortUserInfo();
        UserContacts userContacts = userService.getUserContacts();

        pageContext.setAttribute("shortUserInfo",shortUserInfo);
        pageContext.setAttribute("userContacts",userContacts);


    } catch (InvalidOperation ioe) {
        isAuth = false;
        pageContext.setAttribute("isAuth",false);
    }

%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Контакты</title>
    <link rel="shortcut icon" href="/static/i/landing/vmesteonline.png">
    <link rel="stylesheet" href="/static/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="/static/css/style.css" />
    <link rel="stylesheet" href="/static/css/lib/fancybox/jquery.fancybox.css"/>
    <link rel="stylesheet" href="/static/css/lib/jquery.Jcrop.css"/>
    <link rel="stylesheet" href="/static/js/bower_components/select2/select2.css"/>

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
<body class="height100 height100-2">
<div class="navbar navbar-default" id="navbar">

    <div class="navbar-container coming-soon" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="/" class="navbar-brand">
                <img src="/static/i/logo.png" alt="логотип"/>
            </a>
        </div>
    </div>
</div>

<div class="container coming-soon">

    <div class="main-container" id="main-container">
        <div class="main-container-inner">
            <div class="wrap contacts">
                <br/>
                <br/>
                <br/>
            <p>Если вам есть что сказать, заполните форму и нажмите "Отправить"</p>
                <br/>

            <form action="#">

                <c:choose>
                    <c:when test="${isAuth}">

                        <div class="contacts-user clearfix">
                            <div class="avatar short pull-left" style="background-image: url(<c:out value="${shortUserInfo.avatar}"/>)"></div>
                            <div class="user-name" data-email="<c:out value="${userContacts.email}"/>"><c:out value="${shortUserInfo.firstName}"/> <c:out value="${shortUserInfo.lastName}"/></div>
                        </div>

                    </c:when>

                    <c:otherwise>

                        <input class="input name" type="text" placeholder="Имя"/>
                        <input class="input email" type="email" placeholder="E-mail"/>

                    </c:otherwise>

                </c:choose>

                <textarea class="content no-resize" onblur="if(this.value=='') this.value='Сообщение';" onfocus="if(this.value=='Сообщение') this.value='';">Сообщение</textarea>

                <button class="btn btn-sm btn-primary no-border send">Отправить</button>
                <span class="info-good hidden">Ваше сообщение отправлено</span>
            </form>
                <br/>
                <div>
                    <a href="/">Вернуться на главную</a>
                </div>
                <br/>
            </div>

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
    $(document).ready(function(){
        var transport = new Thrift.Transport("/thrift/MessageService");
        var protocol = new Thrift.Protocol(transport);
        var messageClient = new com.vmesteonline.be.thrift.messageservice.MessageServiceClient(protocol);

        $('.send').click(function(e){
            e.preventDefault();

            var email, name,
                content = $('.content').val();
            if($('.contacts-user').length){
                email = $('.user-name').attr('data-email');
                name = $('.user-name').text();
            }else{
                email = $('.email').val();
                name = $('.name').val();
            }

            messageClient.sendInfoEmail(email,name,content);

            $('.info-good').removeClass('hidden');
            setTimeout(hideInfo,2000);
        });

        function hideInfo(){
            $('.info-good').addClass('hidden');
        }

        var oldTextLength = 0;
        $('.content').keyup(function(event){

            var el = event.target,
                    clientHeight = el.clientHeight,
                    scrollHeight = el.scrollHeight,
                    textLength = el.textLength,
                    clientWidth = el.clientWidth,
                    textLengthPX, newHeight,removeRowCount,
                    defaultHeight, newRowCount;

            defaultHeight = 100;

            /*
             Исходные данные:
             На один символ приходится ~8px в ширину
             Высота строки текста ~14px

             * Здесь выполняем такие действия :
             * 1) Считаем длину текста в пикселях
             * 2) Определяем целое количестов строк, которые удалили
             * 3) Определям новую высоту с учетом высоты удаленного текста
             * */

            if(scrollHeight > clientHeight){

                el.style.height = scrollHeight+'px';
            }else if(scrollHeight > defaultHeight){
                textLengthPX = (parseInt(oldTextLength) - textLength) * 8; // 1
                if (textLengthPX > clientWidth){
                    removeRowCount = Math.floor(textLengthPX/clientWidth); // 2
                    newHeight = parseInt(event.target.style.height) - removeRowCount*14; // 3
                    newHeight > defaultHeight ? event.target.style.height = newHeight+"px":
                            event.target.style.height = defaultHeight+'px';

                }else{
                    el.style.height = scrollHeight-6+'px';

                }
            }else{
                el.style.height = defaultHeight+'px';
            }
            oldTextLength = textLength;
        });
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