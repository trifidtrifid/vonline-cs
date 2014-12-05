
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ page import="com.vmesteonline.be.thrift.messageservice.TopicListPart"%>
<%@ page import="com.vmesteonline.be.MessageServiceImpl"%>
<%@ page import="com.vmesteonline.be.AuthServiceImpl"%>
<%@ page import="com.vmesteonline.be.thrift.InvalidOperation"%>


<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%
HttpSession sess = request.getSession();
pageContext.setAttribute("auth",true);
Boolean isAuth = true;

try {
AuthServiceImpl.checkIfAuthorised(sess.getId());
} catch (InvalidOperation ioe) {
    isAuth = false;
    pageContext.setAttribute("auth",false);
    //return;
}

    MessageServiceImpl messageService = new MessageServiceImpl(request.getSession().getId());

    TopicListPart Blog = messageService.getBlog(0,1000);

    pageContext.setAttribute("blog",Blog.topics);

%>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Блог</title>
    <link rel="stylesheet" href="/static/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="/static/css/style.css" />
    <link rel="stylesheet" href="/static/css/lib/fancybox/jquery.fancybox.css"/>
    <link rel="stylesheet" href="/static/css/lib/jquery.Jcrop.css"/>
    <link rel="stylesheet" href="/static/js/bower_components/select2/select2.css"/>

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
            <a href="/" class="navbar-brand">
                <img src="/static/i/logo.png" alt="логотип"/>
            </a>
        </div>
    </div>
</div>

