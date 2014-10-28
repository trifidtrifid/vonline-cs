
forumControllers.controller('AdvertsSingleController',function($rootScope,$stateParams) {
        var advert = this,
            fullTalkMessagesLength,
            advertId = $stateParams.advertId;

        $rootScope.base.isFooterBottom = false;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        advert.attachId = "00000";
        advert.selectedGroup = $rootScope.currentGroup;
        advert.topics = messageClient.getAdverts(advert.selectedGroup.id, 0, 1000).topics;
        advert.fullTalkTopic = {};
        advert.fullTalkMessages = {};
        advert.fullTalkFirstMessages = [];
        advert.groups = userClientGroups;

        advert.isTalk = true;

        $rootScope.base.initStartParamsForCreateMessage(advert);

        var showFullTalk = function(advert,advertOutsideId){

            initFancyBox($('.adverts-single'));
            var topicLength;
            advert.topics ? topicLength = advert.topics.length : topicLength = 0;

            var advertId = advertOutsideId,
                fullTalkFirstMessagesLength;
            for(var i = 0; i < topicLength; i++){
                if(advertId == advert.topics[i].id){
                    advert.fullTalkTopic = advert.topics[i];

                    $rootScope.base.initStartParamsForCreateTopic(advert.fullTalkTopic);

                    advert.fullTalkTopic.isTalk = true;
                    advert.fullTalkTopic.isAdvert = true;
                    advert.fullTalkTopic.message.createdEdit = getTiming(advert.fullTalkTopic.message.created);
                    advert.fullTalkTopic.label = getLabel(advert.groups,advert.fullTalkTopic.groupType);
                    advert.fullTalkTopic.tagColor = getTagColor(advert.fullTalkTopic.label);

                }
            }
            if(advert.fullTalkTopic.poll != null){
                setPollEditNames(advert.fullTalkTopic.poll);
                advert.fullTalkTopic.metaType = "poll";
            }else{
                advert.fullTalkTopic.metaType = "message";
            }

            advert.fullTalkFirstMessages = messageClient.getFirstLevelMessages(advertId,advert.selectedGroup.id,6,$rootScope.base.lastLoadedId,0,10).messages;

            $rootScope.base.lastLoadedId = $rootScope.base.initFirstMessages(advert.fullTalkFirstMessages);

            $rootScope.base.isAdvertTitles = false;
            $rootScope.base.mainContentTopIsHide = true;
            $rootScope.base.createTopicIsHide = true;

            $rootScope.base.advert = advert;

        };

        showFullTalk(advert,advertId);

        var initFlagsTopic = [];
        advert.showTopicAnswerInput = function(event,fullTalkTopic){
            event.preventDefault();

            advert.answerShow = true;

            if(!initFlagsTopic[fullTalkTopic.id]) {
               // initAttachImage($('#attachImage-' + fullTalkTopic.id), $('#attach-area-' + fullTalkTopic.id));
                //initAttachDoc($('#attachDoc-' + fullTalkTopic.id), $('#attach-doc-area-' + fullTalkTopic.id));
                initFlagsTopic[fullTalkTopic.id] = true;
            }

            advert.fullTalkTopic.answerInputIsShow ?
                advert.fullTalkTopic.answerInputIsShow = false :
                advert.fullTalkTopic.answerInputIsShow = true ;
        };

        var initFlagsMessage = [];
        advert.showMessageAnswerInput = function(event,fullTalkTopic,firstMessage,message){
            event.preventDefault();
            var attachId;

            if(!message){
                // если это сообщение первого уровня
                attachId = fullTalkTopic.id+'-'+firstMessage.id;

                firstMessage.isTalk = true;

                if(!advert.fulladvertFirstMessages) advert.fulladvertFirstMessages = messageClient.getFirstLevelMessages(advertId,advert.selectedGroup.id,6,0,0,1000).messages;
                var fulladvertFirstMessagesLength = advert.fulladvertFirstMessages.length;

                $rootScope.base.initStartParamsForCreateMessage(firstMessage);

                firstMessage.answerInputIsShow ?
                    firstMessage.answerInputIsShow = false :
                    firstMessage.answerInputIsShow = true;


            }else{
                // если простое сообщение
                attachId = fullTalkTopic.id+'-'+message.id;

                message.isTalk = true;

                if(!advert.fullTalkMessages[firstMessage.id]) advert.fullTalkMessages[firstMessage.id] = messageClient.getMessages(advertId,advert.selectedGroup.id,6,firstMessage.id,0,1000).messages;
                var  fullTalkMessagesLength = advert.fullTalkMessages[firstMessage.id].length;

                $rootScope.base.initStartParamsForCreateMessage(message);

                message.answerInputIsShow ?
                    message.answerInputIsShow = false :
                    message.answerInputIsShow = true;


            }

            if(!initFlagsMessage[attachId]) {
                //initAttachImage($('#attachImage-' + attachId), $('#attach-area-' + attachId));
                //initAttachDoc($('#attachDoc-' + attachId), $('#attach-doc-area-' + attachId));

                initFlagsMessage[attachId] = true;
            }
        };

        advert.toggleTreeFirstMessage = function(event,firstMessage){
            event.preventDefault();

            firstMessage.isTreeOpen ?
                firstMessage.isTreeOpen = false :
                firstMessage.isTreeOpen = true ;


            // --------

            advert.fullTalkMessages[firstMessage.id] = messageClient.getMessages(advertId,advert.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            advert.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = advert.fullTalkMessages[firstMessage.id].length:
                fullTalkMessagesLength = 0;
            if(advert.fullTalkMessages[firstMessage.id] === null) advert.fullTalkMessages[firstMessage.id] = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                advert.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                advert.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                advert.fullTalkMessages[firstMessage.id][i].isOpen = true;
                advert.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                advert.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(advert.fullTalkMessages[firstMessage.id][i].created);
                advert.fullTalkMessages[firstMessage.id][i].answerMessage = TEXT_DEFAULT_2;

            }

        };

        advert.toggleTree = function(event,message,firstMessage){
            event.preventDefault();

            if(!advert.fullTalkMessages[firstMessage.id]) advert.fullTalkMessages[firstMessage.id] = messageClient.getMessages(advertId,advert.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            var fullTalkMessagesLength = advert.fullTalkMessages[firstMessage.id].length;

            message.isTreeOpen ?
                message.isTreeOpen = false :
                message.isTreeOpen = true ;

            var afterCurrentIndex = false,
                nextMessageOnCurrentLevel = false,
                loopMessageOffset,
                parentOpenStatus,
                areAllMyParentsTreeOpen = [],
                checkAreAllMyParentsTreeOpen = true,
                beginOffset = message.offset,
                parentOpenStatusArray = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                loopMessageOffset = advert.fullTalkMessages[firstMessage.id][i].offset;

                if(afterCurrentIndex && !nextMessageOnCurrentLevel
                    && message.offset < loopMessageOffset){

                    areAllMyParentsTreeOpen[loopMessageOffset] = true;

                    if(loopMessageOffset - message.offset == 1){
                        //если это непосредственный потомок

                        advert.fullTalkMessages[firstMessage.id][i].isOpen ?
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = false :
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = true ;

                        parentOpenStatusArray[loopMessageOffset] = true;
                        parentOpenStatus = advert.fullTalkMessages[firstMessage.id][i].isOpen;

                        if (!advert.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }
                    }else{
                        // если это птомки потомка

                        checkAreAllMyParentsTreeOpen = true;
                        for(var j = beginOffset; j < loopMessageOffset; j++){
                            // проверяем нет ли у кого в предках isTreeOpen = false
                            if(areAllMyParentsTreeOpen[j] == false){
                                checkAreAllMyParentsTreeOpen = false;
                            }
                        }
                        parentOpenStatus && checkAreAllMyParentsTreeOpen ?
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = true :
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = false ;

                        if (!advert.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            // если у кого-то из предков не открыто дерево
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }

                        parentOpenStatusArray[loopMessageOffset] = true;
                    }
                }

                if (afterCurrentIndex && loopMessageOffset == message.offset){
                    nextMessageOnCurrentLevel = true;
                    break;
                }
                if(message.id == advert.fullTalkMessages[firstMessage.id][i].id){
                    afterCurrentIndex = true;
                }
            }
        };

        var buff,lastLoadedIdFF;
        advert.addMoreItems = function(){
            var temp = messageClient.getFirstLevelMessages(advertId,advert.selectedGroup.id,1,$rootScope.base.lastLoadedId,0,10),
                buff = temp.messages;
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        $rootScope.base.initFirstMessages(buff);
                        advert.fullTalkFirstMessages = advert.fullTalkFirstMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;

                }
            }else{
                $rootScope.base.endOfLoaded = true;
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');
    })