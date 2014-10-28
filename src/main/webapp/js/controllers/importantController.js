
forumControllers.controller('importantController',function($rootScope) {

        $rootScope.setTab(4);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        var important = this,
            lastLoadedId = 0,
            loadedLength = 10;

        $rootScope.COMMENTS_DEFAULT_COUNT = 4;
        important.selectedGroupInTop = $rootScope.currentGroup;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        //important.topics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        important.wallItems = messageClient.getImportantNews($rootScope.currentGroup.id,0,0,0);

        important.attachId = "0";
        //$rootScope.base.initStartParamsForCreateTopic(important);

        important.message = {};

        important.message.content = important.message.default = TEXT_DEFAULT_1;

        $rootScope.importantChangeGroup = function(groupId){

            important.wallItems = messageClient.getImportantNews(groupId, 0, loadedLength);

            if(important.wallItems.length) {
                initWallItem(important.wallItems);

                //lastLoadedId = lenta.wallItems[important.wallItems.length-1].topic.id;
            }

        };

        var wallItemsLength;
        important.wallItems ? wallItemsLength = important.wallItems.length :
            wallItemsLength = 0;

        if(wallItemsLength == 0) $rootScope.base.mainContentTopIsHide = true;

        if(wallItemsLength != 0) lastLoadedId = important.wallItems[wallItemsLength-1].topic.id;

        initWallItem(important.wallItems);

        $rootScope.selectGroupInDropdown_important = function(groupId){
            important.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        important.goToAnswerInput = function(event){
            event.preventDefault();
        };

        var initFlagsArray = [];
        important.showAnswerInput = function(event,wallItem,wallMessage){
            event.preventDefault();

            /*wallItem.answerShow ?
             wallItem.answerShow = false :*/
            wallItem.answerShow = true ;
            wallItem.isFocus = true ;

            if(wallMessage){
                var authorName;
                wallMessage.userInfo ?
                    authorName = wallMessage.userInfo.firstName :
                    authorName = wallMessage.authorName.split(' ')[0];
                wallItem.commentText = authorName+", ";
            }else{
                wallItem.commentText = "";
            }

            if(!initFlagsArray[wallItem.topic.id]) {
                // инифицализацмю AttachImage нужно делать только один раз для каждого сообщения
                initFlagsArray[wallItem.topic.id] = true;
            }

        };

        $rootScope.wallChangeGroup = function(groupId){

            important.wallItems = messageClient.getWallItems(groupId, 0, loadedLength);

            if(important.wallItems.length) {
                initWallItem(important.wallItems);

                lastLoadedId = important.wallItems[important.wallItems.length-1].topic.id;
            }

        };

        function initWallItem(wallItems){
            wallItemsLength = wallItems.length;
            for(var i = 0; i < wallItemsLength; i++){

                $rootScope.base.initStartParamsForCreateMessage(wallItems[i]);

                $rootScope.base.initStartParamsForCreateTopic(wallItems[i].topic);

                //  wallItems[i].topic.message.groupId сейчас не задана почему-то
                wallItems[i].label = getLabel($rootScope.base.groups,wallItems[i].topic.groupType);

                wallItems[i].tagColor = getTagColor(wallItems[i].label);

                wallItems[i].isOpen = false;

                if(wallItems[i].topic.message.important == 1){
                    wallItems[i].topic.message.importantText = 'Снять метку "Важное"';
                }else{
                    wallItems[i].topic.message.importantText = 'Пометить как "Важное"';
                }

                if(wallItems[i].topic.message.type == 1){

                    wallItems[i].topic.lastUpdateEdit = getTiming(wallItems[i].topic.lastUpdate);

                }else if(wallItems[i].topic.message.type == 5){

                    wallItems[i].topic.message.createdEdit = getTiming(wallItems[i].topic.message.created);
                    wallItems[i].topic.authorName = getAuthorName(wallItems[i].topic.userInfo);
                    wallItems[i].topic.metaType = "message";

                    var mesLen;
                    wallItems[i].messages ?
                        mesLen = wallItems[i].messages.length:
                        mesLen = 0;

                    for(var j = 0; j < mesLen; j++){
                        wallItems[i].messages[j].createdEdit = getTiming(wallItems[i].messages[j].created);
                        wallItems[i].messages[j].authorName = getAuthorName(wallItems[i].messages[j].userInfo);
                        wallItems[i].messages[j].isEdit = false;

                        $rootScope.base.initStartParamsForCreateMessage(wallItems[i].messages[j]);
                    }

                    (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                        wallItems[i].bufferMessages = wallItems[i].messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                        wallItems[i].bufferMessages = wallItems[i].messages;



                    if(wallItems[i].topic.poll != null){
                        //значит это опрос
                        setPollEditNames(wallItems[i].topic.poll);

                        wallItems[i].topic.metaType = "poll";
                    }
                }
            }
        }

        important.toggleComments = function(event,wallItem){
            event.preventDefault();

            var mesLen = wallItem.messages.length;

            if(wallItem.isOpen){
                wallItem.isOpen = false;

                (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                    wallItem.bufferMessages = wallItem.messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                    wallItem.bufferMessages = wallItem.messages;

                //wallItem.bufferMessages = wallItem.messages.slice(mesLen-important.COMMENTS_DEFAULT_COUNT);
            }else{
                wallItem.isOpen = true;
                wallItem.bufferMessages = wallItem.messages;
            }
        };

        initFancyBox($('.forum'));

        $('.ng-cloak').removeClass('ng-cloak');

    });