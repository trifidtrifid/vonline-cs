
forumControllers.controller('contactsCtrl', function($rootScope) {
    var ctrl = this;

    $rootScope.base.isFooterBottom = true;

    ctrl.isAuth = authClient.checkIfAuthorized();

    if (ctrl.isAuth){
        ctrl.user = userClient.getShortUserInfo();
        ctrl.user_name = ctrl.user.firstName+" "+ctrl.user.lastName;
        ctrl.contacts = userClient.getUserContacts();
    }

    ctrl.send = function($event){
        $event.preventDefault();
        var email,name,
            content = ctrl.content;

        if(ctrl.isAuth){
            email = ctrl.contacts.email;
            name = ctrl.user_name;
        }else{
            email = ctrl.email;
            name = ctrl.name;
        }

        messageClient.sendInfoEmail(email,name,content);
        ctrl.isSend = true;
        ctrl.content = "";
        //console.log(email,name,content);
    };

    var oldTextLength = 0;

    $('.content').keyup(function(event) {

        var el = event.target,
            clientHeight = el.clientHeight,
            scrollHeight = el.scrollHeight,
            textLength = el.textLength,
            clientWidth = el.clientWidth,
            textLengthPX, newHeight, removeRowCount,
            defaultHeight, newRowCount;

        defaultHeight = 100;

        /*
         Исходные данные:
         На один символ приходится ~8px в ширину
         Высота строки текста ~14px

         * Здесь выполняем такие действия :
         * 1) Считаем длину текста в пикселях
         * 2) Определяем целое количестов строк, которые удалили
         * 3) Определям новую высоту с учетом высоты удаленного текста
         * */

        if (scrollHeight > clientHeight) {

            el.style.height = scrollHeight + 'px';
        } else if (scrollHeight > defaultHeight) {
            textLengthPX = (parseInt(oldTextLength) - textLength) * 8; // 1
            if (textLengthPX > clientWidth) {
                removeRowCount = Math.floor(textLengthPX / clientWidth); // 2
                newHeight = parseInt(event.target.style.height) - removeRowCount * 14; // 3
                newHeight > defaultHeight ? event.target.style.height = newHeight + "px" :
                    event.target.style.height = defaultHeight + 'px';

            } else {
                el.style.height = scrollHeight - 6 + 'px';

            }
        } else {
            el.style.height = defaultHeight + 'px';
        }
        oldTextLength = textLength;


        $('.ng-cloak').removeClass('ng-cloak');
    });

    angular.element($('.coming-soon')).css({'min-height': $(window).height()-105});

    $('.ng-cloak').removeClass('ng-cloak');

});