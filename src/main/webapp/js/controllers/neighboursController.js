
forumControllers.controller('neighboursController',function($rootScope,$state) {
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