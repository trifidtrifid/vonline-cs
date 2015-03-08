
var mapsCtrl = function($rootScope,$c) {
        var maps = this;

        $rootScope.currentPage = "maps";
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.pageTitle = "Карты";

        $c.resetPages($rootScope.base);
        $rootScope.base.mapsIsActive = true;

        $c.resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.mapsBtnStatus = "active";

        $rootScope.base.mapsLoadStatus = "isLoaded";

        $c.showGroupOverBuilding($rootScope.groups);
        //$rootScope.groups[0].isShow = false;
        //$rootScope.groups[1].selected = true;

        /*if($rootScope.currentGroup.id == $rootScope.groups[0].id){
            $rootScope.currentGroup = $rootScope.groups[1];
        }*/
    $rootScope.currentGroup = $c.userClientGroups[3];

        $rootScope.base.isFooterBottom = true;

        var yaMap;
        maps.afterMapInit=function(nMap){
            yaMap = nMap;
        };

        maps.color = $c.MAP_COLOR;

        //maps.url = $c.userClient.getGroupMap($rootScope.currentGroup.id,MAP_COLOR);

        var location = $c.userClient.getGroupView($rootScope.currentGroup.id);

        var setMap = function(location){

            maps.center = [location.longitude,location.latitude];

            if (yaMap) {
                ($rootScope.currentGroup.type == 4) ? yaMap.setZoom(17) : yaMap.setZoom(16); ;
            }else{
                ($rootScope.currentGroup.type == 4) ? maps.zoom = 17 : maps.zoom = 16 ;
            }

            maps.baloon = {
                // Геометрия = тип объекта + географические координаты объекта
                geometry: {
                    // Тип геометрии - точка
                    type: 'Point',
                    // Координаты точки.
                    coordinates: maps.center
                },
                // Свойства
                properties: {
                    hintContent: "Я здесь"
                }
            };

            maps.radius = {
                geometry: {
                    type: 'Circle',
                    coordinates: maps.center,
                    radius: location.radius
                },
                properties: {
                }
            };

        };

        setMap(location);

        $rootScope.mapsChangeGroup = function(groupId){
            var location = $c.userClient.getGroupView(groupId);

            setMap(location);
        };
        //$rootScope.selectGroup($c.getBuildingGroup($rootScope.currentGroup));

        angular.element($('.maps.page')).css({'min-height': $(window).height()-175}); 

    };

module.exports = [ '$rootScope','$c', mapsCtrl ];