
forumControllers.controller('AdvertsController',function($rootScope) {
        var adverts = this;

        adverts.attachId = "00000";
        $rootScope.setTab(3);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;
        showGroupOverBuilding($rootScope.groups);

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        /*initAttachImage($('#attachImage-00000'), $('#attach-area-00000')); // для обсуждений
        initAttachDoc($('#attachDoc-00000'), $('#attach-doc-area-00000')); // для обсуждений*/
        initFancyBox($('.adverts'));

        $rootScope.base.createTopicIsHide = true;
        adverts.isAdvertsLoaded = false;
        adverts.groups = userClientGroups;

        adverts.isTalk = true;
        adverts.isAdvert = true;

        adverts.message = {};
        adverts.message.content = adverts.message.default = TEXT_DEFAULT_3;
        adverts.subject = TEXT_DEFAULT_4;

        $rootScope.base.initStartParamsForCreateTopic(adverts);

        adverts.answerFirstMessage = TEXT_DEFAULT_2;

        $rootScope.base.bufferSelectedGroup = adverts.selectedGroup = $rootScope.currentGroup;

        adverts.topics = messageClient.getAdverts(adverts.selectedGroup.id, 0, 1000).topics;

        initAdverts();

        if (!adverts.topics) adverts.topics = [];

        $rootScope.selectGroupInDropdown_adverts = function(groupId){
            adverts.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        function initAdverts(){
            var topicLength;
            adverts.topics ? topicLength = adverts.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                adverts.topics[i].lastUpdateEdit = getTiming(adverts.topics[i].lastUpdate);
                adverts.topics[i].label = getLabel(adverts.groups,adverts.topics[i].groupType);
                adverts.topics[i].tagColor = getTagColor(adverts.topics[i].label);
            }
        }

        $rootScope.advertsChangeGroup = function(groupId){

            adverts.topics = messageClient.getAdverts(groupId,0,1000).topics;

            if(adverts.topics) {
                initAdverts();
            }

        };

        $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));

        $('.ng-cloak').removeClass('ng-cloak');

    })