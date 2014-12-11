
forumControllers.controller('UnconfirmedCtrl', function($rootScope) {
    console.log("---");
    $rootScope.base.isFooterBottom = true;
    $rootScope.base.mainContentTopIsHide = true;
    $rootScope.base.hideSidebar = true;

    var ctrl = this;
    ctrl.user = userClient.getShortUserInfo();
    console.log("111 "+ctrl.user.address);

    ctrl.unconfLogin = function(){
        var userLocation = authClient.checkInviteCode(ctrl.code);

        //authClient.registerNewUser(user.firstName, user.lastName, user.pass, user.email, code, gender);

    };

    angular.element($('.unconfirm')).css({'min-height': $(window).height()-105});

    $('.ng-cloak').removeClass('ng-cloak');

});