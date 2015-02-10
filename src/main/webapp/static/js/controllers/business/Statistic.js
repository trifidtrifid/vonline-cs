
forumControllers.controller('Statistic',function($rootScope) {

    var maps = this,
        businessDescription;

    ($rootScope.businessDescription) ?
    businessDescription = $rootScope.businessDescription :
    businessDescription = businessClient.getMyBusinessInfo() ;

    var yaMap;
    maps.afterMapInit=function(nMap){
        yaMap = nMap;
    };

    //var location = userClient.getGroupView(groupId);
    maps.center = [businessDescription.longitude,businessDescription.latitude];
    maps.zoom = 16;
    maps.radius = businessDescription.radius;
    maps.color = MAP_COLOR;

    maps.baloon = {
        geometry: {
            type: 'Point',
            coordinates: maps.center
        },
        // Свойства
        properties: {
            hintContent: "Я здесь"
        }
    };

});