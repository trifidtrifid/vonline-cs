
var neighboursCtrl = function($rootScope,$state,$c) {
        $rootScope.currentPage = "neighbours";
        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        $c.resetPages($rootScope.base);
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.base.neighboursIsActive = true;

        $c.resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.neighboursBtnStatus = "active";
        $rootScope.base.pageTitle = "";

        $rootScope.currentGroup = $c.userClientGroups[3];

        $rootScope.base.neighboursLoadStatus = "isLoaded";

        var neighbours = this;
        neighbours.neighboors = $c.userClient.getNeighboursByGroup($rootScope.currentGroup.id);

        $rootScope.neighboursChangeGroup = function(groupId){
            neighbours.neighboors = $c.userClient.getNeighboursByGroup(groupId);
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

    };

module.exports = [ '$rootScope','$state','$c', neighboursCtrl ];