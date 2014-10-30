<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Бэкоффис</title>
    <link rel="stylesheet" href="static/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet" href="static/css/style.css" />
<link rel="stylesheet" href="static/css/lib/fancybox/jquery.fancybox.css"/>
<link rel="stylesheet" href="static/css/lib/jquery.Jcrop.css"/>
<link rel="stylesheet" href="static/js/bower_components/select2/select2.css"/>

<script src="static/js/lib/jquery-2.0.3.js"></script>
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
                <img src="static/i/logo.png" alt="логотип"/>
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

        <form method="post" action="#" class="form-group has-info form-search" ng-show="isTopSearchShow">
            <span class="block input-icon input-icon-right">
                <input id="search" type="text" class="form-control width-100" value="Поиск" onblur="if(this.value=='') this.value='Поиск';" onfocus="if(this.value=='Поиск') this.value='';"/>
                <a href="#" class="icon-search icon-on-right bigger-110"></a>
            </span>
        </form>
    </div>
</div>

	<div class="container coming-soon">

		<div class="main-container" id="main-container">
			<div class="main-container-inner">
                <br>
                <br>
                <input placeholder="Ссылка на пост" class="post-url" type="text"/>

                <button class="btn no-border btn-sm btn-primary send-post">Отправить</button>
			</div>
		</div>

	</div>


<!-- файлы thrift -->
<script src="static/js/thrift.js" type="text/javascript"></script>
<script src="gen-js/bedata_types.js" type="text/javascript"></script>
<script src="gen-js/messageservice_types.js" type="text/javascript"></script>
<script src="gen-js/MessageService.js" type="text/javascript"></script>
<script src="gen-js/userservice_types.js" type="text/javascript"></script>
<script src="gen-js/UserService.js" type="text/javascript"></script>
<!-- -->

<script type="text/javascript">
    $(document).ready(function(){
        var transport = new Thrift.Transport("/thrift/MessageService");
        var protocol = new Thrift.Protocol(transport);
        var messageClient = new com.vmesteonline.be.thrift.messageservice.MessageServiceClient(protocol);

        transport = new Thrift.Transport("/thrift/UserService");
        protocol = new Thrift.Protocol(transport);
        var userClient = new com.vmesteonline.be.thrift.userservice.UserServiceClient(protocol);

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

    });
</script>

</body>


</html>
