
forumControllers.controller('dialogsController', function($rootScope,$state){
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.isFooterBottom = false;
        $rootScope.currentPage = "dialogs";

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

            dialogs.dialogsList[i].newMessagesCount = 0;
            console.log("dialog "+$rootScope.newMessages.length);
            if($rootScope.newMessages.length > 0) {
                var newMessagesLength = $rootScope.newMessages.length;
                for(var j = 0; j < newMessagesLength; j++) {
                    if (dialogs.dialogsList[i].id == $rootScope.newMessages[j].dialogId) {
                        dialogs.dialogsList[i].newMessagesCount = $rootScope.newMessages[j].count;
                    }
                }
            }
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