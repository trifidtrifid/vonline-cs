
forumControllers.controller('Statistic',function($rootScope) {

    var maps = this;

    var yaMap;
    maps.afterMapInit=function(nMap){
        yaMap = nMap;
    };

    //var location = userClient.getGroupView(groupId);
    //maps.center = [location.longitude,location.latitude];

});