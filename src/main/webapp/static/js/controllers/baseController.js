var forumControllers = angular.module('forum.controllers', ['ui.select2','infinite-scroll','ngSanitize','yaMap','ui.bootstrap']);

forumControllers.controller('baseController',function($scope,$rootScope,$state,$filter,$location) {

    $rootScope.isTopSearchShow = true;
        var base = this;
        base.url = $location.url();
        base.neighboursLoadStatus = "";
        base.privateMessagesLoadStatus = "";
        base.profileLoadStatus = "";
        base.settingsLoadStatus = "";
        base.mapsLoadStatus = "";

    $scope.$on('$locationChangeSuccess', function($event,newState,oldState){
        //console.log(newState,oldState);
        if (newState.indexOf('blog') == -1) base.url = $location.url();
    });

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
            base.isLentaFocus = false;
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
                        message.content = deleteResult.content;
                    }
                    catch (e) {
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

        base.bufferSelectedGroup = userClientGroups[3];

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
                    initAttachImage($('#attachImage-edit-' + ctrlId), $('#attach-area-edit-' + ctrlId)); // ��� ����� ��������
                    initAttachDoc($('#attachDoc-edit-' + ctrlId), $('#attach-doc-area-edit-' + ctrlId), isEdit);
                } else {
                    setTimeout(pollAttach, 200, ctrlId,true);
                }
            }else{
                if ($('#attachImage-' + ctrlId).length) {
                    initAttachImage($('#attachImage-'+ctrlId), $('#attach-area-' + ctrlId)); // ��� ����� ��������
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
                message = postMessageMy(wallItem, isWall,false,$filter);

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
                newMessage = postMessageMy(talk,isWall,isFirstLevel,$filter);

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

            newMessage = postMessageMy(talk,isWall,isFirstLevel,$filter);

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

                    var newDialogMessage = new com.vmesteonline.be.thrift.messageservice.DialogMessage();

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
        $rootScope.newMessages = [];
        $rootScope.newImportantCount = 0;

        var timeStamp = 0;
        base.checkUpdates = function(){
            try {
                timeStamp = messageClient.checkUpdates(timeStamp);
            }catch(e){
                document.location.replace('/login');
                //document.location.replace('login.jsp');
            }

            var updateMap,
                old = 0;

            console.log('timestemp '+timeStamp);

            if(timeStamp == 0){
                updateMap = messageClient.getDialogUpdates();
                var temp = 0,
                    currentDialogId = $rootScope.base.currentDialogId,
                    counter = 0;

                $rootScope.newMessages = [];

                for(var dialogId in updateMap){
                    $rootScope.newMessages[counter++] = {
                        dialogId : dialogId,
                        count : updateMap[dialogId]
                    };
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

            }else if(timeStamp == 1){
                // notification
                $rootScope.newMessages = [];
                base.me.notificationIsShow = true;
                base.me.userNotification = messageClient.getMulticastMessage();

            }else if(timeStamp >= 2 && timeStamp < 10000){
                // important messages
                console.log('important '+timeStamp);
                $rootScope.newMessages = [];
                $rootScope.newImportantCount = timeStamp;

                $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);

            }else{
                $rootScope.newMessages = [];
                $rootScope.newImportantCount = 0;
            }

        };

        setInterval(base.checkUpdates,5000);

        base.nextNotification = function(){
            base.me.userNotification = messageClient.getNextMulticastMessage();
            if(!base.me.userNotification){
                base.me.notificationIsShow = false;
            }
        };

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

        base.isLentaFocus = false;

        $rootScope.base = base;
        base.checkUpdates();

        $rootScope.currentPage = 'lenta';

        $rootScope.leftbar = {};

    });