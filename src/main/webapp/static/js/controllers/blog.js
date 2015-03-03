
var blogCtrl = function($rootScope) {
    var blog = this;

    $rootScope.base.isFooterBottom = true;

    blog.isAuth = authClient.checkIfAuthorized();

    if(blog.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    blog.posts = messageClient.getBlog(0,1000);

    var len = blog.posts.topics.length;
    for(var i = 0; i < len; i++){
        blog.posts.topics[i].isCommentShow = false;
        blog.posts.topics[i].isInputShow = false;
    }

    blog.toggleComm = function($event,post){
        $event.preventDefault();

        if (post.isCommentShow){
            post.isCommentShow = false;

        }else{
            post.isCommentShow = true;

            if(!post.comments) {
                post.comments = messageClient.getMessagesAsList(post.id, 7, 0, false, 1000).messages;
                console.log('finish');
            }
        }

    };

    blog.toggleInput = function($event,post){
        $event.preventDefault();

        post.isInputShow ? post.isInputShow = false : post.isInputShow = true;

        console.log('input',post.isInputShow);

        //$(this).closest('.post').find('.input-group').slideToggle(200,function(){
            /*if(userName){
                $(this).find('textarea').val(userName);
                setCaretToPos($(this).find('textarea')[0],userName.length);
            }
            $(this).find('textarea').focus();*/
        //});
    };

    blog.sendComm = function($event,post){
        $event.preventDefault();
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        message.id = 0;
        message.topicId = post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BLOG;//7;
        message.groupId = 0;
        message.content = post.commenting;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;

        if(!blog.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        var returnComment = messageClient.postBlogMessage(message);
        if(post.comments && post.comments.length) {
            post.comments.push(returnComment);
        }else{
            post.comments = [];
            post.comments[0] = returnComment;
        }

    };

    blog.getTiming = function(messageObjDate){
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
    };

    /*$('.itemdiv').each(function(){
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
*/

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', blogCtrl ];