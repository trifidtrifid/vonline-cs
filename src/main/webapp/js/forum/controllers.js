'use strict';

/* Controllers */
angular.module('forum.controllers', ['ui.select2','infinite-scroll','ngSanitize'])
    .controller('baseController',function($rootScope,$state,$filter) {

        $rootScope.isTopSearchShow = true;
        var base = this;
        base.neighboursLoadStatus = "";
        base.privateMessagesLoadStatus = "";
        base.profileLoadStatus = "";
        base.settingsLoadStatus = "";
        base.mapsLoadStatus = "";

        base.mainContentTopIsHide = false;
        base.createTopicIsHide = true;
        base.me = shortUserInfo;

        base.isFooterBottom = false;

        base.isTalkTitles = true;

        resetPages(base);
        base.lentaIsActive = true;
        base.emptyMessage = "Сообщений пока нет";

        base.textareaBlur = function(message,defaultText,ctrl,isTopic){
            if(isTopic){
                if(message == "") ctrl.message.content = defaultText;
            }else{
                if(message == "") ctrl.commentText = defaultText;
            }
        };

        base.textareaFocus = function(message, defaultText,ctrl,isTopic){
            if(isTopic){
                if(message == defaultText) ctrl.message.content = "";
            }else{
                if(message == defaultText) ctrl.commentText = "";
            }

        };

        base.addPollInput = function(event,obj,isFocus){
            event.preventDefault();

            var newInput = {counter : 0, name:"" };
            obj.pollInputs.push(newInput);

            if(isFocus){
                setTimeout(setNewFocus,200,$(event.target));
            }

        };

        function setNewFocus(el){
            el.prev().find('input').focus();
        }

        base.showPoll = function(event,obj){
            event.preventDefault();

            obj.isPollShow = true;
            obj.pollSubject = "";
            obj.poll = null;

            obj.pollInputs = [
                {
                    counter : 0,
                    name:""
                },
                {
                    counter : 1,
                    name:""
                }
            ];
            obj.isPollAvailable = false;
        };

        base.doPoll = function(event,poll){
            event.preventDefault();
            poll.values = [];
            var pollNamesLength = poll.editNames.length;
            var item;

            for(var i = 0; i < pollNamesLength; i++){
                if(poll.editNames[i].value == 1) {
                    item = i;
                    break;
                }
            }

            var tempPoll = messageClient.doPoll(poll.pollId,item);
            poll.alreadyPoll = true;
            poll.values = tempPoll.values;

            setPollEditNames(poll);

        };

        base.oldTextLength = 0;
        base.messageChange = function(event){

            var el = event.target,
                clientHeight = el.clientHeight,
                scrollHeight = el.scrollHeight,
                textLength = el.textLength,
                clientWidth = el.clientWidth,
                textLengthPX, newHeight,removeRowCount,
                defaultHeight, newRowCount;

            defaultHeight = TEXTAREA_DEFAULT_HEIGHT;

            /*
            Исходные данные:
                На один символ приходится ~8px в ширину
                Высота строки текста ~14px

            * Здесь выполняем такие действия :
             * 1) Считаем длину текста в пикселях
             * 2) Определяем целое количестов строк, которые удалили
             * 3) Определям новую высоту с учетом высоты удаленного текста
            * */

            //console.log("0 "+scrollHeight+" "+clientHeight);
             if(scrollHeight > clientHeight){

                el.style.height = scrollHeight+'px';
            }else if(scrollHeight > defaultHeight){
                textLengthPX = (parseInt(base.oldTextLength) - textLength) * 8; // 1
                 //console.log("2 "+textLengthPX+" "+clientWidth+" "+textLength);
                if (textLengthPX > clientWidth){
                   // console.log("3 "+textLengthPX+" "+clientWidth);
                    removeRowCount = Math.floor(textLengthPX/clientWidth); // 2
                    newHeight = parseInt(event.target.style.height) - removeRowCount*14; // 3
                    newHeight > defaultHeight ? event.target.style.height = newHeight+"px":
                                    event.target.style.height = defaultHeight+'px';

                }else{
                    el.style.height = scrollHeight-6+'px';

                    //console.log("5 "+textLength+" "+textLength*8/clientWidth);
                }
            }else{
                 //console.log('4');
                 el.style.height = defaultHeight+'px';
            }
            base.oldTextLength = textLength;
        };

        base.getTextareaHeight = function(textLength,clientWidth,isTopic){
            /*if(isTopic){
                var k1 = 10,
                    k2 = 19;
            }else{*/
               var  k1 = 12,
                k2 = 14;
            //}

            var stringLen = textLength*k1;
            if(stringLen > clientWidth){
                var rowCount = parseInt(stringLen/clientWidth); // сколько строк
                var areaHeight = rowCount*k2;
            }else{
                areaHeight = TEXTAREA_DEFAULT_HEIGHT;
            }

            return areaHeight;
         };

        base.initFirstMessages = function(firstMessages){
            var fullTalkFirstMessagesLength,
                lastLoadedId;

            firstMessages ?
                fullTalkFirstMessagesLength = firstMessages.length:
                fullTalkFirstMessagesLength = 0;

            if(fullTalkFirstMessagesLength != 0) lastLoadedId = firstMessages[fullTalkFirstMessagesLength-1].id;

            if(firstMessages === null) firstMessages = [];

            for(var i = 0; i < fullTalkFirstMessagesLength; i++){
                firstMessages[i].answerInputIsShow = false;
                firstMessages[i].isTreeOpen = false;
                firstMessages[i].isLoaded = false;
                firstMessages[i].answerMessage = TEXT_DEFAULT_2;
                firstMessages[i].createdEdit = getTiming(firstMessages[i].created);

            }

            return lastLoadedId;
        };

        base.deleteMessage = function(message,messagesArray,isTopic,isWall,isDialog){

            if(isTopic && !isWall || message.isWallSingle){
                // если talk-single или profit-single

                bootbox.confirm("Вы уверены, что хотите удалить эту тему?", function(result) {
                    if(result) {

                        try {
                            var deleteResult = messageClient.deleteTopic(message.id);
                            message.message.content = deleteResult.message.content;
                        }catch(e){
                            // вернул null, значит потомков нет
                        }

                        if(message.message.type == 1){
                            $state.go('talks');
                        }else if(message.message.type == 6){
                            $state.go('profit');
                        }else if(message.message.type == 5){
                            $state.go('main');
                        }

                    }
                });
            }else if(isTopic){
                try {
                    var deleteResult = messageClient.deleteTopic(message.id);
                    message.message.content = deleteResult.message.content;
                }catch(e){
                    // вернул null, значит удаление произошло чисто
                    var messagesArrayLength = messagesArray.length;

                     for(var i = 0; i < messagesArrayLength; i++){

                         var currentId;
                         isWall ? currentId = messagesArray[i].topic.id :
                             currentId = messagesArray[i].id ;

                         if(currentId == message.id){
                            messagesArray.splice(i,1);
                             break;
                         }
                     }
                }
            }else{
                if(isDialog){
                    dialogClient.deleteDialogMessage(message.id);

                    messagesArrayLength = messagesArray.length;
                    for (var i = 0; i < messagesArrayLength; i++) {
                        if (messagesArray[i].id == message.id) {
                            messagesArray.splice(i, 1);
                            break;
                        }
                    }

                }else {
                    try {
                        deleteResult = messageClient.deleteMessage(message.id);
                        //message.content = "Сообщение удалено пользователем";
                        message.content = deleteResult.content;
                    }
                    catch (e) {
                        // удалено чисто
                        messagesArrayLength = messagesArray.length;
                        for (var i = 0; i < messagesArrayLength; i++) {
                            if (messagesArray[i].id == message.id) {
                                messagesArray.splice(i, 1);
                                break;
                            }
                        }
                    }
                }

            }
        };

        base.setEdit = function(event,message,isNeedAnswerShow){
            var isTopic;
            (message.message) ? isTopic = true : isTopic = false;

            if(message.isEdit){
                message.isEdit = false;

                if(isTopic){
                    message.message.content = $filter('linky')(message.message.content, 'blank');
                    message.message.content = withTags(message.message.content);
                }else{
                    message.content = $filter('linky')(message.commentText, 'blank');
                    message.content = withTags(message.content);
                }

            }else{

                if(isTopic){
                    message.message.content = withoutTags(message.message.content);
                }else{
                    message.commentText = withoutTags(message.content);
                }

                var el = event.target;

                var h0 = $(el).closest('.text-container').find('.text:eq(0)').height(),
                    h1 = $(el).closest('.text-container').find('.text:eq(1)').height(),
                    h;

                (h0 > h1) ? h = h0+24 : h = h1;

                message.isEdit = true;

                if(message.answerInputIsShow) message.answerInputIsShow = false;

                if(isTopic){
                    var textLen = message.message.content.length;
                }else{
                    textLen = message.content.length;
                }

                /*if(textLen > base.contentLength){
                    h = (textLen/base.contentLength).toFixed(0)*(h-24);
                }*/

                if(h < TEXTAREA_DEFAULT_HEIGHT) h = TEXTAREA_DEFAULT_HEIGHT;

                $(el).closest('.text-container').find('.edit-message textarea').height(h+'px');
            }

            if(isNeedAnswerShow){
                message.answerShow = true;
                message.commentText = message.content;
                message.isTalk = true;
            }

            if(message.isEdit) {
                // здесь рассматривается ситуация когда мы возвращаемся из редактирования,
                // но выше мы уже переключиди флаг, поэтому пишу message.isEdit, а не !message.isEdit
                if (isTopic) {
                    message.message.content = withoutTags(message.message.content);
                } else {
                    message.commentText = withoutTags(message.content);
                }
            }

        };

        base.pageTitle = "Новости";

        base.user = shortUserInfo;

        base.bufferSelectedGroup = userClientGroups[1];

        base.markImportant = function(event,message){
            event.preventDefault();
            var isImportant;

            if (message.important == 3 || message.important == 2){
                message.important = 1;
                isImportant = true;
                message.importantText = 'Снять метку "Важное"';
            }else{
                message.important = 3;
                isImportant = false;
                message.importantText = 'Пометить как "Важное"';
            }

            messageClient.markMessageImportant(message.id,isImportant);
        };

        base.markLike = function(event,message){
            event.preventDefault();
            var isLike;

            if(message.like == 1){

                $('#like-help-'+message.id).fadeIn(200);

                setTimeout(hideLikeHelp,2000,message.id);

            }

            message.like = 1;
            messageClient.markMessageLike(message.id);
        };

        base.initStartParamsForCreateTopic = function(ctrl){
            ctrl.selectedGroup = $rootScope.base.bufferSelectedGroup = $rootScope.currentGroup;

            ctrl.isEdit = false;
            ctrl.isCreateMessageError = false;
            ctrl.isPollAvailable = true;

            if(ctrl.id){
                // если редактирование
                if(ctrl.poll && ctrl.poll.pollId){
                    ctrl.isPollShow = true;

                    ctrl.pollSubject = ctrl.poll.subject;
                    var namesLength = ctrl.poll.names.length;
                    ctrl.pollInputs = [];
                    for(var i = 0; i < namesLength; i++){
                        ctrl.pollInputs[i] = {};
                        ctrl.pollInputs[i].counter = i;
                        ctrl.pollInputs[i].name = ctrl.poll.names[i];
                    }
                    ctrl.isPollAvailable = false;
                }
            }else{
                // если создание

                ctrl.isPollShow = false;
                ctrl.pollSubject = "";
                ctrl.pollInputs = [
                    {
                        counter : 0,
                        name:""
                    },
                    {
                        counter : 1,
                        name:""
                    }
                ];
                ctrl.attachedImages = [];
            }

        }

        var hideLikeHelp = function(messageId){
            $('#like-help-'+messageId).fadeOut(200);
        };

        base.showAllGroups = function(){
            var groupsLength = $rootScope.groups.length;
            for(var i = 0; i < groupsLength; i++){
                $rootScope.groups[i].isShow = true;
                $rootScope.groups[i].selected = false;
            }
            $rootScope.groups[0].selected = true;
            $rootScope.base.bufferSelectedGroup = $rootScope.groups[0];
        };

        base.groups = userClientGroups;

        base.goToDialog = function(userId){
            var users = [];
            users[0] = userId;
            var dialog = dialogClient.getDialog(users,0);

            $state.go('dialog-single',{ 'dialogId' : dialog.id});
        };

        base.selectGroupInDropdown = function(groupId,ctrl){
            $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);

            //if(!ctrl.isEdit){
                ctrl.selectedGroup = $rootScope.base.bufferSelectedGroup;
            //}
        };

        base.removeAttach = function(message,index,isImage){
            isImage ?
            message.images.splice(index,1) :
            message.documents.splice(index,1);
        };

        $rootScope.initCreateTopic = function(ctrl){

            if(ctrl.id){
                // значит редактирование

                setTimeout(pollAttach,200,ctrl.id,true); // ждем пока загрузится

            }else{
                // значит создание

                setTimeout(pollAttach,200,ctrl.attachId,false);

            }

        };

        $rootScope.initCreateMessage = function(ctrlId,isEdit){

            if(isEdit){

                setTimeout(pollAttach,200,ctrlId,true);

            }else{

                setTimeout(pollAttach,200,ctrlId,false);

            }

        };

        function pollAttach(ctrlId,isEdit){

            if(isEdit) {
                if ($('#attachImage-edit-' + ctrlId).length) {
                    initAttachImage($('#attachImage-edit-' + ctrlId), $('#attach-area-edit-' + ctrlId)); // для ленты новостей
                    initAttachDoc($('#attachDoc-edit-' + ctrlId), $('#attach-doc-area-edit-' + ctrlId), isEdit);
                } else {
                    setTimeout(pollAttach, 200, ctrlId,true);
                }
            }else{
                if ($('#attachImage-' + ctrlId).length) {
                    initAttachImage($('#attachImage-'+ctrlId), $('#attach-area-' + ctrlId)); // для ленты новостей
                    initAttachDoc($('#attachDoc-'+ctrlId), $('#attach-doc-area-' + ctrlId));
                } else {
                    setTimeout(pollAttach, 200, ctrlId,false);
                }
            }
        }

        function addSingleTalk(talk){
            if (talk.isEdit) {
                talk.attachedImages = getAttachedImages($('#attach-area-edit-' + talk.id));
                talk.attachedDocs = getAttachedDocs($('#attach-doc-area-edit-' + talk.id),talk.isEdit);
            } else {
                talk.attachedImages = getAttachedImages($('#attach-area-'+talk.attachId));
                talk.attachedDocs = getAttachedDocs($('#attach-doc-area-'+talk.attachId));
            }

            if(talk.subject == TEXT_DEFAULT_4 || talk.subject == ""){

                talk.isCreateTalkError = true;
                talk.createTalkErrorText = "Вы не указали заголовок";

            }else if(talk.attachedImages.length == 0 && (talk.attachedDocs === undefined || talk.attachedDocs.length == 0) && !talk.isPollShow
                && (talk.message.content == TEXT_DEFAULT_3 || !talk.message.content)){

                talk.isCreateTalkError = true;
                talk.createTalkErrorText = "Вы не ввели сообщение";

            }else if(talk.isPollShow && (!talk.pollSubject || talk.pollInputs[0].name == "" || talk.pollInputs[1].name == "")){

                talk.isCreateTalkError = true;
                talk.createTalkErrorText = "Вы не указали данные для опроса";

            }else {

                if (talk.message.content == TEXT_DEFAULT_3 && (talk.attachedImages || talk.attachedDocs || talk.isPollShow)) {
                    talk.message.content = "";
                }
                talk.isCreateTalkError = false;

                var isWall = 0, isAdvert = false;
                if(talk.isAdvert) isAdvert = true;

                var newTopic = postTopic(talk, isWall,isAdvert,$filter);

                if(newTopic.poll && talk.poll) talk.poll.pollId = newTopic.poll.pollId;

                newTopic.label = getLabel(base.groups,newTopic.groupType);
                newTopic.tagColor = getTagColor(newTopic.label);

                $rootScope.base.createTopicIsHide = true;

                if(talk.isEdit){
                    cleanAttached($('#attach-area-edit-' + talk.id));
                    cleanAttached($('#attach-doc-area-edit-' + talk.id));
                    talk.isEdit = false;
                }else{
                    cleanAttached($('#attach-area-'+talk.attachId));
                    cleanAttached($('#attach-doc-area-'+talk.attachId));
                    $rootScope.selectGroup($rootScope.base.bufferSelectedGroup);
                    talk.subject = TEXT_DEFAULT_4;
                }
            }
        }

        function createWallTopic(ctrl){

            if (ctrl.isEdit) {
                ctrl.attachedImages = getAttachedImages($('#attach-area-edit-' + ctrl.id));
                ctrl.attachedDocs = getAttachedDocs($('#attach-doc-area-edit-' + ctrl.id),ctrl.isEdit);
            } else {
                ctrl.attachedImages = getAttachedImages($('#attach-area-'+ctrl.attachId));
                ctrl.attachedDocs = getAttachedDocs($('#attach-doc-area-'+ctrl.attachId));
            }


            if (ctrl.attachedImages.length == 0 && ctrl.attachedDocs && ctrl.attachedDocs.length == 0 && !ctrl.isPollShow
                && (ctrl.message.content == TEXT_DEFAULT_1 || !ctrl.message.content)) {

                ctrl.isCreateMessageError = true;
                ctrl.createMessageErrorText = "Вы не ввели сообщение";

            } else if (ctrl.isPollShow && (!ctrl.pollSubject || ctrl.pollInputs[0].name == "" || ctrl.pollInputs[1].name == "")) {

                ctrl.isCreateMessageError = true;
                ctrl.createMessageErrorText = "Вы не указали данные для опроса";

            } else {

                if (ctrl.message.content == TEXT_DEFAULT_1 && (ctrl.attachedImages || ctrl.attachedDocs || ctrl.isPollShow)) {
                    ctrl.message.content = "";
                }
                ctrl.isCreateMessageError = false;

                var isWall = 1,
                newTopic = postTopic(ctrl, isWall,false,$filter);

                if (ctrl.isEdit) {
                    cleanAttached($('#attach-area-edit-' + ctrl.id));
                    cleanAttached($('#attach-doc-area-edit-' + ctrl.id));
                    ctrl.isEdit = false;
                    if(ctrl.poll && newTopic.poll){
                        ctrl.poll.alreadyPoll = newTopic.poll.alreadyPoll;
                        ctrl.poll.pollId = newTopic.poll.pollId;
                    }
                } else {
                    cleanAttached($('#attach-area-'+ctrl.attachId));
                    cleanAttached($('#attach-doc-area-'+ctrl.attachId));
                }

                if(!ctrl.isWallSingle) $rootScope.selectGroup($rootScope.base.bufferSelectedGroup);

            }
        }

        $rootScope.createTopic = function(event,ctrl){
            event.preventDefault();

            if(!ctrl.isEdit){
                $(event.target).closest('.message-input').find('.topic-textarea').height(TEXTAREA_DEFAULT_HEIGHT);
            }

            if(ctrl.isTalk){
                // значит это talk
                addSingleTalk(ctrl);
            }else {
                // значит это wall
                createWallTopic(ctrl);
            }
        };

        function createWallMessage(wallItem){
            //wallItem.groupId = lenta.selectedGroupInTop.id;
            wallItem.groupId = $rootScope.base.bufferSelectedGroup.id;

            var isWall = true,
                message = postMessage(wallItem, isWall,false,$filter);

            if(message == 0){
                wallItem.isCreateCommentError = true;
                wallItem.createCommentErrorText = "Вы не ввели сообщение";
            }else {
                wallItem.isCreateCommentError = false;
                base.initStartParamsForCreateMessage(message);

                if (wallItem.messages) {
                    wallItem.messages.push(message);

                    var mesLen = wallItem.messages.length;

                    (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT && !wallItem.isOpen) ?
                        wallItem.bufferMessages = wallItem.messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                        wallItem.bufferMessages = wallItem.messages;

                } else {
                    wallItem.messages = [];
                    wallItem.messages[0] = message;

                    wallItem.bufferMessages = [];
                    wallItem.bufferMessages[0] = wallItem.messages[0];
                }

            }
        }

        function addSingleFirstMessage(talk){
            if (talk.fullTalkTopic)talk.topicId = talk.fullTalkTopic.id;

            talk.messageId = talk.id;

            var isWall = false,
                isFirstLevel = true,
                newMessage = postMessage(talk,isWall,isFirstLevel,$filter);

            if(newMessage == 0){
                talk.isCreateFirstMessageError = true;
                talk.createFirstMessageErrorText = "Вы не ввели сообщение";
            }else {
                talk.fullTalkTopic ?
                talk.fullTalkTopic.answerInputIsShow = false :
                talk.answerInputIsShow = false;

                talk.isCreateFirstMessageError = false;

                /*if(talk.fullTalkTopic && !talk.fullTalkFirstMessages){
                    talk.fullTalkFirstMessages = [];
                    talk.fullTalkFirstMessages[0] = newMessage;
                }*/

                talk.isEdit = false;

                if(talk.fullTalkTopic) {
                    if (talk.fullTalkFirstMessages) {

                        if (talk.fullTalkFirstMessages.length < 10 ||
                            $rootScope.base.isEarliestMessages ||
                            $rootScope.base.endOfLoaded ) {

                            $rootScope.base.lastLoadedId = newMessage.id;
                            talk.fullTalkFirstMessages.push(newMessage);

                        }

                    } else {
                        talk.fullTalkFirstMessages = [];
                        talk.fullTalkFirstMessages[0] = newMessage;
                        $rootScope.base.lastLoadedId = newMessage.id;
                        $rootScope.base.isEarliestMessages = true;
                    }
                }

            }
        }

        function addSingleMessage(firstMessage,topicId,talk,message){
            if (!talk.fullTalkMessages[firstMessage.id])
                talk.fullTalkMessages[firstMessage.id] =
                    messageClient.getMessages(topicId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;

            var fullTalkMessagesLength;
            talk.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length:
                fullTalkMessagesLength = 0;

            var newMessage,answer,parentId;

            if(!message){
                // если добавляем к сообщению первого уровня
                talk.messageId = firstMessage.id;
                talk.message = firstMessage;

                    answer = firstMessage.commentText;
                firstMessage.isTreeOpen = true;
                firstMessage.commentText = TEXT_DEFAULT_2;
                parentId = firstMessage.id;

                if(!firstMessage.childCount || firstMessage.childCount == 0) firstMessage.childCount = 1;

            }else{
                // если добавляем к простому сообщению
                talk.messageId = message.id;
                talk.message = message;

                for(var i = 0; i < fullTalkMessagesLength; i++){
                    if(talk.fullTalkMessages[firstMessage.id][i].id == message.id){
                        //talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                        talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                        talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                        talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                        talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                        answer = talk.fullTalkMessages[firstMessage.id][i].commentText;
                    }
                }
                parentId = message.id;

            }
            var isWall = false,
                isFirstLevel = false;
            talk.topicId = topicId;
            talk.parentId = parentId;
            talk.commentText = answer;

            newMessage = postMessage(talk,isWall,isFirstLevel,$filter);

            if(newMessage == 0){
                if(!message){
                    talk.isCreateMessageToFirstError = true;
                    talk.createMessageToFirstErrorText = "Вы не ввели сообщение";
                }else{
                    talk.isCreateMessageError = true;
                    talk.createMessageErrorText = "Вы не ввели сообщение";
                }
            }else {
                if(!message){
                    talk.isCreateMessageToFirstError = false;
                    firstMessage.answerInputIsShow = false;
                    firstMessage.isEdit = false;

                }else{
                    talk.isCreateMessageError = false;
                    for(var i = 0; i < fullTalkMessagesLength; i++){
                        if(talk.fullTalkMessages[firstMessage.id][i].id == message.id){
                            talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                            talk.fullTalkMessages[firstMessage.id][i].isEdit = false;
                        }
                    }
                }

                talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(topicId, talk.selectedGroup.id, 1, firstMessage.id, 0, 1000).messages;

                talk.fullTalkMessages[firstMessage.id] ?
                    fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length :
                    fullTalkMessagesLength = 0;

                for (var i = 0; i < fullTalkMessagesLength; i++) {
                    talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                    talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                    talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                    talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                    talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                    talk.fullTalkMessages[firstMessage.id][i].commentText = TEXT_DEFAULT_2;
                }
            }
        }

        function addDialogMessage(ctrl){
            var attach = [];

            if ((ctrl.commentText != TEXT_DEFAULT_1 && ctrl.commentText != "") || attach.length != 0) {

                if(ctrl.isEdit){
                    // значит редактирование

                    var attachImg = getAttachedImages($('#attach-area-edit-'+ctrl.attachId));
                    var attachDoc = getAttachedDocs($('#attach-doc-area-edit-'+ctrl.attachId),true);
                    attach = attachImg.concat(attachDoc);

                    // еще attach
                    ctrl.commentText = $filter('linky')(ctrl.commentText,'blank');
                    ctrl.commentText = withTags(ctrl.commentText);
                    dialogClient.updateDialogMessage(ctrl.id, ctrl.commentText,attach);

                    cleanAttached($('#attach-area-edit-'+ctrl.attachId));
                    cleanAttached($('#attach-doc-area-edit-'+ctrl.attachId));

                    ctrl.content = ctrl.commentText;

                    ctrl.images = attachImg;
                    ctrl.documents = attachDoc;
                    ctrl.isEdit = false;

                }else {
                    // значит создание
                    attach = getAttachedImages($('#attach-area-'+ctrl.attachId)).concat(getAttachedDocs($('#attach-doc-area-'+ctrl.attachId)));

                    var newDialogMessage = new com.vmesteonline.be.thrift.thrift.messageservice.DialogMessage();

                    (ctrl.commentText == TEXT_DEFAULT_1) ?
                        newDialogMessage.content = "" :
                        newDialogMessage.content = ctrl.commentText;

                    newDialogMessage.author = $rootScope.base.me.id;

                    newDialogMessage.created = Date.parse(new Date()) / 1000;
                    newDialogMessage.authorProfile = userClient.getUserProfile(newDialogMessage.author);

                    newDialogMessage.content = $filter('linky')(newDialogMessage.content,'blank');
                    newDialogMessage.content = withTags(newDialogMessage.content);
                    var tempMessage = dialogClient.postMessage(ctrl.dialogId, newDialogMessage.content, attach);

                    newDialogMessage.images = tempMessage.images;
                    newDialogMessage.documents = tempMessage.documents;
                    newDialogMessage.id = tempMessage.id;
                    newDialogMessage.isDialog = true;
                    newDialogMessage.attachId = ctrl.dialogId+"-"+newDialogMessage.id;

                    //ctrl.privateMessages.unshift(newDialogMessage);
                    $rootScope.base.privateMessages.unshift(newDialogMessage);
                    $rootScope.base.initStartParamsForCreateMessage(newDialogMessage);

                    if(ctrl.privateMessages.length == 1){
                        // на случай если с 0 добавляется более 20 сообщений
                        // чтобы подгружал от 1го сообщения а не от 0
                        $rootScope.base.lastLoadedId = newDialogMessage.id;
                    }

                    ctrl.commentText = TEXT_DEFAULT_1;

                    cleanAttached($('#attach-area-'+ctrl.attachId));
                    cleanAttached($('#attach-doc-area-'+ctrl.attachId));
                }

            }

        }

        $rootScope.createMessage = function(e,ctrl,topicId,talk,message){
            e.preventDefault();

            if(!ctrl.isEdit){
                $(e.target).closest('.answer-block').find('.message-textarea').height(TEXTAREA_DEFAULT_HEIGHT);
            }

            if(ctrl.isTalk){
                //alert('111 '+ctrl.fullAdvertTopic+" "+ctrl.parentId);
                if((ctrl.fullTalkTopic || ctrl.parentId == 0) && !topicId){
                    //alert('1');
                    addSingleFirstMessage(ctrl);
                }else{
                    if(!message){
                        //alert('2');
                        addSingleMessage(ctrl,topicId,talk);
                    }else{
                        //alert('3');
                        addSingleMessage(message,topicId,talk,ctrl);
                    }
                }

            }else if(ctrl.isDialog){
                addDialogMessage(ctrl);
            }else{
                createWallMessage(ctrl);
            }

        };

        base.initStartParamsForCreateMessage = function(ctrl){

            ctrl.isEdit = false;
            ctrl.answerShow = false;
            ctrl.isFocus = false;
            ctrl.isCreateCommentError = false;

            if(ctrl.isDialog){
                ctrl.default = ctrl.commentText = TEXT_DEFAULT_1;
            }else{
                ctrl.default = ctrl.commentText = TEXT_DEFAULT_2;
            }

            if(ctrl.id || ctrl.isDialog){
                // занчит редактирование
                if(!ctrl.isTalk) ctrl.commentText = ctrl.content;
                ctrl.answerShow = true;
            }else{
                // значит создание
            }

        };

        base.getUserColor = function(groupType){
          return getTagColor(getLabel(base.groups,groupType));
        };

        base.toggleFullText = function(ctrl){
            ctrl.isFullText ? ctrl.isFullText = false : ctrl.isFullText = true;
        };

        base.setPrivateMessages = function (dialogId,loadedLength){
            try {
                $rootScope.base.privateMessages = dialogClient.getDialogMessages(dialogId, 0, loadedLength, 0);
            } catch (e) {
                $state.go('dialogs');
            }
            var privateMessagesLength = $rootScope.base.privateMessages.length;

            if (privateMessagesLength != 0) $rootScope.base.lastLoadedId = $rootScope.base.privateMessages[privateMessagesLength - 1].id;

            for (var i = 0; i < privateMessagesLength; i++) {
                $rootScope.base.privateMessages[i].authorProfile = userClient.getUserProfile($rootScope.base.privateMessages[i].author);
                $rootScope.base.privateMessages[i].isDialog = true;
                $rootScope.base.privateMessages[i].attachId = dialogId + "-" + $rootScope.base.privateMessages[i].id;
                $rootScope.base.initStartParamsForCreateMessage($rootScope.base.privateMessages[i]);
            }
        };

        base.newPrivateMessagesCount = 0;
        base.biggestCountDialogId = 0;

        var timeStamp = 0;
        base.checkUpdates = function(){
            timeStamp = messageClient.checkUpdates(timeStamp);

            var updateMap,
                old = 0;

            if(timeStamp == 0){
                updateMap = messageClient.getDialogUpdates();
                var temp = 0,
                    currentDialogId = $rootScope.base.currentDialogId;

                //alert(currentDialogId+" "+$rootScope.currentPage);

                for(var dialogId in updateMap){
                    if(dialogId != currentDialogId || $rootScope.currentPage != 'dialog-single') {

                        temp += updateMap[dialogId];

                        if (updateMap[dialogId] > old) {
                            base.biggestCountDialogId = dialogId;
                        }

                        old = updateMap[dialogId];
                    }else{
                        base.setPrivateMessages(currentDialogId,20);
                    }
                }

                base.newPrivateMessagesCount = temp;
                try {
                    $rootScope.$digest();
                }catch(e){
                    console.log('err');
                }

            }
        };

        setInterval(base.checkUpdates,5000);

        base.contentLength = 500;

        var lsGroupId = localStorage.getItem('groupId'),
            groupsLength = base.groups.length;

        if(!lsGroupId){
            $rootScope.currentGroup = getDefaultGroup(base.groups);
        }else{
            for(var i = 0; i < groupsLength; i++){
                if(base.groups[i].id == lsGroupId){
                    $rootScope.currentGroup = base.groups[i];
                }
            }
            if(!$rootScope.currentGroup){
                $rootScope.currentGroup = getDefaultGroup(base.groups);
            }
        }

        $rootScope.base = base;
        base.checkUpdates();

        $rootScope.currentPage = 'lenta';

        $rootScope.leftbar = {};

    })
  .controller('navbarController', function($rootScope) {
        this.privateMessagesBtnStatus = "";
        $rootScope.navbar = this;

        this.logout = function(event){
            event.preventDefault();

            localStorage.removeItem('groupId');
            authClient.logout();

            document.location.replace("/login");

        }

        //$('.ng-cloak').removeClass('ng-cloak');

  })
  .controller('leftBarController',function($rootScope) {

    $rootScope.setTab = function(newValue){

        $rootScope.leftbar.tab = newValue;
        $rootScope.isTopSearchShow = true;
        resetPages($rootScope.base);
        resetAceNavBtns($rootScope.navbar);

        switch(newValue){
            case 1:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.lentaIsActive = true;
                $rootScope.currentPage = 'lenta';
                $rootScope.base.pageTitle = "Новости";
                break;
            case 2:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.isTalkTitles = true;
                $rootScope.base.talksIsActive = true;
                $rootScope.currentPage = 'talks';
                $rootScope.base.pageTitle = "Обсуждения";
                break;
            case 3:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.isAdvertsTitles = true;
                $rootScope.base.advertsIsActive = true;
                $rootScope.currentPage = 'adverts';
                $rootScope.base.pageTitle = "Объявления";
                break;
            default :
                break;
        }

    };

    $rootScope.isSet = function(number){
        return $rootScope.leftbar.tab === number;
    };
  })
    .controller('mainContentTopController',function($rootScope) {
        var topCtrl = this;

        topCtrl.groups = userClientGroups;// ? userClientGroups.reverse() : userClient.getUserGroups().reverse();
        var groups = $rootScope.groups = topCtrl.groups,
            groupsLength = groups.length;

        for(var i = 0; i < groupsLength; i++){
            groups[i].isShow = true;
            if(groups[i].id == $rootScope.currentGroup.id) groups[i].selected = true;
        }

        topCtrl.isSet = function(groupId){
            //return groupId ===
        };

        $rootScope.selectGroup = function(group){
            var groupId;

            for(var i = 0; i < groupsLength; i++){
                groups[i].selected = false;
            }

                group.selected = true;
                groupId = group.id;

            $rootScope.currentGroup = group;
            $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(group.id);

            $rootScope.importantTopics = messageClient.getImportantTopics(group.id);

            if($rootScope.currentPage == 'lenta'){
                $rootScope.wallChangeGroup(group.id);
                $rootScope.selectGroupInDropdown_lenta(group.id);
            }else if($rootScope.currentPage == 'talks'){
                $rootScope.talksChangeGroup(group.id);
                $rootScope.selectGroupInDropdown_talks(group.id);
            }else if($rootScope.currentPage == 'adverts'){
                $rootScope.advertsChangeGroup(group.id);
                $rootScope.selectGroupInDropdown_adverts(group.id);
            }else if($rootScope.currentPage == 'neighbours'){
                $rootScope.neighboursChangeGroup(group.id);
            }else if($rootScope.currentPage == 'maps'){
                $rootScope.mapsChangeGroup(group.id);
            }

            localStorage.setItem('groupId',group.id);
            //$rootScope.currentGroup = $rootScope.base.selectGroupInDropdown(group.id);

        };

        topCtrl.showCreateTopic = function(event){
            event.preventDefault();

            $rootScope.base.createTopicIsHide ? $rootScope.base.createTopicIsHide = false : $rootScope.base.createTopicIsHide = true;

        };

        $('.ng-cloak').removeClass('ng-cloak');
    })
    .controller('rightBarController',function($rootScope) {

        $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = true;

        $('.ng-cloak').removeClass('ng-cloak');

    })
    .controller('LentaController',function($rootScope) {

        $rootScope.setTab(1);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        var lenta = this,
            lastLoadedId = 0,
            loadedLength = 10;

        $rootScope.COMMENTS_DEFAULT_COUNT = 4;
        lenta.selectedGroupInTop = $rootScope.currentGroup;

        if(!$rootScope.importantIsLoadedFromTop)
        $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;

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
    .controller('WallSingleController',function($rootScope, $stateParams){
        var wallSingle = this;

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.isFooterBottom = false;
        initFancyBox($('.lenta-item'));

        // временно, нужна функция getWallItem(topicId)
        var wallItems = messageClient.getWallItems($rootScope.currentGroup.id,0,1000),
        wallItemsLength = wallItems.length;
        for(var i = 0; i < wallItemsLength; i++){
            if(wallItems[i].topic.id == $stateParams.topicId){
                wallSingle.wallItem = wallItems[i];
                wallSingle.wallItem.topic.isWallSingle = true;
            }
        }

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
        wallSingle.wallItem.label = getLabel(userClientGroups,wallSingle.wallItem.topic.groupType);

        wallSingle.wallItem.tagColor = getTagColor(wallSingle.wallItem.label);

        if(wallSingle.wallItem.topic.message.type == 1){

            wallSingle.wallItem.topic.lastUpdateEdit = getTiming(wallSingle.wallItem.topic.lastUpdate);

        }else if(wallSingle.wallItem.topic.message.type == 5){

            wallSingle.wallItem.topic.message.createdEdit = getTiming(wallSingle.wallItem.topic.message.created);
            wallSingle.wallItem.topic.authorName = getAuthorName(wallSingle.wallItem.topic.userInfo);
            wallSingle.wallItem.topic.metaType = "message";

            var mesLen;
            wallSingle.wallItem.messages ?
                mesLen = wallSingle.wallItem.messages.length:
                mesLen = 0;

            for(var j = 0; j < mesLen; j++){
                wallSingle.wallItem.messages[j].createdEdit = getTiming(wallSingle.wallItem.messages[j].created);
                wallSingle.wallItem.messages[j].authorName = getAuthorName(wallSingle.wallItem.messages[j].userInfo);
                wallSingle.wallItem.messages[j].isEdit = false;

                $rootScope.base.initStartParamsForCreateMessage(wallSingle.wallItem.messages[j]);
            }


            if(wallSingle.wallItem.topic.poll != null){
                //значит это опрос
                setPollEditNames(wallSingle.wallItem.topic.poll);

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
    })
    .controller('TalksController',function($rootScope) {
        /*
        * при работе с обсждениями нужно учесть следующее:
        * есть три типа сообщения :
        * 1) топик. На странице обсуждения может быть только один. Его дети
        * это сообщения первого уровня. Его дети всегда открыты, поэтому у него
        * нет контрола плюс-минус. Страница топика загружается в методе showFullTalk
        * через topicId который передается в функцию при вызове
        * Хранится в объекте talk.fullTalkTopic.
        *
        * 2) Сообщение первого уровня. Берутся через getFirstLevelMessages. Изначально
        * все потомки скрыты и не подгружены. При первом нажатии на контрол плюс-минус
        * подгружаются, потом просто переключается show-hide. ParentId у таких сообщений
        * равен 0. Внимание! : ParentId передается в getFirstLevelMessages через lastLoadedId.        *
        * У каждого сообщения первого уровня есть свой массив сообщений 3го типа.
        * Хранятся в массиве talk.fullTalkFirstMessages.
        *
        * 3) Просто сообщение. Береутся через getMessages(). Через параметр lastLoadedId передается
        * id последнего загруженного простого сообщения, для подгрузки. У каждого простого сообщения
        * есть offset, который задается на БЕ. offset'ы определяют вложенность сообщений и за счет них
        * создается древовидная структура форума.
        * Хранятся в двумерном массиве talk.fullTalkMessages[firstMessage.id][]
        *
        *
        * Есть следующие типы контролов, реализованные для разных типов сообщений:
        * 1) showAnswerInput : реализует клик на "Ответить", показвает поле для отправки
        * сообщения.
        * 2) addMessage: клик на "Отправить", создает и отображает новое сообщение
        * 3) toggleTree: контрол "плюс-минус", скрвает-показвает внутренние сообщения этого
        * сообщения.
        * */
            $rootScope.setTab(2);
            var talk = this;

            talk.attachId = "00";
            initFancyBox($('.talks'));

            $rootScope.base.showAllGroups();
            $rootScope.base.isFooterBottom = false;

            $rootScope.base.createTopicIsHide = true;

            talk.isTalksLoaded = false;
            talk.groups = userClientGroups;

            talk.message = {};
            talk.message.content = talk.message.default = TEXT_DEFAULT_3;
            talk.subject = TEXT_DEFAULT_4;

            $rootScope.base.initStartParamsForCreateTopic(talk);

            talk.isTalk = true;

            talk.fullTalkTopic = {};
            talk.fullTalkTopic.answerInputIsShow = false;
            talk.fullTalkMessages = [];
            talk.fullTalkFirstMessages = [];

            talk.commentText = TEXT_DEFAULT_2;
            var fullTalkFirstMessagesLength,
                talkId;

            $rootScope.base.bufferSelectedGroup = talk.selectedGroup = $rootScope.currentGroup;

            if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
            $rootScope.importantIsLoadedFromTop = false;

            talk.topics = messageClient.getTopics(talk.selectedGroup.id, 0, 0, 0, 1000).topics;

            initTalks();

            if (!talk.topics) talk.topics = [];

            $rootScope.selectGroupInDropdown_talks = function(groupId){
                talk.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
            };

        function initTalks(){
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                talk.topics[i].lastUpdateEdit = getTiming(talk.topics[i].lastUpdate);
                talk.topics[i].label = getLabel(talk.groups,talk.topics[i].groupType);
                talk.topics[i].tagColor = getTagColor(talk.topics[i].label);

                if(talk.topics[i].message.important == 1){
                    talk.topics[i].message.importantText = 'Снять метку "Важное"';
                }else{
                    talk.topics[i].message.importantText = 'Пометить как "Важное"';
                }
            }
        }

        $rootScope.talksChangeGroup = function(groupId){

            talk.topics = messageClient.getTopics(groupId,0,0,0,1000).topics;

            if(talk.topics) {
                initTalks();
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    })
    .controller('TalksSingleController',function($rootScope,$stateParams){

        $rootScope.base.isFooterBottom = false;

        var talk = this,
            fullTalkMessagesLength,
            talkId = $stateParams.talkId;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        talk.attachId = "00";
        talk.selectedGroup = $rootScope.currentGroup;

        if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;

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
    .controller('AdvertsController',function($rootScope) {
        var adverts = this;

        adverts.attachId = "00000";
        $rootScope.setTab(3);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;
        showGroupOverBuilding($rootScope.groups);

        if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;

        /*initAttachImage($('#attachImage-00000'), $('#attach-area-00000')); // для обсуждений
        initAttachDoc($('#attachDoc-00000'), $('#attach-doc-area-00000')); // для обсуждений*/
        initFancyBox($('.adverts'));

        $rootScope.base.createTopicIsHide = true;
        adverts.isAdvertsLoaded = false;
        adverts.groups = userClientGroups;

        adverts.isTalk = true;
        adverts.isAdvert = true;

        adverts.message = {};
        adverts.message.content = adverts.message.default = TEXT_DEFAULT_3;
        adverts.subject = TEXT_DEFAULT_4;

        $rootScope.base.initStartParamsForCreateTopic(adverts);

        adverts.answerFirstMessage = TEXT_DEFAULT_2;

        $rootScope.base.bufferSelectedGroup = adverts.selectedGroup = $rootScope.currentGroup;

        adverts.topics = messageClient.getAdverts(adverts.selectedGroup.id, 0, 1000).topics;

        initAdverts();

        if (!adverts.topics) adverts.topics = [];

        $rootScope.selectGroupInDropdown_adverts = function(groupId){
            adverts.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        function initAdverts(){
            var topicLength;
            adverts.topics ? topicLength = adverts.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                adverts.topics[i].lastUpdateEdit = getTiming(adverts.topics[i].lastUpdate);
                adverts.topics[i].label = getLabel(adverts.groups,adverts.topics[i].groupType);
                adverts.topics[i].tagColor = getTagColor(adverts.topics[i].label);
            }
        }

        $rootScope.advertsChangeGroup = function(groupId){

            adverts.topics = messageClient.getAdverts(groupId,0,1000).topics;

            if(adverts.topics) {
                initAdverts();
            }

        };

        $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));

        $('.ng-cloak').removeClass('ng-cloak');

    })
    .controller('AdvertsSingleController',function($rootScope,$stateParams) {
        var advert = this,
            fullTalkMessagesLength,
            advertId = $stateParams.advertId;

        $rootScope.base.isFooterBottom = false;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;

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
    .controller('neighboursController',function($rootScope,$state) {
        $rootScope.currentPage = "neighbours";
        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        resetPages($rootScope.base);
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.base.neighboursIsActive = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.neighboursBtnStatus = "active";
        $rootScope.base.pageTitle = "";

        $rootScope.base.neighboursLoadStatus = "isLoaded";

        var neighbours = this;
        neighbours.neighboors = userClient.getNeighboursByGroup($rootScope.currentGroup.id);

        $rootScope.neighboursChangeGroup = function(groupId){
            neighbours.neighboors = userClient.getNeighboursByGroup(groupId);
            initAutoFill();
        };

        neighbours.neighboorsSize = neighbours.neighboors.length;

        function initAutoFill(){
            var data = [],
                neighboursLength = neighbours.neighboors.length;
            for(var i = 0; i < neighboursLength; i++){
                data[i] = {};
                data[i].label = neighbours.neighboors[i].firstName+" "+neighbours.neighboors[i].lastName;
                data[i].value = neighbours.neighboors[i].id;
                data[i].category = "";
            }
            $("#search-neighbours" ).catcomplete({
                delay: 0,
                source: data,
                select: function(event,ui){
                    $state.go('profile',{ 'userId' : ui.item.value});

                }
            });
        }
        initAutoFill();

        $('.ng-cloak').removeClass('ng-cloak');

    })
    .controller('ProfileController',function($rootScope, $stateParams) {

        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;

        resetPages($rootScope.base);
        $rootScope.base.profileIsActive = true;
        $rootScope.base.isFooterBottom = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.profileLoadStatus = "isLoaded";

        var profile = this, userId;
        profile.isMayEdit = false;

        $("#dialog-message").addClass('hide');

        if ($stateParams.userId && $stateParams.userId != 0 && $stateParams.userId != shortUserInfo.id){
            userId = $stateParams.userId;
            //profile.userContacts = userClient.getUserContactsExt(userId);
        }else{
            userId = 0;
            profile.isMayEdit = true;
            profile.map = userClient.getGroupMap($rootScope.groups[0].id, MAP_COLOR);
            //profile.userContacts = userClient.getUserContacts();
        }

        profile.userProfile = userClient.getUserProfile(userId);

        var isEmptyContacts = false,
            isEmptyFamily = false,
            isEmptyInterests = false,
            isEmptyNotifications = false,
            isEmptyUserInfo = false;

        if(!profile.userProfile.userInfo || !profile.userProfile.userInfo.birthday) isEmptyUserInfo = true;

        if(!profile.userProfile.contacts || (!profile.userProfile.contacts.homeAddress && !profile.userProfile.contacts.mobilePhone &&
            !profile.userProfile.contacts.email)) isEmptyContacts = true;

        if(!profile.userProfile.family || (!profile.userProfile.family.relations
            && !profile.userProfile.family.childs && !profile.userProfile.family.pets)) isEmptyFamily = true;

        if(!profile.userProfile.interests || (!profile.userProfile.interests.userInterests && !profile.userProfile.interests.job)) isEmptyInterests = true;

        if(!profile.userProfile.notifications) isEmptyNotifications = true;

        //alert(isEmptyUserInfo+" "+isEmptyContacts+" "+isEmptyFamily+" "+isEmptyInterests+" "+isEmptyNotifications);
        if(isEmptyUserInfo && isEmptyContacts && isEmptyFamily && isEmptyInterests && isEmptyNotifications)
            profile.isEmptyProfile = true;

        if(profile.userProfile.userInfo){
            if (profile.userProfile.userInfo.gender == 1){
                profile.userProfile.userInfo.genderMeta = "Женский";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.userInfo.genderMeta = "Мужской";
            }else{
                profile.userProfile.userInfo.genderMeta = "";
            }
        }

        $rootScope.base.avatarBuffer = profile.userProfile.userInfo.avatar;

        if(profile.userProfile.family && profile.userProfile.family.relations == 0){

            if(profile.userProfile.userInfo.gender == 1){
                profile.userProfile.family.relationsMeta = "Замужем";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.family.relationsMeta = "Женат";
            }

        }else if(profile.userProfile.family && profile.userProfile.family.relations == 1){
            if(profile.userProfile.userInfo.gender == 1){
                profile.userProfile.family.relationsMeta = "Не замужем";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.family.relationsMeta = "Холост";
            }
        }

        if(profile.userProfile.family && profile.userProfile.family.pets && profile.userProfile.family.pets.length != 0){
           var petsLength = profile.userProfile.family.pets.length;
            var pets = profile.userProfile.family.pets;
            for(var i = 0; i < petsLength; i++){
                switch(profile.userProfile.family.pets[i].type){
                    case 0:
                        profile.userProfile.family.pets[i].typeMeta = "Кошка";
                        break;
                    case 1:
                        profile.userProfile.family.pets[i].typeMeta = "Собака";
                        break;
                    case 2:
                        profile.userProfile.family.pets[i].typeMeta = "Птичка";
                        break;
                }

            }
        }

        //$rootScope.chageIndex = 0;

        angular.element($('.profile')).css({'min-height': $(window).height()-135});

        $('.ng-cloak').removeClass('ng-cloak');

})
    .controller('SettingsController',function($rootScope,$scope) {
        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;

        resetPages($rootScope.base);
        $rootScope.base.settingsIsActive = true;
        $rootScope.base.isFooterBottom = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.base.mainContentTopIsHide = true;

        $rootScope.base.settingsLoadStatus = "isLoaded";

        var settings = this,
            userProfileMeta = userClient.getUserProfile(),
            userContatcsMeta = userProfileMeta.contacts,
            userInfoMeta = userProfileMeta.userInfo,
            userPrivacyMeta = userProfileMeta.privacy,
            userNotificationsMeta = userProfileMeta.notifications,
            userFamilyMeta = userProfileMeta.family,
            userInterestsMeta = userProfileMeta.interests;

        if(userFamilyMeta === null){
            userFamilyMeta = new com.vmesteonline.be.thrift.UserFamily();
        }

        settings.userContacts = clone(userContatcsMeta);
        settings.userInfo = clone(userInfoMeta);
        settings.userPrivacy = clone(userPrivacyMeta);
        settings.userNotifications = clone(userNotificationsMeta);
        if(!settings.userNotifications){
            settings.userNotifications = new com.vmesteonline.be.thrift.Notifications();
            settings.userNotifications.freq = 4;
        }

        settings.family = clone(userFamilyMeta);
        settings.interests = clone(userInterestsMeta);

        if (settings.userInfo.gender == 1) {
            settings.married = "Замужем";
            settings.notMarried = "Не замужем";
        }else if(settings.userInfo.gender == 2){
            settings.married = "Женат";
            settings.notMarried = "Не женат";
        }else{
            settings.married = "В браке";
            settings.notMarried = "Не состою в браке";
        }

        settings.years= [];
        var ind = 0;
        for(var i = 2014; i > 1940; i--){
            settings.years[ind++] = i;
        }

        settings.userInfo.birthday ?
        settings.userInfo.birthdayMeta = new Date(settings.userInfo.birthday*1000) :
        settings.userInfo.birthdayMeta = "";

        if(settings.userInfo.birthdayMeta){
            var month = settings.userInfo.birthdayMeta.getMonth()+1+"";
            if(month.length == 1) month = "0"+month;

            var day = ""+settings.userInfo.birthdayMeta.getDate();
            if(day.length == 1) day = "0"+day;

            var year = settings.userInfo.birthdayMeta.getFullYear();

            settings.userInfo.birthdayMeta = day+"."+month+"."+year;
        }

        if(settings.family.childs === null || settings.family.childs.length == 0){
            settings.family.childs = [];
            settings.family.childs[0] = new com.vmesteonline.be.thrift.Children();
            settings.family.childs[0].name = "";
            var nowYear = new Date();
            nowYear = nowYear.getFullYear();
            //settings.family.childs[0].birthday = Date.parse('01.15.'+nowYear);
            settings.family.childs[0].birthday = null;
            settings.family.childs[0].isNotRemove = true;
        }
        var childsLength = settings.family.childs.length;
        for(var i = 0; i < childsLength; i++){
            if(settings.family.childs[i].birthday) {

                var birthDate = new Date(settings.family.childs[i].birthday*1000);
                    settings.family.childs[i].month = ""+birthDate.getMonth();

                if(settings.family.childs[i].month.length == 1)
                    settings.family.childs[i].month = "0"+settings.family.childs[i].month;

                    settings.family.childs[i].year = birthDate.getFullYear();
            }

        }

        if(settings.family.pets === null || settings.family.pets.length == 0){
            settings.family.pets = [];
            settings.family.pets[0] = new com.vmesteonline.be.thrift.Pet();
            settings.family.pets[0].name = "";
            settings.family.pets[0].type = "0";
            settings.family.pets[0].breed = "";
            settings.family.pets[0].isNotRemove = true;
        }

        settings.oldPassw = "";
        settings.newPassw = "";

        settings.canSave = function(num){
            switch(num){
                case 1:
                    return $scope.formUserInfo.$valid;
                    break;
                case 2:
                    return $scope.formPrivate.$valid;
                    break;
                case 3:
                    return $scope.formAlerts.$valid;
                    break;
                case 4:
                    return $scope.formContacts.$valid;
                    break;
                case 5:
                    return $scope.formFamily.$valid;
                    break;
                case 6:
                    return $scope.formInterests.$valid;
                    break;
            }

        };

        settings.profileInfo = "Сохранено";

        settings.isProfileError = false;
        settings.isProfileResult = false;
        settings.updateUserInfo = function(){
            var temp = new com.vmesteonline.be.thrift.UserInfo();

            settings.userInfo.birthdayMeta ?
                temp.birthday = Date.parse(getCorrectDate(settings.userInfo.birthdayMeta))/1000 :
                temp.birthday = 0;

            temp.gender = settings.userInfo.gender;
            temp.firstName = $rootScope.base.me.firstName = settings.userInfo.firstName;
            temp.lastName = $rootScope.base.me.lastName = settings.userInfo.lastName;

            userClient.updateUserInfo(temp);
            settings.isProfileResult = true;
            settings.isProfileError = false;
            settings.profileInfo = "Сохранено";

        };

        settings.isPasswError = false;
        settings.isPasswResult = false;
        settings.updatePassword = function(){
            if (settings.newPassw.length < 3){
                settings.isPasswResult = true;
                settings.isPasswError = true;
                settings.passwInfo = "Вы указали слишком короткий пароль";
            }else{
                settings.isPasswResult = true;
                try {
                    userClient.changePassword(settings.oldPassw, settings.newPassw);
                    settings.isPasswError = false;
                    settings.passwInfo = "Сохранено";
                }catch(e){
                    settings.isPasswError = true;
                    settings.passwInfo = "Вы указали не верный старый пароль";
                }
            }
        };


        settings.isPrivacyError = false;
        settings.isPrivacyResult = false;
        settings.updatePrivacy = function(){
            userClient.updatePrivacy(settings.userPrivacy);

            settings.isPrivacyResult = true;
            settings.isPrivacyError = false;
        };


        settings.isContactsError = false;
        settings.isContactsResult = false;
        settings.updateContacts = function(){
            var temp = new com.vmesteonline.be.thrift.UserContacts();
            temp.email = settings.userContacts.email;
            temp.mobilePhone = settings.userContacts.mobilePhone;
            userClient.updateContacts(temp);

            settings.isContactsError = false;
            settings.isContactsResult = true;
        };

        settings.isAlertsError = false;
        settings.isAlertsResult = false;
        settings.updateNotifications = function(){
            if(settings.userNotifications && (settings.userNotifications.email || settings.userNotifications.freq) ){
                var temp = new com.vmesteonline.be.thrift.Notifications();
                temp.email = settings.userNotifications.email;
                temp.freq = settings.userNotifications.freq;

                userClient.updateNotifications(temp);

                settings.isAlertsError = false;
                settings.isAlertsResult = true;
            }
        };

        settings.isFamilyError = false;
        settings.isFamilyResult = false;
        settings.updateFamily = function(){
            var temp = new com.vmesteonline.be.thrift.UserFamily();
            temp.relations = settings.family.relations;
            temp.childs = settings.family.childs;
            //temp.childs = [];
            //temp.childs[0] = settings.firstChild;

            temp.pets = settings.family.pets;

            var childsLength = settings.family.childs.length;
            for(var i = 0; i < childsLength; i++){
                if(settings.family.childs[i].name && settings.family.childs[i].name != ""){ <!--  && settings.family.childs[i].month && settings.family.childs[i].year -->

                    var tempMonth = parseInt(settings.family.childs[i].month)+1+"";

                    if(tempMonth.length < 2) tempMonth = "0" + tempMonth;

                    if(settings.family.childs[i].year && settings.family.childs[i].year != '1911' && settings.family.childs[i].month) {
                        temp.childs[i].birthday = Date.parse(getCorrectDate("15."+tempMonth +"." + settings.family.childs[i].year)) / 1000;
                        //alert(tempMonth+" "+getCorrectDate("15."+tempMonth +"." + settings.family.childs[i].year));
                    }else{
                        temp.childs[i].birthday = null;
                    }
                }
            }
            var petsLength = settings.family.pets.length;
            for(var i = 0; i < petsLength; i++){
                if(temp.pets[i] && !temp.pets[i].name){
                    //temp.pets.splice(i,1);
                }
            }

            userClient.updateFamily(temp);

            settings.isFamilyError = false;
            settings.isFamilyResult = true;
        };

        settings.isInterestsError = false;
        settings.isInterestsResult = false;
        settings.updateInterests = function(){
            var temp = new com.vmesteonline.be.thrift.UserInterests();
            temp.job = settings.interests.job;
            temp.userInterests = settings.interests.userInterests;
            userClient.updateInterests(temp);

            settings.isInterestsError = false;
            settings.isInterestsResult = true;
        };

        settings.childAdd = function(event){
            event.preventDefault();

            var newChild = new com.vmesteonline.be.thrift.Children();
            newChild.name = " ";
            var nowYear = new Date();
            nowYear = nowYear.getFullYear();
            newChild.birthday = Date.parse(getCorrectDate('15.01.'+nowYear));

            var birthDate = new Date(newChild.birthday);
            //newChild.month = ""+birthDate.getMonth();
            newChild.month = "";

            if(newChild.length == 1)
                newChild.month = "0"+newChild.month;

            //newChild.year = birthDate.getFullYear();
            newChild.year = "";


            if(settings.family == null){
                settings.family = new com.vmesteonline.be.thrift.UserFamily();
            }
            if(settings.family.childs == null){
                settings.family.childs= [];
            }

            settings.family.childs.length == 0 ?
            settings.family.childs[0] = newChild :
            settings.family.childs.push(newChild);

        };
        settings.removeChild = function(childName){
            var childsLength = settings.family.childs.length;
            for(var i = 0; i < childsLength; i++){
                if(settings.family.childs[i].name == childName) {
                    settings.family.childs.splice(i,1);
                }

            }
        };
        settings.petAdd = function(event){
            event.preventDefault();

            var newPet = new com.vmesteonline.be.thrift.Pet();
            newPet.name = " ";
            newPet.type = "0";

            if(settings.family == null){
                settings.family = new com.vmesteonline.be.thrift.UserFamily();
            }
            if(settings.family.pets == null){
                settings.family.pets= [];
            }

            settings.family.pets.length == 0 ?
                settings.family.pets[0] = newPet :
                settings.family.pets.push(newPet);
        };
        settings.removePet = function(petName){
            var petsLength = settings.family.pets.length;
            for(var i = 0; i < petsLength; i++){
                if(settings.family.pets[i].name == petName) {
                    settings.family.pets.splice(i,1);
                }

            }
        };

        settings.passwChange = false;
        settings.changePassw = function(){
            settings.passwChange = true;
        };

        /*(settings.userInfo.birthday != 0) ?
        settings.birthday = settings.userInfo.birthday :
        settings.birthday = "";*/

        $('#settings-input-3').datepicker({changeMonth:true, changeYear:true,dateFormat: "dd.mm.yy",yearRange:'c-100:+c'});
        $.datepicker.setDefaults($.datepicker.regional['ru']);

        angular.element($('.settings')).css({'min-height': $(window).height()-125});

        $('.ng-cloak').removeClass('ng-cloak');

        var href = document.location.href;
        var hrefInd = href.indexOf("/",9);
        $('input[name="redirect_uri"]').val(href.substring(0,hrefInd)+"/oauth");

    })
    .controller('dialogsController', function($rootScope,$state){
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.isFooterBottom = false;

        resetPages($rootScope.base);
        $rootScope.base.privateMessagesIsActive = true;
        $rootScope.base.pageTitle = "Личные сообщения";

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.privateMessagesBtnStatus = "active";

        $rootScope.base.privateMessagesLoadStatus = "isLoaded";

        $rootScope.isNewPrivateMessageAdded = false;

        var dialogs = this;

        dialogs.dialogsList = dialogClient.getDialogs(0);
        var dialogsListLength = dialogs.dialogsList.length;
        for(var i = 0; i < dialogsListLength; i++){
            (dialogs.dialogsList[i].users[0].id != $rootScope.base.me.id) ?
                dialogs.dialogsList[i].anotherUser = dialogs.dialogsList[i].users[0] :
                dialogs.dialogsList[i].anotherUser = dialogs.dialogsList[i].users[1];
        }

        dialogs.goToSingleDialog = function(dialogId){
            var usersInfoArray = [],
                usersInfoLength,
                usersId = [];
            for(var i = 0; i < dialogsListLength; i++){
                if(dialogs.dialogsList[i].id == dialogId){
                    usersInfoArray = dialogs.dialogsList[i].users;
                }
            }
            if(usersInfoArray){
                usersInfoLength = usersInfoArray.length;
                for(var i = 0; i < usersInfoLength; i++){
                    usersId[i] = usersInfoArray[i].id
                }
            }
            //$rootScope.currentDialog = dialogClient.getDialog(usersId);
            $state.go('dialog-single',{ dialogId : dialogId});
        };

        $('.ng-cloak').removeClass('ng-cloak');

    })
    .controller('dialogController',function($rootScope,$stateParams,$state) {

        initFancyBox($('.dialog'));
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.isFooterBottom = false;
        $rootScope.base.lastLoadedId = 0;
        $rootScope.currentPage = 'dialog-single';
        $rootScope.base.currentDialogId = $stateParams.dialogId;

        var dialog = this,
            lastLoadedId = 0,
            loadedLength = 20;

        try {
            var currentDialog = dialogClient.getDialogById($stateParams.dialogId);

            var currentDialogLength = currentDialog.length;

            dialog.isDialog = true;
            dialog.attachId = '000';
            dialog.dialogId = $stateParams.dialogId;

            dialog.users = currentDialog.users;
            var dialogUsersLength = dialog.users.length;
            for (var i = 0; i < dialogUsersLength; i++) {
                //console.log(dialog.users[i].id+" "+$rootScope.base.me.id);
                if (dialog.users[i] && (dialog.users[i].id == $rootScope.base.me.id)) {
                    dialog.users.splice(i, 1);
                }
            }

            if ($stateParams.dialogId) {
                $rootScope.base.setPrivateMessages(dialog.dialogId,loadedLength);

                dialog.privateMessages = $rootScope.base.privateMessages;
            }

            //dialog.messageText = TEXT_DEFAULT_1;
            $rootScope.base.initStartParamsForCreateMessage(dialog);

        }catch(e){
            $state.go('dialogs');
        }

        var lastLoadedIdFF;
        dialog.addMoreItems = function(){
            var buff = dialogClient.getDialogMessages($stateParams.dialogId,0,loadedLength,$rootScope.base.lastLoadedId);
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        for (var i = 0; i < buffLength; i++) {
                            buff[i].authorProfile = userClient.getUserProfile(buff[i].author);
                        }
                        dialog.privateMessages =
                            $rootScope.base.privateMessages = $rootScope.base.privateMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;
                }
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    })
    .controller('changeAvatarController',function($state,$rootScope){

        var changeAvatar = this, newSrc,
            x1 = 50, y1 = 50, x2 = 200, y2 = 200,
            imageWidth = 150, imageHeight = 150;

        changeAvatar.save = function(){

            var saveSrc = newSrc+"?w="+ imageWidth +"&h="+ imageHeight +"&s="+x1+","+y1+","+x2+","+y2;
            userClient.updateUserAvatar(saveSrc);
            $rootScope.base.user.avatar = $rootScope.base.avatarBuffer = saveSrc;

            $("#dialog-message").dialog('close');
            $state.go('profile');

            $('.preview-container').addClass('hidden');

            $('.ui-dialog').each(function(){
                if($(this).attr('aria-describedby') == 'dialog-message'){
                    $(this).detach();
                }
            });
        };

        changeAvatar.back = function(){
            $('.load-avatar').find('.file-label').html("").
                removeClass("hide-placeholder selected").
                attr("data-title","Загрузить аватар");

            $('.loadAvatar-area').removeClass('hidden');
            $('.crop-area').addClass('hidden');

            $('.preview-container').addClass('hidden');
            $('.loading').removeClass('hidden');

            $('#image-for-crop').detach();
            $('.jcrop-holder').detach();

            $('.btn-save-avatar').before('<img src="#" id="image-for-crop" alt="#" class="hidden" />');

        };

        initModalAndCrop();

        function initModalAndCrop() {

            $("#dialog-message").removeClass('hide').dialog({
                modal: true,
                width: 504,
                position: ['center', 100],
                title_html: false,
                closeText: "",
                create: function (event, ui) {

                    $('.load-avatar input').ace_file_input({
                        style: 'well',
                        btn_choose: 'Загрузить аватар',
                        btn_change: null,
                        no_icon: '',
                        droppable: true,
                        thumbnail: 'large',
                        icon_remove: null
                    }).on('change', function () {
                        var imageForCrop = $('#image-for-crop');

                        $('.loadAvatar-area').addClass('hidden');
                        $('.crop-area').removeClass('hidden');

                        setTimeout(saveNewAva, 1000);

                        function saveNewAva() {

                            var bg = $('.load-avatar').find('.file-label img').css('background-image'),
                                src = $('.load-avatar').find('.file-label img').attr('src');

                            newSrc = fileClient.saveFileContent(bg, true);

                            $('#preview').attr('src', newSrc);

                            imageForCrop.attr('src', newSrc);
                            imageForCrop.css({'max-width': '500px', 'max-height': '500px'});

                            imageForCrop.Jcrop({
                                aspectRatio: 1,
                                setSelect: [ 200, 200, 50, 50 ],
                                onChange: updateCoords,
                                onSelect: updateCoords
                            }).removeClass('hidden');

                            $('.preview-container').removeClass('hidden');
                            $('.loading').addClass('hidden');

                        }

                        function updateCoords(c) {
                            imageWidth = imageForCrop.width();
                            imageHeight = imageForCrop.height();

                            x1 = c.x;
                            y1 = c.y;
                            x2 = c.x2;
                            y2 = c.y2;
                            $('#x').val(c.x);
                             $('#y').val(c.y);
                             $('#w').val(c.w);
                             $('#h').val(c.h);

                             $('#x2').val(c.x2);
                             $('#y2').val(c.y2);

                            var rx = 150 / c.w; // 150 - размер окна предварительного просмотра
                            var ry = 150 / c.h;

                            $('#preview').css({
                                width: Math.round(rx * imageWidth) + 'px',
                                height: Math.round(ry * imageHeight) + 'px',
                                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                                marginTop: '-' + Math.round(ry * c.y) + 'px'
                            });
                        };
                    });

                },
                close: function (event, ui) {
                    $state.go('profile');

                    $('.preview-container').addClass('hidden');

                    $('.ui-dialog').each(function(){
                        if($(this).attr('aria-describedby') == 'dialog-message'){
                            $(this).detach();
                        }
                    });
                }
            });
        }
    })
    .controller('MapsController',function($rootScope) {
        var maps = this;

        $rootScope.currentPage = "maps";
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.pageTitle = "Карты";

        resetPages($rootScope.base);
        $rootScope.base.mapsIsActive = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.mapsBtnStatus = "active";

        $rootScope.base.mapsLoadStatus = "isLoaded";

        showGroupOverBuilding($rootScope.groups);
        //$rootScope.groups[0].isShow = false;
        //$rootScope.groups[1].selected = true;

        if($rootScope.currentGroup.id == $rootScope.groups[0].id){
            $rootScope.currentGroup = $rootScope.groups[1];
        }

        $rootScope.base.isFooterBottom = true;

        maps.url = userClient.getGroupMap($rootScope.currentGroup.id,MAP_COLOR);

        $rootScope.mapsChangeGroup = function(groupId){
             maps.url = userClient.getGroupMap(groupId,MAP_COLOR);
        };
        $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));
    })
    .controller('SetInfoController',function($rootScope) {

        var save = function(){

        };

    });
    /*.controller('BlogController',function($state,$rootScope) {
        var blog = this;

    });*/


/* const */
var TEXT_DEFAULT_1 = "Написать сообщение";
var TEXT_DEFAULT_2 = "Ваш ответ";
var TEXT_DEFAULT_3 = "Сообщение";
var TEXT_DEFAULT_4 = "Заголовок";

var MAP_COLOR = "6FB3E040";

var TEXTAREA_DEFAULT_HEIGHT = 54;

/* functions */

var transport = new Thrift.Transport("/thrift/MessageService");
var protocol = new Thrift.Protocol(transport);
var messageClient = new com.vmesteonline.be.thrift.thrift.messageservice.MessageServiceClient(protocol);

transport = new Thrift.Transport("/thrift/DialogService");
protocol = new Thrift.Protocol(transport);
var dialogClient = new com.vmesteonline.be.thrift.thrift.messageservice.DialogServiceClient(protocol);

transport = new Thrift.Transport("/thrift/UserService");
protocol = new Thrift.Protocol(transport);
var userClient = new com.vmesteonline.be.thrift.thrift.userservice.UserServiceClient(protocol);

var userClientGroups = userClient.getUserGroups();
var shortUserInfo = userClient.getShortUserInfo();

transport = new Thrift.Transport("/thrift/AuthService");
protocol = new Thrift.Protocol(transport);
var authClient = new com.vmesteonline.be.thrift.thrift.authservice.AuthServiceClient(protocol);

transport = new Thrift.Transport("/thrift/fs");
protocol = new Thrift.Protocol(transport);
var fileClient = new com.vmesteonline.be.thrift.thrift.fileservice.FileServiceClient(protocol);

function withTags(str){
    var result = str.replace(/&#10;/g,'<br>' ); // пробел после <br> специально, чтобы не слипался с ссылками
    result = result.replace(/\n/g,'<br>');
        /*var strArr = result.split(" "),

        len = strArr.length,
        tempStr;

    result = "";
    for(var i = 0; i < len; i++){
        if(strArr[i].indexOf("http://") != -1 || strArr[i].indexOf("https://") != -1){
            //tempStr = "<a href='"+ strArr[i] +"' target='_blank'>"+strArr[i]+"</a>";
            tempStr = strArr[i].link(strArr[i]);

            strArr[i] = tempStr;
        }

        result += strArr[i]+" ";
    }*/


   return result;

}
function withoutTags(str){
    var result = str.replace(/<br>/g,'\n');
        result = result.replace(/<[^>]+>/g,'');
    return result;
}
function getStrFromHTMLCode(str){
    //alert(str);
    var strArr = str.split(';'),
    len = strArr.length,
        symb = [], counter = 0,result = "";


    for(var i = 0; i < len; i++){
        var strArr2 = strArr[i].split(" "),
            len2 = strArr2.length;

        if(len2 == 1) {
            if (strArr2[0].indexOf('&') != -1) {
                //alert(strArr2[0].substr(-4) == '&#10');
                if(strArr2[0].substr(-4) != '&#10'){
                    symb[counter] = String.fromCharCode(strArr2[0].substring(2));
                    //alert("0 "+strArr2[0].substring(2)+" "+String.fromCharCode(strArr2[0].substring(2))+" "+symb[counter]);
                }else{
                    symb[counter] = strArr2[0].substring(0,strArr2[0].length-4)+'\n';
                    //alert("1 "+strArr2[0].substring(2)+" "+String.fromCharCode(strArr2[0].substring(2))+" "+symb[counter]);
                }
            } else {
                symb[counter] = strArr[i];
            }
            result += symb[counter++];
        }else{
            for(var j = 0; j < len2; j++){
                if (strArr2[j].indexOf('&') != -1) {
                    if(strArr2[0].substr(-4) != '&#10'){
                        symb[counter] = String.fromCharCode(strArr2[j].substring(2));
                    }else{
                        symb[counter] = strArr2[j].substring(0,strArr2[j].length-4)+'\n';
                    }
                } else {
                    symb[counter] = strArr2[j];
                }
                (j == len2-1) ? result += symb[counter++] : result += symb[counter++]+" ";
            }
        }
    }

    //return symb.join('');
    return result;
}
function getDefaultGroup(groups){
    var len = groups.length;
    for(var i = 0; i < len;i++){
        if(groups[i].type == 3) return groups[i];
    }

    return groups[0];
}

function showGroupOverBuilding(groups,currentGroup){
    var len = groups.length;
    for(var i = 0; i < len; i++){
        if(groups[i].type < 4) {
            groups[i].isShow = false;
        } //4 = BUILDING
    }
}
function getBuildingGroup(currentGroup) {
    var len = userClientGroups.length,
        group;
    if (currentGroup.type < 4){
        for (var j = 0; j < len; j++) {
            if (userClientGroups[j].type == 4) {
                group = userClientGroups[j];
            }
        }
        return group;
    }else{
        return currentGroup;
    }

}

function getCorrectDate(str){
    var arrDate = str.split(/[./]/),
        month = arrDate[1],
        monthStr;

    switch(month){
        case "01":
            monthStr = "Jan";
            break;
        case "02":
            monthStr = "Feb";
            break;
        case "03":
            monthStr = "Mar";
            break;
        case "04":
            monthStr = "Apr";
            break;
        case "05":
            monthStr = "May";
            break;
        case "06":
            monthStr = "June";
            break;
        case "07":
            monthStr = "July";
            break;
        case "08":
            monthStr = "Aug";
            break;
        case "09":
            monthStr = "Sep";
            break;
        case "10":
            monthStr = "Oct";
            break;
        case "11":
            monthStr = "Nov";
            break;
        case "12":
            monthStr = "Dec";
            break;
    }

    return arrDate[0]+" "+ monthStr +" "+arrDate[2];

}

function resetPages(base){
    base.neighboursIsActive = false;
    base.privateMessagesIsActive = false;
    base.mapsIsActive = false;
    base.profileIsActive = false;
    base.settingsIsActive = false;
    base.talksIsActive = false;
    base.lentaIsActive = false;
    base.advertsIsActive = false;
}
function resetAceNavBtns(navbar){
    navbar.neighboursBtnStatus = "";
    navbar.privateMessagesBtnStatus = "";
    navbar.mapsBtnStatus = "";
}
function initAttachImage(selector,attachAreaSelector){
    var title;
    // на случай если будет прикрепляться не файл
    docsBase64[attachAreaSelector] = [];
    docsInd[attachAreaSelector] = 0;

    selector.ace_file_input({
        style:'well',
        btn_choose:'Изображение',
        btn_change:null,
        no_icon:'',
        droppable:true,
        thumbnail: 'large',
        icon_remove:null,
        before_change: function(files, dropped){
            title = $(this).find('+.file-label').data('title');
            return true;
        }
    }).on('change', function(){
        var fileLabel = $(this).find('+.file-label');
        fileLabel.attr('data-title',title).removeClass('hide-placeholder');
        fileLabel.find('.file-name').hide();

        var type = selector[0].files[0].type;

        if(type.indexOf('image') != -1) {
            //если картинка
            attachAreaSelector.find('.loading').removeClass('hidden');


            var myArea = attachAreaSelector;
            if(attachAreaSelector.selector.indexOf('doc-area') != -1)
                myArea = $(attachAreaSelector.selector.replace('doc-area','area'));

            setTimeout(copyImage, 200,myArea,fileLabel,type);
        }else{
            // если другой файл

            var myArea = attachAreaSelector;
            if(attachAreaSelector.selector.indexOf('doc-area') == -1)
                myArea = $(attachAreaSelector.selector.replace('area','doc-area'));

            setTimeout(insertDoc,200,selector,myArea,fileLabel);

        }

    });
}

var docsBase64 = [],
    docsInd = [];
function initAttachDoc(selector,attachAreaSelector){
    var title;
        docsBase64[attachAreaSelector] = [];
        docsInd[attachAreaSelector] = 0;

    selector.ace_file_input({
        style:'well',
        btn_choose:'Документ',
        btn_change:null,
        no_icon:'',
        droppable:true,
        thumbnail: 'large',
        icon_remove:null,
        before_change: function(files, dropped){
            title = $(this).find('+.file-label').data('title');
            return true;
        }
    }).on('change', function(){
        var fileLabel = $(this).find('+.file-label');
        fileLabel.attr('data-title',title).removeClass('hide-placeholder');
        fileLabel.find('.file-name').hide();

        //setTimeout(insertDoc,200,selector,attachAreaSelector,fileLabel);

        var type = selector[0].files[0].type;

        if(type.indexOf('image') != -1) {
            //если картинка
            attachAreaSelector.find('.loading').removeClass('hidden');

            var myArea = attachAreaSelector;
            if(attachAreaSelector.selector.indexOf('doc-area') != -1)
                myArea = $(attachAreaSelector.selector.replace('doc-area','area'));

            setTimeout(copyImage, 200,myArea,fileLabel,type);
        }else{
            // если другой файл

            var myArea = attachAreaSelector;
            if(attachAreaSelector.selector.indexOf('doc-area') == -1)
                myArea = $(attachAreaSelector.selector.replace('area','doc-area'));

            setTimeout(insertDoc,200,selector,myArea,fileLabel);
        }

    });
}

function copyImage(attachAreaSelector,fileLabel,type) {
    var copyImgSrc = fileLabel.find('.file-name img').css('background-image');

    if (copyImgSrc == 'none' || !copyImgSrc) {
        setTimeout(copyImage, 200,attachAreaSelector,fileLabel,type);
    } else {
        var url = fileClient.saveFileContent(copyImgSrc, true),
            fileName = fileLabel.find('.file-name').attr('data-title');

        attachAreaSelector.find('.loading').addClass('hidden');

        attachAreaSelector.find('.loading').before("<span class='attach-item new-attached'>" +
            "<a href='#' title='Не прикреплять' class='remove-attach-img'>&times;</a>" +
            "<img data-title='" + fileName + "' data-type='" + type + "' class='attached-img' style='background-image:url(" + url + ")'></span>");

        $('.new-attached .remove-attach-img').click(function (e) {
            e.preventDefault();
            $(this).closest('.attach-item').hide().detach();
            fileClient.deleteFile(url);
        });

        $('.new-attached').removeClass('new-attached');
    }
}

function insertDoc(selector,attachAreaSelector,fileLabel) {
    var docName = fileLabel.find('.file-name').attr('data-title');

    var reader = new FileReader();
    reader.readAsBinaryString(selector[0].files[0]);
    var dataType = selector[0].files[0].type;

    reader.onload = function(e){
        docsBase64[attachAreaSelector][docsInd[attachAreaSelector]] = new com.vmesteonline.be.thrift.thrift.messageservice.Attach();
        docsBase64[attachAreaSelector][docsInd[attachAreaSelector]].fileName = docName;
        docsBase64[attachAreaSelector][docsInd[attachAreaSelector]].contentType = dataType;
        var url = docsBase64[attachAreaSelector][docsInd[attachAreaSelector]].URL = fileClient.saveFileContent(base64encode(reader.result));
        docsInd[attachAreaSelector]++;

        attachAreaSelector.append("<span class='attach-item new-attached' data-href='"+ url +"' data-type='"+ dataType +"'>" +
            "<a href='#' title='Не прикреплять' class='remove-attach-img'>&times;</a>" +
            '<span>'+docName+'</span>'+
            "</span>");

        $('.new-attached .remove-attach-img').click(function(e){
            e.preventDefault();
            var attachItem = $(this).closest('.attach-item');
            var ind = attachItem.index();
            attachItem.hide().detach();
            docsBase64[attachAreaSelector].splice(ind,1);
            fileClient.deleteFile(url);
        });

        $('.new-attached').removeClass('new-attached');
    };


}

function selectGroupInDropdown(groupId){
    var groupsLength = userClientGroups.length,
        selectedGroup;
    for(var i = 0; i < groupsLength; i++){
        if(groupId == userClientGroups[i].id){
            selectedGroup = userClientGroups[i];
        }
    }
    return selectedGroup;
}
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
        //timing = timing.getMinutes()+" мин назад";
        timing = (timing/minute).toFixed(0)+" мин назад";
    }else if(timing < day){
        timing = new Date(timing);
        //timeTemp = timing.getHours();
        timeTemp = (timing/hour).toFixed(0);

        if(timeTemp == 1 || timeTemp == 0){
            timing = "1 час назад";
        }else if(timeTemp > 1 && timeTemp < 5){
            timing = timeTemp + " часа назад";
        }else{
            timing = timeTemp + " часов назад";
        }
    }else if(timing < threeDays){
        timing = new Date(timing);
        //timeTemp = timing.getDate();
        timeTemp = (timing/day).toFixed(0);
        if(timeTemp == 1){
            timing = timeTemp+" день назад";
        }else{
            timing = timeTemp+" дня назад";
        }
    }else{
        timeTemp = new Date(messageObjDate*1000).toLocaleDateString();

        var arr = timeTemp.split(/[./]/);
        if(arr[0].length == 1) arr[0] = "0"+arr[0];
        if(arr[1].length == 1) arr[1] = "0"+arr[1];
        timing = arr[0]+"."+arr[1]+"."+arr[2];
    }

    return timing;
}

function getLabel(groupsArray,groupType){
    var groupsArrayLen = groupsArray.length;
    var label="";
    for(var i = 0; i < groupsArrayLen; i++){

        if(groupsArray[i].type == groupType){
            label = groupsArray[i].visibleName;
        }
    }

    return label;
}
function getAuthorName(userInfo){
    var userInf = userInfo;
    if(!userInfo){
        userInf = shortUserInfo;
    }

    return userInf.firstName+" "+userInf.lastName;
}
function getTagColor(labelName){
    var color,
        len = userClientGroups.length;

    for(var i = 0; i < len; i++){
        if(labelName == userClientGroups[i].visibleName){
            if(i == 0){
                color = 'label-pink';
            }else if(i == 1){
                color = 'label-success';
            }else if(i == 2){
                color = 'label-yellow';
            }else if(i == 3){
                color = 'label-purple';
            }
        }
    }
    /*switch(labelName){
        case userClientGroups[0].visibleName:
            color = 'label-pink';
            break;
        case userClientGroups[1].visibleName:
            color = 'label-success';
            break;
        case userClientGroups[2].visibleName:
            color = 'label-yellow';
            break;
        default :
            break;
    }*/
    return color;
}

function postTopic(obj,isWall,isAdverts,$filter){
    if(obj.id){
        // значит редактирование
        if (obj.isPollShow) {
            // с опросом
            if(obj.poll && obj.poll.pollId){
                // редактирование опроса
                obj.poll.subject = obj.pollSubject;
                obj.poll.names = [];

                setPoll(obj.poll,obj.pollInputs);

            }else{
                // создание опроса
                poll = new com.vmesteonline.be.thrift.thrift.messageservice.Poll();
                poll.pollId = 0;
                poll.editNames = [];
                poll.names = [];
                poll.subject = obj.pollSubject;
                poll.alreadyPoll = false;

                setPoll(poll,obj.pollInputs);

                obj.poll = poll;
                obj.metaType = "poll";
            }
        }else{
            obj.poll = null;
        }

        obj.message.images = obj.attachedImages;
        obj.message.documents = obj.attachedDocs;
        obj.message.groupId = obj.selectedGroup.id;
        //obj.message.content = withTags(obj.message.content);

        obj.message.content = $filter('linky')(obj.message.content, 'blank');
        obj.message.content = withTags(obj.message.content);

        obj.label = getLabel(userClientGroups,obj.selectedGroup.type);
        obj.tagColor = getTagColor(obj.label);

        var newTopic = messageClient.postTopic(obj);
    }else {
        // значит создание

        var messageType,
            messageContent,
            subject;
        if (isWall) {
            messageType = 5; // wall
            messageContent = obj.message.content;
            obj.message.content = TEXT_DEFAULT_1;
            subject = "";
        } else {
            if (!isAdverts) {
                messageType = 1; // talks
            } else {
                messageType = 6; // adverts
            }
            messageContent = obj.message.content;
            obj.message.content = TEXT_DEFAULT_3;
            subject = obj.subject;

        }
        //console.log(messageContent + " " + messageType + " " + subject);

        newTopic = new com.vmesteonline.be.thrift.thrift.messageservice.Topic();
        newTopic.message = new com.vmesteonline.be.thrift.thrift.messageservice.Message();
        newTopic.message.groupId = obj.selectedGroup.id;
        newTopic.message.type = messageType;

        messageContent = $filter('linky')(messageContent, 'blank');
        newTopic.message.content = withTags(messageContent);

        newTopic.message.images = obj.attachedImages;
        newTopic.message.documents = obj.attachedDocs;
        newTopic.message.id = 0;
        newTopic.message.created = Date.parse(new Date()) / 1000;

        newTopic.subject = subject;
        newTopic.id = 0;
        newTopic.metaType = "message";
        newTopic.messageNum = 0;

        if (obj.id) {
            // значит редактирование
            newTopic.id = obj.id;
            newTopic.message.id = obj.message.id;
        }

        var poll;
        if (obj.isPollShow) {
            poll = new com.vmesteonline.be.thrift.thrift.messageservice.Poll();
            poll.pollId = 0;
            poll.editNames = [];
            poll.names = [];
            poll.subject = obj.pollSubject;
            poll.alreadyPoll = false;

            setPoll(poll,obj.pollInputs);

            newTopic.poll = poll;
            newTopic.metaType = "poll";
        }

        //alert(newTopic.message.content);
        var tempTopic = messageClient.postTopic(newTopic);
        newTopic.id = tempTopic.id;
        newTopic.message.images = tempTopic.message.images;
        newTopic.message.documents = tempTopic.message.documents;
        newTopic.userInfo = tempTopic.userInfo;

        if (obj.isPollShow) {
            newTopic.poll.pollId = tempTopic.poll.pollId;
            obj.isPollShow = false;
            obj.pollSubject = "";
            obj.isPollAvailable = true;
        }
        if (isWall) {
            newTopic.message.createdEdit = getTiming(newTopic.message.created);
        } else {
            newTopic.lastUpdateEdit = getTiming(newTopic.message.created);
        }

    }

    return newTopic;

}

function postMessage(obj,isWall,isFirstLevel,$filter){
    if((obj.id && obj.isEdit) || (obj.message && obj.message.isEdit)){
        // значит редактирование

        var message;
        if(obj.message && obj.message.isEdit){
            message = obj.message;
            message.content = obj.commentText;
        }else{
            obj.content = obj.commentText;
            message = obj;
        }

        var attachId;
        if(!obj.id || isFirstLevel){
            attachId = obj.topicId+"-"+obj.messageId;
        }else{
            attachId = obj.id;
        }

        message.images = getAttachedImages($('#attach-area-edit-' + attachId));
        message.documents = getAttachedDocs($('#attach-doc-area-edit-' + attachId),true);

        if (message.content == "" && message.images.length == 0 && (message.documents === undefined || message.documents.length == 0)) {

            return 0;

        }else {
            try {
                // try на случай если топик был удален создателем, а юзер пытается
                // его комментировать

                message.content = $filter('linky')(message.content,'blank');
                message.content = withTags(message.content);

                var newMessage = messageClient.postMessage(message);
            }catch(e){
                document.location.replace('/');
            }

            cleanAttached($('#attach-area-edit-' + attachId));
            cleanAttached($('#attach-doc-area-edit-' + attachId));

            obj.isEdit = false;

            return newMessage;
        }

    }else {
        // значит создание
        var message = new com.vmesteonline.be.thrift.thrift.messageservice.Message(),
            attachId, isEmptyText = false;

        if (isWall) {
            message.type = com.vmesteonline.be.thrift.thrift.messageservice.MessageType.WALL;//5;
            attachId = message.topicId = obj.topic.id;
            message.groupId = obj.groupId;
            message.content = obj.commentText;
            message.parentId = 0;
            isEmptyText = (obj.commentText == TEXT_DEFAULT_2 || obj.commentText == "");
        } else {
            message.type = com.vmesteonline.be.thrift.thrift.messageservice.MessageType.BASE;//1;
            attachId = message.topicId = obj.topicId;
            message.groupId = obj.selectedGroup.id;

            if (isFirstLevel) {
                //message.content = obj.answerFirstMessage;
                message.content = obj.commentText;
                message.parentId = 0;
            } else {
                message.content = obj.commentText;
                message.parentId = obj.parentId;
                attachId = attachId + "-" + obj.messageId;
            }

            isEmptyText = (message.content == TEXT_DEFAULT_2 || message.content == "" || message.content === undefined);
        }

        message.id = 0;
        message.images = getAttachedImages($('#attach-area-' + attachId));

        message.documents = getAttachedDocs($('#attach-doc-area-' + attachId));
        /*for(var p in message.documents[0]){
         alert(p+" "+message.documents[0][p]);
         }*/
        cleanAttached($('#attach-area-' + attachId));
        cleanAttached($('#attach-doc-area-' + attachId));
        //message.images = obj.attachedImages;
        message.created = Date.parse(new Date) / 1000;

        if (isEmptyText && message.images.length == 0 && (message.documents === undefined || message.documents.length == 0)) {

            return 0;

        } else {
            if (message.content == TEXT_DEFAULT_2 && (message.images.length != 0 || message.documents.length != 0)) {
                message.content = "";
            }

            message.content = $filter('linky')(message.content,'blank');
            message.content = withTags(message.content);

            try {
                newMessage = messageClient.postMessage(message);
            }catch(e){
                document.location.replace('/');
            }

            obj.commentText = TEXT_DEFAULT_2;
            message.createdEdit = getTiming(newMessage.created);
            console.log(newMessage.created);
            message.authorName = getAuthorName();
            message.userInfo = newMessage.userInfo;
            message.images = newMessage.images;
            message.documents = newMessage.documents;
            message.id = newMessage.id;

            return message;
        }
    }
}

function setPollEditNames(poll){
    // obj.wallItems[i].topic
    poll.editNames = [];
    var namesLength,
        amount = 0,
        votersNum = 0,
        votersPercent = 0;
    poll.names ?
        namesLength = poll.names.length:
        namesLength = 0;
    //console.log(poll.alreadyPoll);

    // нужно знать полный amount для вычисления процентной длины
    for(var j = 0; j < namesLength; j++){
        if(poll && poll.values && poll.values[j]) {
            amount += poll.values[j];
        }
    }

    for(var j = 0; j < namesLength; j++){
        if(poll && poll.values && poll.values[j]) {
            votersNum = poll.values[j];
            votersPercent = votersNum*100/amount;
        }else{
            votersNum = votersPercent = 0;
        }

        poll.editNames[j] = {
            id : j,
            value: 0,
            name : poll.names[j],
            votersNum : votersNum,
            votersPercent: votersPercent.toFixed(1)+"%"
        };

    }
    poll.amount = amount;
}

function setPoll(poll,pollInputs){
    var counterForPoll = 0,
        pollInputsLength = pollInputs.length;

    for (var i = 0; i < pollInputsLength; i++) {
        if (pollInputs[i].name != "") {
            poll.names[counterForPoll] = pollInputs[i].name;
            poll.editNames[counterForPoll] = {
                id: counterForPoll++,
                name: pollInputs[i].name
            };
        }
    }

}

function getAttachedImages(selector){
    var imgList = [], ind = 0;

    selector.find('.attach-item').each(function(){
        //значит картинка
        var bgImg = $(this).find('img').css('background-image'),
            name = $(this).find('img').attr('data-title'),
            type = $(this).find('img').attr('data-type'),
            result,content;

        var i = bgImg.indexOf('base64,');
        content = bgImg.slice(4,bgImg.length-1);

        result = new com.vmesteonline.be.thrift.thrift.messageservice.Attach();
        result.fileName = name;
        result.contentType = type;

        var indexFile = content.indexOf('/file');
        content = content.substring(indexFile);

        result.URL = content;
        //console.log(content);
        //result = 'obj(name:'+ base64encode(name) +';data:'+ type +';content:'+content+")";

        imgList[ind++] = result;

    });

    return imgList;
}
function getAttachedDocs(selector,isEdit){
    if(isEdit){
        var docList = [], ind = 0;
        docsBase64[selector] = [];

        selector.find('.attach-item').each(function(){
            docsBase64[selector][ind] = new com.vmesteonline.be.thrift.thrift.messageservice.Attach();
            docsBase64[selector][ind].fileName = $(this).find('span').text();
            docsBase64[selector][ind].contentType = $(this).attr('data-type');
            docsBase64[selector][ind].URL = $(this).attr('data-href');

            ind++;
        });
    }

        return docsBase64[selector];


}
function cleanAttached(selector){
    //selector.html('').append('<div class="loading hidden"><img src="i/loading2.gif"></div>');
    selector.find('.attach-item').detach();
    //docsBase64 = [];
    docsInd[selector] = 0;
    docsBase64[selector] = [];
}

function initFancyBox(selector){
    selector.find(".fancybox").fancybox();
}
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = new obj.constructor();
    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}
function base64encode(str) {
    // Символы для base64-преобразования
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg'+
        'hijklmnopqrstuvwxyz0123456789+/=';
    var b64encoded = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;

    for (var i=0; i<str.length;) {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

        enc3 = isNaN(chr2) ? 64:(((chr2 & 15) << 2) | (chr3 >> 6));
        enc4 = isNaN(chr3) ? 64:(chr3 & 63);

        b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) +
            b64chars.charAt(enc3) + b64chars.charAt(enc4);
    }
    return b64encoded;
}

$.widget( "custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function( ul, items ) {
        var that = this,
            currentCategory = "";
        $.each( items, function( index, item ) {
            if ( item.category != currentCategory ) {
                ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                currentCategory = item.category;
            }
            that._renderItemData( ul, item );
        });
    }
});

bootbox.setDefaults({locale: "ru"});

