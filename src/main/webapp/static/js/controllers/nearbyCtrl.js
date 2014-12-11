
forumControllers.controller('nearbyCtrl', function($rootScope) {
    var nearby = this;

    nearby.attachId = "000000";
    $rootScope.setTab(5);
    $rootScope.base.showAllGroups();
    $rootScope.base.isFooterBottom = false;
    showGroupOverBuilding($rootScope.groups);

    initFancyBox($('.nearby'));

    $rootScope.base.createTopicIsHide = true;
    nearby.isNearbyLoaded = false;
    nearby.groups = userClientGroups;

    nearby.isTalk = true;
    nearby.isAdvert = true;

    nearby.message = {};
    nearby.message.content = nearby.message.default = TEXT_DEFAULT_3;
    nearby.subject = TEXT_DEFAULT_4;

    $rootScope.base.bufferSelectedGroup = nearby.selectedGroup =
        $rootScope.currentGroup = userClientGroups[3];

    $rootScope.base.initStartParamsForCreateTopic(nearby);

    nearby.answerFirstMessage = TEXT_DEFAULT_2;

    nearby.topics = messageClient.getAdverts(nearby.selectedGroup.id, 0, 1000).topics;

    console.log(nearby.topics);

    initNearby();

    if (!nearby.topics) nearby.topics = [];

    $rootScope.selectGroupInDropdown_nearby = function(groupId){
        nearby.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
    };

    function initNearby(){
        var topicLength;
        nearby.topics ? topicLength = nearby.topics.length : topicLength = 0;

        for(var i = 0; i < topicLength;i++){
            nearby.topics[i].lastUpdateEdit = getTiming(nearby.topics[i].lastUpdate);
            nearby.topics[i].label = getLabel(nearby.groups,nearby.topics[i].groupType);
            nearby.topics[i].tagColor = getTagColor(nearby.topics[i].label);
        }
    }

    $rootScope.nearbyChangeGroup = function(groupId){

        nearby.topics = messageClient.getAdverts(groupId,0,1000).topics;

        if(nearby.topics) {
            initNearby();
        }

    };

    $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));

    $('.ng-cloak').removeClass('ng-cloak');


});