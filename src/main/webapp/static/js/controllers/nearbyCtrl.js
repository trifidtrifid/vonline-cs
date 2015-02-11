
forumControllers.controller('nearbyCtrl', function($rootScope) {
    var nearby = this;

    var groupType = com.vmesteonline.be.thrift.GroupType.NEIGHBORS;
    nearby.businessList = businessClient.getBusinessList(groupType,0);

    $rootScope.base.isFooterBottom = true;
    $rootScope.base.pageTitle = "Рядом";
    $rootScope.base.talksIsActive = $rootScope.base.advertsIsActive = false;
    showGroupOverBuilding($rootScope.groups);
    $rootScope.currentRubric = null;

    nearby.isAuth = authClient.checkIfAuthorized();

    if(nearby.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    nearby.posts = messageClient.getBusinessTopics(0,1000);

    if(nearby.posts.topics) {
        var len = nearby.posts.topics.length;
        for (var i = 0; i < len; i++) {
            nearby.posts.topics[i].isCommentShow = false;
            nearby.posts.topics[i].isInputShow = false;
            nearby.posts.topics[i].short = nearby.posts.topics[i].message.content.split(';')[0];
        }
    }

    angular.element($('.nearby')).css({'min-height': $(window).height()-110});

    $('.ng-cloak').removeClass('ng-cloak');

});