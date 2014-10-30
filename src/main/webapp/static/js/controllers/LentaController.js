
forumControllers.controller('LentaController',function($rootScope) {

        $rootScope.setTab(1);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        var lenta = this,
            lastLoadedId = 0,
            loadedLength = 10;

        $rootScope.COMMENTS_DEFAULT_COUNT = 4;
        lenta.selectedGroupInTop = $rootScope.currentGroup;

        /*if(!$rootScope.importantIsLoadedFromTop)
        $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        lenta.attachId = "0";
        $rootScope.base.initStartParamsForCreateTopic(lenta);

        lenta.message = {};

        lenta.message.content = lenta.message.default = TEXT_DEFAULT_1;

        lenta.wallItems = messageClient.getWallItems($rootScope.base.bufferSelectedGroup.id,0,loadedLength);

        var wallItemsLength;
        lenta.wallItems ? wallItemsLength = lenta.wallItems.length :
            wallItemsLength = 0;

        if(wallItemsLength != 0) lastLoadedId = lenta.wallItems[wallItemsLength-1].topic.id;

        initWallItem(lenta.wallItems);

        $rootScope.selectGroupInDropdown_lenta = function(groupId){
            lenta.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        lenta.goToAnswerInput = function(event){
            event.preventDefault();
        };

        var initFlagsArray = [];
        lenta.showAnswerInput = function(event,wallItem,wallMessage){
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

            lenta.wallItems = messageClient.getWallItems(groupId, 0, loadedLength);

            if(lenta.wallItems.length) {
                initWallItem(lenta.wallItems);

                lastLoadedId = lenta.wallItems[lenta.wallItems.length-1].topic.id;
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

        lenta.toggleComments = function(event,wallItem){
            event.preventDefault();

            var mesLen = wallItem.messages.length;

            if(wallItem.isOpen){
                wallItem.isOpen = false;

                (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                    wallItem.bufferMessages = wallItem.messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                    wallItem.bufferMessages = wallItem.messages;

                //wallItem.bufferMessages = wallItem.messages.slice(mesLen-lenta.COMMENTS_DEFAULT_COUNT);
            }else{
                wallItem.isOpen = true;
                wallItem.bufferMessages = wallItem.messages;
            }
        };

        var lastLoadedIdFF;
        lenta.addMoreItems = function(){
            //lastLoadedIdFF = lastLoadedId;
            if(wallItemsLength == 10) {
                var buff = messageClient.getWallItems($rootScope.base.bufferSelectedGroup.id, lastLoadedId, loadedLength);
                if (buff) {

                    var buffLength = buff.length;

                    if (buffLength != 0) {

                        lastLoadedId = buff[buffLength - 1].topic.id;

                        if(lastLoadedIdFF != lastLoadedId) {
                            initWallItem(buff);
                            lenta.wallItems = lenta.wallItems.concat(buff);
                        }

                        lastLoadedIdFF = lastLoadedId;

                    }
                }
            }
        };

        initFancyBox($('.forum'));

        $('.ng-cloak').removeClass('ng-cloak');

    })