<div class="container coming-soon">

    <div class="main-container" id="main-container">
        <div class="main-container-inner">

            <div class="main-content-top top-overflow-auto clearfix">

                <div class="page-title pull-left">Новости проекта</div>

            </div>

            <div class="wallitem-message blog" data-auth="<%=isAuth%>">


                <% if(Blog.topics != null){
                    int topicsSize = Blog.topics.size();
                    for(int i = 0; i < topicsSize; i++){
                %>
                <div class="post" data-postlink="<%=Blog.topics.get(i).message.content%>" data-topicid="<%=Blog.topics.get(i).id%>" >
                    <%--<div class="post-avatar pull-left">
                        <div style="background-image: url(<%=Blog.topics.get(i).userInfo%>)"></div>
                    </div>--%>
                    <%--<div class="post-date" data-date="<%=Blog.topics.get(i).message.created%>"></div>--%>
                    <div class="topic"></div>
                    <div class="topic-stuff">
                        <a href="#" class="show-comment">Показать комментарии</a> |
                        <a href="#" class="make-comment">Комментировать</a>
                    </div>

                    <div class="dialogs">
                    </div>

                    <div class="input-group">

                        <% if(!isAuth){  %>
                            <input type="text" class="anonName" placeholder="Имя Фамилия"/>
                        <% } %>

                        <textarea class="message-textarea"
                                  onblur="if(this.value=='') this.value='Ваш ответ';"
                                  onfocus="if(this.value=='Ваш ответ') this.value='';" ></textarea>


                        <span class="input-group-btn">
                            <button class="btn btn-sm btn-info no-radius no-border send-in-blog" type="button">
                                <i class="icon-share-alt"></i>
                                Комментировать
                            </button>
                            <span class="error-info"></span>

                        </span>
                    </div>

                </div>
        <% }} %>

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
<script src="/gen-js/userservice_types.js" type="text/javascript"></script>
<script src="/gen-js/UserService.js" type="text/javascript"></script>
<!-- -->
<script type="text/javascript">
    $(document).ready(function(){
        var transport = new Thrift.Transport("/thrift/MessageService");
        var protocol = new Thrift.Protocol(transport);
        var messageClient = new com.vmesteonline.be.thrift.messageservice.MessageServiceClient(protocol);

        transport = new Thrift.Transport("/thrift/UserService");
        protocol = new Thrift.Protocol(transport);
        var userClient = new com.vmesteonline.be.thrift.userservice.UserServiceClient(protocol);

        var isAuth = true,
            me;
        if($('.blog').attr('data-auth') == 'false') isAuth = false;

        if(isAuth){
            me = userClient.getUserProfile();
        }

        /*$('.post-date').each(function(){

            var dateNumber = $(this).attr('data-date');

            var dateStr = new Date(parseInt(dateNumber)*1000);

            $(this).text(dateStr.toLocaleDateString()+" "+dateStr.toLocaleTimeString());

        });*/

        $('.itemdiv').each(function(){
           var span = $(this).find('.lenta-item-bottom span');
           var created = span.attr('data-created');

            span.text(getTiming(created));
        });

        var h = $(window).height()-105;
        $('.container.coming-soon .main-container').css({'min-height': h});

        $('.post').each(function(){
            var link = $(this).attr('data-postlink');

            $(this).find('.topic').load(link+' .post', function(){
            });
        });

        var isCommentsLoaded = [];
        $('.show-comment').click(function(e){
            e.preventDefault();

            if($(this).text() == "Показать комментарии"){
                $(this).text("Скрыть комментарии");
            }else{
                $(this).text("Показать комментарии");
            }

            var topicId = $(this).closest('.post').attr('data-topicid'),
                dialogs = $(this).closest('.post').find('.dialogs');

            //if(!isCommentsLoaded[topicId]){
            var comments = messageClient.getMessagesAsList(topicId, 7, 0,false,1000).messages;
            //alert(comments.length);

            if(comments){
                var commentsLength = comments.length,
                    commentsHTML = "";

                for(var i = 0; i < commentsLength; i++){
                    var classNoLink = "",
                    messageAvatar,
                    messageName,
                    messageUserId;

                    if(!comments[i].userInfo){
                        messageAvatar = "data/da.gif";
                        messageUserId = 0;
                        classNoLink = "no-link";
                    }else{
                        //messageName = comments[i].userInfo.firstName+" "+comments[i].userInfo.lastName;
                        messageAvatar = comments[i].userInfo.avatar;
                        messageUserId = comments[i].userInfo.id;
                    }

                    /*messageAvatar = comments[i].userInfo.avatar;
                    messageUserId = comments[i].userInfo.id;
                    if(!messageAvatar) messageAvatar = "data/da.gif";
                    if(!messageUserId){
                        messageUserId = 0;
                        classNoLink = "no-link";
                    }*/
                    messageName = comments[i].anonName;

                    commentsHTML += '<div class="itemdiv dialogdiv new">'+
                            '<a href="profile-'+messageUserId+'" class="user '+classNoLink+'">'+
                            '<div class="avatar short2" style="background-image: url('+messageAvatar+')"></div>'+
                    '</a>'+
                    '<div class="body">'+
                            '<div class="name">'+
                            '<a href="profile-'+messageUserId+'" class="'+classNoLink+'">'+messageName+'</a>'+
                    '</div>'+
                    '<div class="text">'+comments[i].content+'</div>'+
                    '<div class="lenta-item-bottom">'+
                            '<span>'+ getTiming(comments[i].created) +'</span>'+
                    '<a href="#"> Ответить</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }
            }

            dialogs.html("");
            dialogs.prepend(commentsHTML);

            initNoLink($(this).closest('.post'));
            initAnswerToComment($('.new .lenta-item-bottom a'));
            $('.new').removeClass('new');

            isCommentsLoaded[topicId] = true;

            //}

            dialogs.slideToggle(200);
        });

        function initAnswerToComment(selector){
            selector.click(function(e){
                e.preventDefault();

                var userName = $(this).closest('.body').find('.name a').text()+", ";
                $(this).closest('.post').find('.make-comment').trigger('click',userName);
            });
        }
        initAnswerToComment($('.lenta-item-bottom a'));

        $('.make-comment').click(function(e,userName){
            e.preventDefault();

            $(this).closest('.post').find('.input-group').slideToggle(200,function(){
                if(userName){
                    $(this).find('textarea').val(userName);
                    setCaretToPos($(this).find('textarea')[0],userName.length);
                }
               $(this).find('textarea').focus();
            });
        });

        function initNoLink(selector){

            selector.find('.no-link').click(function(e){
                e.preventDefault();

            });

        }
        initNoLink($('.blog'));

        $('.send-in-blog').click(function(){
            var message = new com.vmesteonline.be.thrift.messageservice.Message();

            message.id = 0;
            message.topicId = $(this).closest('.post').attr('data-topicid');
            message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BLOG;//7;
            message.groupId = 0;
            message.content = $(this).closest('.input-group').find('.message-textarea').val();
            message.parentId = 0;
            message.created = Date.parse(new Date())/1000;
            var isAuth = true;

            if($('.blog').attr('data-auth') == 'false') isAuth = false;

            if(!isAuth){
                message.anonName = $(this).closest('.input-group').find('.anonName').val();
            }else{
                message.anonName = "";
            };

            var returnComment = messageClient.postBlogMessage(message);
            var comments = $(this).closest('.post').find('.dialogs');

                var classNoLink = "";

                if(!isAuth){
                    message.avatar = "data/da.gif";
                    message.name = message.anonName;
                    message.userId = 0;
                    classNoLink = "no-link";
                }else{
                    message.avatar = returnComment.userInfo.avatar;
                    message.name = returnComment.userInfo.firstName+" "+returnComment.userInfo.lastName;
                    message.userId = returnComment.userInfo.id ;
                }

                var newCommentHTML = '<div class="itemdiv dialogdiv new">'+
                    '<a href="profile-'+ message.userId +'" class="user '+ classNoLink +'">'+
                            '<div class="avatar short2" style="background-image: url('+ message.avatar +')"></div>'+
                            '</a>'+
                            '<div class="body">'+
                            '<div class="name">'+
                            '<a href="profile-'+ message.userId +'" class="'+ classNoLink +'" >'+ message.name +'</a>'+
                            '</div>'+
                        '<div class="text">'+ message.content +'</div>'+
                '<div class="lenta-item-bottom">'+
                        '<span>'+ getTiming(message.created) +'</span>'+
                '<a href="#">Ответить</a>'+
                '</div>'+
                '</div>'+
                '</div>';

            if(comments.css('display') == 'none'){

                $(this).closest('.post').find('.show-comment').trigger('click');

            }else{
                comments.append(newCommentHTML);

                initNoLink($('.new'));
                initAnswerToComment($('.new .lenta-item-bottom a'));
                $('.new').removeClass('new');
            }

            //setTimeout(tempFunc,1000,comments,newCommentHTML,message,$(this));

                $(this).closest('.input-group').hide();
                $(this).closest('.input-group').find('textarea').val("");

        });


        function getTiming(messageObjDate){
            var minute = 60*1000,
                    hour = minute*60,
                    day = hour*24,
                    threeDays = day* 3,
                    now = Date.parse(new Date()),
                    timing = (now - messageObjDate*1000),
                    timeTemp;

            if(timing < minute){
                timing = "только что";
            }else if(timing < hour){
                timing = new Date(timing);
                timing = timing.getMinutes()+" мин назад";
            }else if(timing < day){
                timing = new Date(timing);
                timeTemp = timing.getHours();
                if(timeTemp == 1 || timeTemp == 0){
                    timing = "1 час назад";
                }else if(timeTemp > 1 && timeTemp < 5){
                    timing = timeTemp + " часа назад";
                }else{
                    timing = timeTemp + " часов назад";
                }
            }else if(timing < threeDays){
                timing = new Date(timing);
                timeTemp = timing.getDate();
                if(timeTemp == 1){
                    timing = timeTemp+" день назад";
                }else{
                    timing = timeTemp+" дней назад";
                }
            }else{
                timeTemp = new Date(messageObjDate*1000).toLocaleDateString();
                var arr = timeTemp.split('.');
                if(arr[0].length == 1) arr[0] = "0"+arr[0];
                if(arr[1].length == 1) arr[1] = "0"+arr[1];
                timing = arr[0]+"."+arr[1]+"."+arr[2];
            }

            return timing;
        }


        function setSelectionRange(input, selectionStart, selectionEnd) {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(selectionStart, selectionEnd);
            }
            else if (input.createTextRange) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', selectionEnd);
                range.moveStart('character', selectionStart);
                range.select();
            }
        }

        function setCaretToPos (input, pos) {
            setSelectionRange(input, pos, pos);
        }

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