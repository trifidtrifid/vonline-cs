<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Бэкоффис</title>
    <link rel="stylesheet" href="/static/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet" href="/static/css/style.css" />
<link rel="stylesheet" href="/static/css/backoffice.css" />
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
<body>
<div class="navbar navbar-default" id="navbar">
    <script type="text/javascript">
        try {
            ace.settings.check('navbar', 'fixed')
        } catch (e) {
        }
    </script>

    <div class="navbar-container" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
                <img src="/static/i/logo.png" alt="логотип"/>
            </a>
        </div>

        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li><a class="btn btn-info no-border private-messages-link"
                                                                  href="#">Личные сообщения </a></li>

                <li><a class="btn btn-info no-border nextdoors-link"
                                                            href="#"> Соседи</a></li>

            </ul>
        </div>

    </div>
</div>

	<div class="container coming-soon backoffice">

		<div class="main-container" id="main-container">
			<div class="main-container-inner">
                <br>
                <br>
                <h2>Добавить пост в блог.</h2>
                <input placeholder="Ссылка на пост" class="post-url" type="text"/>

                <button class="btn no-border btn-sm btn-primary send-post">Отправить</button>

                <div class="broadcast">
                    <br/>
                    <h2>Отправить уведомление пользователям.</h2>
                    <div><input class="broadcast-code" type="text" placeholder="Код группы"/></div>
                    <p></p>
                    <div><textarea class="broadcast-message">Сообщение</textarea></div>
                    <p></p>
                    <button class="btn btn-sm no-border btn-primary send-broadcast">Разместить</button>
                </div>

                <div>
                    <h2>Иниициализация счетчиков</h2>
                    <div class="bo-counter-item"><input type="text" class="counter-buildingid" placeholder="Building id" /></div>
                    <div class="bo-counter-item"><input type="text" class="counter-startdate" placeholder="start date" /></div>
                    <div class="bo-counter-item"><input type="text" class="counter-enddate" placeholder="end date" /></div>

                    <div class="bo-counters">
                        <a href="#" class="addCounter pull-right">Добавить</a>
                        <div class="bo-counter-select">
                            <select>
                                <option value="0">Горячая вода</option>
                                <option value="1">Холодная вода</option>
                                <option value="2">Эл-во общий</option>
                                <option value="3">Эл-во ночь</option>
                                <option value="4">Эл-во день</option>
                                <option value="5">Газ</option>
                                <option value="6">Другое</option>
                            </select>
                        </div>
                    </div>

                    <button class="btn btn-sm no-border btn-primary init-counter">Инициализировать</button>
                    <span class="counter-init-status "></span>

                </div>
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
<script src="/gen-js/utilityservces_types.js" type="text/javascript"></script>
<script src="/gen-js/UtilityService.js" type="text/javascript"></script>
<!-- -->

<script type="text/javascript">
    $(document).ready(function(){
        var transport = new Thrift.Transport("/thrift/MessageService");
        var protocol = new Thrift.Protocol(transport);
        var messageClient = new com.vmesteonline.be.thrift.messageservice.MessageServiceClient(protocol);

        transport = new Thrift.Transport("/thrift/UserService");
        protocol = new Thrift.Protocol(transport);
        var userClient = new com.vmesteonline.be.thrift.userservice.UserServiceClient(protocol);

        transport = new Thrift.Transport("/thrift/UtilityService");
        protocol = new Thrift.Protocol(transport);
        var utilityClient = new com.vmesteonline.be.thrift.utilityservice.UtilityServiceClient(protocol);

        $('.send-post').click(function(e){
            e.preventDefault();
            var groups = userClient.getUserGroups();

            var newTopic = new com.vmesteonline.be.thrift.messageservice.Topic();
            newTopic.message = new com.vmesteonline.be.thrift.messageservice.Message();
            newTopic.message.groupId = groups[0].id;
            //newTopic.message.topicId = 0;
            newTopic.message.type = 7; // blog
            newTopic.message.content = $('.post-url').val();
            newTopic.message.id = 0;
            newTopic.message.created = Date.parse(new Date())/1000;

            newTopic.subject = "123";
            newTopic.id = 0;

            messageClient.postTopic(newTopic);
        });

        $('.send-broadcast').click(function(){
           var message = $('.broadcast-message').val(),
               code = [],
               startDate = Date.parse(new Date())/1000,
               expireDate = startDate+7*24*3600;

            code[0] = parseInt($('.broadcast-code').val());

            console.log(code[0]+" "+startDate+" "+message+" "+expireDate);

            messageClient.sendGroupMulticastMessage(code,message,startDate,expireDate);
        });

        $('.addCounter').click(function(e){
            e.preventDefault();

            var counterHtml = '<div class="bo-counter-select"><select>'+
                    '<option value="0">Горячая вода</option>'+
            '<option value="1">Холодная вода</option>'+
            '<option value="2">Эл-во общий</option>'+
            '<option value="3">Эл-во ночь</option>'+
            '<option value="4">Эл-во день</option>'+
            '<option value="5">Газ</option>'+
            '<option value="6">Другое</option>'+
            '</select></div>';

            $(this).parent().append(counterHtml);
        });

        $('.init-counter').click(function(){
            var buildingId = parseInt($('.counter-buildingid').val()),
                    startDate = parseInt($('.counter-startdate').val()),
                    endDate = parseInt($('.counter-enddate').val()),
                    countersList = [],ind = 0;

            $('.bo-counters select').each(function(){
                countersList[ind++] = parseInt($(this).find('option:selected').val());
            });

            console.log(buildingId+" "+startDate+" "+endDate);
            console.log(countersList);

            utilityClient.createCounterService(buildingId,startDate,endDate,countersList);

            $('.counter-init-status').addClass('info-good').text('Успешно');
        });

    });
</script>

</body>


</html>
