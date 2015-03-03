
var nearbySingleCtrl =  function($rootScope,$stateParams) {
    var nearby = this,
        businessId;

    if ($stateParams.nearbyId && $stateParams.nearbyId != 0){
        businessId = $stateParams.nearbyId;
    }

    nearby.info = businessClient.getBusinessDescription(businessId);
    nearby.wallItem = businessClient.getWallItem(nearby.info.id);

    $rootScope.base.isFooterBottom = true;
    $rootScope.base.pageTitle = "Рядом";

    nearby.isAuth = authClient.checkIfAuthorized();

    if(nearby.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    nearby.posts = messageClient.getBusinessTopics(0,1000);

    if(nearby.posts.topics) {
        var len = nearby.posts.topics.length;
        for (var i = 0; i < len; i++) {
            console.log(nearby.posts.topics[i].id,parseInt(businessId));
            if(nearby.posts.topics[i].id == parseInt(businessId)){
                nearby.posts.topics[i].isCommentShow = true;
                nearby.posts.topics[i].isInputShow = true;
                nearby.posts.topics[i].full = nearby.posts.topics[i].message.content.split(';')[1];

                nearby.post = nearby.posts.topics[i];
                nearby.post.fullLink = '/'+nearby.posts.topics[i].full;
                console.log(nearby.post);
            }
        }
    }

    nearby.toggleComm = function($event,post){
        $event.preventDefault();

        if (post.isCommentShow){
            post.isCommentShow = false;

        }else{
            post.isCommentShow = true;

            if(!post.comments) {
                post.comments = messageClient.getMessagesAsList(post.id, 8, 0, false, 1000).messages;
                console.log('finish');
            }
        }

    };

    nearby.toggleInput = function($event,post){
        $event.preventDefault();

        post.isInputShow ? post.isInputShow = false : post.isInputShow = true;

        console.log('input',post.isInputShow);

    };

    nearby.sendComm = function($event,post){
        $event.preventDefault();
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        message.id = 0;
        message.topicId = nearby.info.id; //post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.WALL;//8;
        message.groupId = 0;
        message.content = post.commenting;
        message.topicId = nearby.wallItem.topic.id;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;
        post.commenting = "";

        if(!nearby.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        console.log('post',message);
        //var returnComment = messageClient.postBusinessTopics(message);
        var returnComment = messageClient.postMessage(message);
        console.log('post2',returnComment);


        if(nearby.wallItem.messages && nearby.wallItem.messages.length) {
            nearby.wallItem.messages.push(returnComment);
        }else{
            nearby.wallItem.messages = [];
            nearby.wallItem.messages[0] = returnComment;
        }

    };

    nearby.getTiming = function(messageObjDate){
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


    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope','$stateParams', nearbySingleCtrl ];