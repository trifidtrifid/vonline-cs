
forumControllers.controller('MapsController',function($rootScope) {
        var maps = this;

        $rootScope.currentPage = "maps";
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.pageTitle = "Карты";

        resetPages($rootScope.base);
        $rootScope.base.mapsIsActive = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.mapsBtnStatus = "active";

        $rootScope.base.mapsLoadStatus = "isLoaded";

        showGroupOverBuilding($rootScope.groups);
        //$rootScope.groups[0].isShow = false;
        //$rootScope.groups[1].selected = true;

        if($rootScope.currentGroup.id == $rootScope.groups[0].id){
            $rootScope.currentGroup = $rootScope.groups[1];
        }

        $rootScope.base.isFooterBottom = true;

        var yaMap;
        maps.afterMapInit=function(nMap){
            yaMap = nMap;
        };

        maps.color = MAP_COLOR;

        //maps.url = userClient.getGroupMap($rootScope.currentGroup.id,MAP_COLOR);

        var location = userClient.getGroupView($rootScope.currentGroup.id);

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
            var location = userClient.getGroupView(groupId);

            setMap(location);
        };
        $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));
    })