
var dialogCtrl = function($rootScope,$stateParams,$state,$c) {

        $c.initFancyBox($('.dialog'));
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.isFooterBottom = false;
        $rootScope.base.lastLoadedId = 0;
        $rootScope.currentPage = 'dialog-single';
        $rootScope.base.currentDialogId = $stateParams.dialogId;
        $rootScope.currentRubric = null;

        var dialog = this,
            lastLoadedId = 0,
            loadedLength = 20;

        try {
            var currentDialog = $c.dialogClient.getDialogById($stateParams.dialogId);

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

            //dialog.messageText = $c.TEXT_DEFAULT_1;
            $rootScope.base.initStartParamsForCreateMessage(dialog);

        }catch(e){
            $state.go('dialogs');
        }

        var lastLoadedIdFF;
        dialog.addMoreItems = function(){
            var buff = $c.dialogClient.getDialogMessages($stateParams.dialogId,0,loadedLength,$rootScope.base.lastLoadedId);
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        for (var i = 0; i < buffLength; i++) {
                            buff[i].authorProfile = $c.userClient.getUserProfile(buff[i].author);
                        }
                        dialog.privateMessages =
                            $rootScope.base.privateMessages = $rootScope.base.privateMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;
                }
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$stateParams','$state','$c', dialogCtrl ];