
var navbarCtrl = function($rootScope,$c) {

        this.privateMessagesBtnStatus = "";
        $rootScope.navbar = this;

        this.logout = function(event){
            event.preventDefault();

            localStorage.removeItem('groupId');
            localStorage.removeItem('VO_is_business');
            $c.authClient.logout();

            document.location.replace("/login");

        };

        //$('.ng-cloak').removeClass('ng-cloak');

  };

module.exports = [ '$rootScope','$c', navbarCtrl ];