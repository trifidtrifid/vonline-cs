
var wallSingleCtrl = function($rootScope, $stateParams,$c){
        var wallSingle = this;

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.isFooterBottom = false;
        $c.initFancyBox($('.lenta-item'));

        // временно, нужна функция getWallItem(topicId)
        $rootScope.currentGroup.id = $c.getDefaultGroup($rootScope.base.groups).id;
        var wallItems = $c.messageClient.getWallItems($rootScope.currentGroup.id,0,0,1000),
        wallItemsLength = wallItems.length;

    //console.log('0',wallItems,$stateParams.topicId);
        for(var i = 0; i < wallItemsLength; i++){
            if(wallItems[i].topic.id == $stateParams.topicId){
                wallSingle.wallItem = wallItems[i];
                wallSingle.wallItem.topic.isWallSingle = true;
            }
        }

    //console.log('11',wallSingle.wallItem,$rootScope.currentGroup.id);
        $rootScope.base.initStartParamsForCreateMessage(wallSingle.wallItem);
        $rootScope.base.initStartParamsForCreateTopic(wallSingle.wallItem.topic);

/*
        wallSingle.wallItem.commentText = TEXT_DEFAULT_2;
        wallSingle.wallItem.answerShow = false;
        wallSingle.wallItem.isFocus = false;
        wallSingle.wallItem.isCreateCommentError = false;
*/

        if(wallSingle.wallItem.topic.message.important == 1){
            wallSingle.wallItem.topic.message.importantText = 'Снять метку "Важное"';
        }else{
            wallSingle.wallItem.topic.message.importantText = 'Пометить как "Важное"';
        }

        //  lenta.wallItems[i].topic.message.groupId сейчас не задана почему-то
        wallSingle.wallItem.label = $c.getLabel($c.userClientGroups,wallSingle.wallItem.topic.groupType);

        wallSingle.wallItem.tagColor = $c.getTagColor(wallSingle.wallItem.label);

        if(wallSingle.wallItem.topic.message.type == 1){

            wallSingle.wallItem.topic.lastUpdateEdit = $c.getTiming(wallSingle.wallItem.topic.lastUpdate);

        }else if(wallSingle.wallItem.topic.message.type == 5){

            wallSingle.wallItem.topic.message.createdEdit = getTiming(wallSingle.wallItem.topic.message.created);
            wallSingle.wallItem.topic.authorName = $c.getAuthorName(wallSingle.wallItem.topic.userInfo);
            wallSingle.wallItem.topic.metaType = "message";

            var mesLen;
            wallSingle.wallItem.messages ?
                mesLen = wallSingle.wallItem.messages.length:
                mesLen = 0;

            for(var j = 0; j < mesLen; j++){
                wallSingle.wallItem.messages[j].createdEdit = getTiming(wallSingle.wallItem.messages[j].created);
                wallSingle.wallItem.messages[j].authorName = $c.getAuthorName(wallSingle.wallItem.messages[j].userInfo);
                wallSingle.wallItem.messages[j].isEdit = false;

                $rootScope.base.initStartParamsForCreateMessage(wallSingle.wallItem.messages[j]);
            }


            if(wallSingle.wallItem.topic.poll != null){
                //значит это опрос
                $c.setPollEditNames(wallSingle.wallItem.topic.poll);

                wallSingle.wallItem.topic.metaType = "poll";
            }
        }

        var initFlagsArray = [];
        wallSingle.showAnswerInput = function(event,wallItem,wallMessage){
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
                //initAttachImage($('#attachImage-' + wallItem.topic.id), $('#attach-area-' + wallItem.topic.id));
                //initAttachDoc($('#attachDoc-' + wallItem.topic.id), $('#attach-doc-area-' + wallItem.topic.id));
                initFlagsArray[wallItem.topic.id] = true;
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');
    };

module.exports = [ '$rootScope','$stateParams','$c', wallSingleCtrl ];