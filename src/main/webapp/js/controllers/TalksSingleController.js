
forumControllers.controller('TalksSingleController',function($rootScope,$stateParams){

        $rootScope.base.isFooterBottom = false;

        var talk = this,
            fullTalkMessagesLength,
            talkId = $stateParams.talkId;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        talk.attachId = "00";
        talk.selectedGroup = $rootScope.currentGroup;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        talk.topics = messageClient.getTopics(talk.selectedGroup.id, 0, 0, 0, 1000).topics;
        talk.fullTalkTopic = {};
        talk.fullTalkMessages = {};
        talk.fullTalkFirstMessages = [];
        talk.groups = userClientGroups;

        talk.isTalk = true;

        $rootScope.base.initStartParamsForCreateMessage(talk);

        var showFullTalk = function(talk,talkOutsideId){

            initFancyBox($('.talks-single'));
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            var talkId = talkOutsideId;
            for(var i = 0; i < topicLength; i++){
                if(talkId == talk.topics[i].id){
                    talk.fullTalkTopic = talk.topics[i];

                    $rootScope.base.initStartParamsForCreateTopic(talk.fullTalkTopic);

                    talk.fullTalkTopic.isTalk = true;
                    talk.fullTalkTopic.message.createdEdit = getTiming(talk.fullTalkTopic.message.created);
                    talk.fullTalkTopic.label = getLabel(talk.groups,talk.fullTalkTopic.groupType);
                    talk.fullTalkTopic.tagColor = getTagColor(talk.fullTalkTopic.label);

                    if(talk.fullTalkTopic.message.important == 1){
                        talk.fullTalkTopic.message.importantText = 'Снять метку "Важное"';
                    }else{
                        talk.fullTalkTopic.message.importantText = 'Пометить как "Важное"';
                    }
                }
            }

            if (talk.fullTalkTopic.poll != null) {
                setPollEditNames(talk.fullTalkTopic.poll);
                talk.fullTalkTopic.metaType = "poll";
            } else {
                talk.fullTalkTopic.metaType = "message";
            }

            talk.fullTalkFirstMessages = messageClient.getFirstLevelMessages(talkId, talk.selectedGroup.id, 1, $rootScope.base.lastLoadedId, 0, 10).messages;

            $rootScope.base.lastLoadedId = $rootScope.base.initFirstMessages(talk.fullTalkFirstMessages);

            $rootScope.base.isTalkTitles = false;
            $rootScope.base.mainContentTopIsHide = true;
            $rootScope.base.createTopicIsHide = true;

        };

        showFullTalk(talk,talkId);

        var initFlagsTopic = [];
        talk.showTopicAnswerInput = function(event,fullTalkTopic){
            event.preventDefault();

            talk.answerShow = true;

            if(!initFlagsTopic[fullTalkTopic.id]) {
                initFlagsTopic[fullTalkTopic.id] = true;
            }

            talk.fullTalkTopic.answerInputIsShow ?
                talk.fullTalkTopic.answerInputIsShow = false :
                talk.fullTalkTopic.answerInputIsShow = true ;
        };

        var initFlagsMessage = [];
        talk.showMessageAnswerInput = function(event,fullTalkTopic,firstMessage,message){
            event.preventDefault();
            var attachId;

            if(!message){
                // если это сообщение первого уровня
                firstMessage.isTalk = true;
                //firstMessage.isEdit = false;

                attachId = fullTalkTopic.id+'-'+firstMessage.id;

                if(!talk.fullTalkFirstMessages) talk.fullTalkFirstMessages = messageClient.getFirstLevelMessages(talkId,talk.selectedGroup.id,1,0,0,1000).messages;
                var fullTalkFirstMessagesLength = talk.fullTalkFirstMessages.length;

                $rootScope.base.initStartParamsForCreateMessage(firstMessage);

                firstMessage.answerInputIsShow ?
                    firstMessage.answerInputIsShow = false :
                    firstMessage.answerInputIsShow = true;


            }else{
                // если простое сообщение
                message.isTalk = true;
                //message.isEdit = false;

                attachId = fullTalkTopic.id+'-'+message.id;

                if(!talk.fullTalkMessages[firstMessage.id]) talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
                var  fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length;

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

        talk.toggleTreeFirstMessage = function(event,firstMessage){
            event.preventDefault();

            firstMessage.isTreeOpen ?
                firstMessage.isTreeOpen = false :
                firstMessage.isTreeOpen = true ;


            // --------

            talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            talk.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length:
                fullTalkMessagesLength = 0;
            if(talk.fullTalkMessages[firstMessage.id] === null) talk.fullTalkMessages[firstMessage.id] = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                talk.fullTalkMessages[firstMessage.id][i].commentText = TEXT_DEFAULT_2;

            }

        };

        talk.toggleTree = function(event,message,firstMessage){
            event.preventDefault();

            if(!talk.fullTalkMessages[firstMessage.id]) talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            var fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length;

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
                loopMessageOffset = talk.fullTalkMessages[firstMessage.id][i].offset;

                if(afterCurrentIndex && !nextMessageOnCurrentLevel
                    && message.offset < loopMessageOffset){

                    areAllMyParentsTreeOpen[loopMessageOffset] = true;

                    if(loopMessageOffset - message.offset == 1){
                        //если это непосредственный потомок

                        talk.fullTalkMessages[firstMessage.id][i].isOpen ?
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = false :
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = true ;

                        parentOpenStatusArray[loopMessageOffset] = true;
                        parentOpenStatus = talk.fullTalkMessages[firstMessage.id][i].isOpen;

                        if (!talk.fullTalkMessages[firstMessage.id][i].isTreeOpen){
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
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = true :
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = false ;

                        if (!talk.fullTalkMessages[firstMessage.id][i].isTreeOpen){
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
                if(message.id == talk.fullTalkMessages[firstMessage.id][i].id){
                    afterCurrentIndex = true;
                }
            }
        };

        var buff,
            lastLoadedIdFF;
        talk.addMoreItems = function(){
            var temp = messageClient.getFirstLevelMessages(talkId,talk.selectedGroup.id,1,$rootScope.base.lastLoadedId,0,10),
                buff = temp.messages;
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        $rootScope.base.initFirstMessages(buff);
                        talk.fullTalkFirstMessages = talk.fullTalkFirstMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;

                }
            }else{
                $rootScope.base.endOfLoaded = true;
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    })