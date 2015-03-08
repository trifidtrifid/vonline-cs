
var unconfirmedCtrl =  function($rootScope,$c) {
    $rootScope.base.isFooterBottom = true;
    $rootScope.base.mainContentTopIsHide = true;
    $rootScope.base.hideSidebar = true;

    var ctrl = this;
    ctrl.user = $c.userClient.getShortUserInfo();
    ctrl.isErrorConfirm = false;

    ctrl.unconfLogin = function(){

        var isConfirm = $c.userClient.confirmUserAddress(ctrl.code);
        console.log(isConfirm);
        if(isConfirm){
            $rootScope.base.me.addressConfirmed = true;
        }else{
            ctrl.isErrorConfirm = true;
        }

    };

    angular.element($('.unconfirm')).css({'min-height': $(window).height()-105});

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope','$c', unconfirmedCtrl ];