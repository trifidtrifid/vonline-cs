
forumControllers.controller('navbarController', function($rootScope) {

        this.privateMessagesBtnStatus = "";
        $rootScope.navbar = this;

        this.logout = function(event){
            event.preventDefault();

            localStorage.removeItem('groupId');
            localStorage.removeItem('VO_is_business');
            authClient.logout();

            document.location.replace("/login");

        };

        //$('.ng-cloak').removeClass('ng-cloak');

  })