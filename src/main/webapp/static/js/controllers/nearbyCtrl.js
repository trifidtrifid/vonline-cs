
/*
forumControllers.controller('nearbyCtrl', function($rootScope) {
    var nearby = this;

    nearby.attachId = "000000";
    $rootScope.setTab(5);
    $rootScope.base.showAllGroups();
    $rootScope.base.isFooterBottom = false;
    showGroupOverBuilding($rootScope.groups);

    initFancyBox($('.nearby'));

    $rootScope.base.createTopicIsHide = true;
    nearby.isNearbyLoaded = false;
    nearby.groups = userClientGroups;

    nearby.isTalk = true;
    nearby.isAdvert = true;

    nearby.message = {};
    nearby.message.content = nearby.message.default = TEXT_DEFAULT_3;
    nearby.subject = TEXT_DEFAULT_4;

    $rootScope.base.bufferSelectedGroup = nearby.selectedGroup =
        $rootScope.currentGroup = userClientGroups[3];

    $rootScope.base.initStartParamsForCreateTopic(nearby);

    nearby.answerFirstMessage = TEXT_DEFAULT_2;

    nearby.topics = messageClient.getAdverts(nearby.selectedGroup.id, 0, 1000).topics;

    console.log(nearby.topics);

    initNearby();

    if (!nearby.topics) nearby.topics = [];

    $rootScope.selectGroupInDropdown_nearby = function(groupId){
        nearby.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
    };

    function initNearby(){
        var topicLength;
        nearby.topics ? topicLength = nearby.topics.length : topicLength = 0;

        for(var i = 0; i < topicLength;i++){
            nearby.topics[i].lastUpdateEdit = getTiming(nearby.topics[i].lastUpdate);
            nearby.topics[i].label = getLabel(nearby.groups,nearby.topics[i].groupType);
            nearby.topics[i].tagColor = getTagColor(nearby.topics[i].label);
        }
    }

    $rootScope.nearbyChangeGroup = function(groupId){

        nearby.topics = messageClient.getAdverts(groupId,0,1000).topics;

        if(nearby.topics) {
            initNearby();
        }

    };

    $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));

    $('.ng-cloak').removeClass('ng-cloak');


});*/

forumControllers.controller('nearbyCtrl', function($rootScope) {
    var nearby = this;

    $rootScope.base.isFooterBottom = true;

    nearby.isAuth = authClient.checkIfAuthorized();

    if(nearby.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    nearby.posts = messageClient.getBusinessTopics(0,1000);

    console.log(nearby.posts);

    if(nearby.posts.topics) {
        var len = nearby.posts.topics.length;
        for (var i = 0; i < len; i++) {
            nearby.posts.topics[i].isCommentShow = false;
            nearby.posts.topics[i].isInputShow = false;
            nearby.posts.topics[i].short = nearby.posts.topics[i].message.content.split(';')[0];
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
        message.topicId = post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BUSINESS_PAGE;//8;
        message.groupId = 0;
        message.content = post.commenting;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;

        if(!nearby.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        var returnComment = messageClient.postBusinessTopics(message);
        if(post.comments && post.comments.length) {
            post.comments.push(returnComment);
        }else{
            post.comments = [];
            post.comments[0] = returnComment;
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

    angular.element($('.nearby')).css({'min-height': $(window).height()-175});

    $('.ng-cloak').removeClass('ng-cloak');

});