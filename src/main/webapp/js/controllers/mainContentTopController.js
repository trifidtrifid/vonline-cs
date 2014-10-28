forumControllers.controller('mainContentTopController',function($rootScope, $state) {

        var topCtrl = this;

        topCtrl.groups = userClientGroups;// ? userClientGroups.reverse() : userClient.getUserGroups().reverse();
        var groups = $rootScope.groups = topCtrl.groups,
            groupsLength = groups.length;

        for(var i = 0; i < groupsLength; i++){
            groups[i].isShow = true;
            if(groups[i].id == $rootScope.currentGroup.id) groups[i].selected = true;
        }

        topCtrl.isSet = function(groupId){
            //return groupId ===
        };

        $rootScope.selectGroup = function(group){
            //var groupId = group.id;

            if(group.id == 0){

                $state.go('set-info');

            }else {

                for (var i = 0; i < groupsLength; i++) {
                    groups[i].selected = false;
                }

                group.selected = true;


                $rootScope.currentGroup = group;
                $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(group.id);

                //$rootScope.importantTopics = messageClient.getImportantNews(group.id);

                if ($rootScope.currentPage == 'lenta') {
                    $rootScope.wallChangeGroup(group.id);
                    $rootScope.selectGroupInDropdown_lenta(group.id);
                } else if ($rootScope.currentPage == 'talks') {
                    $rootScope.talksChangeGroup(group.id);
                    $rootScope.selectGroupInDropdown_talks(group.id);
                } else if ($rootScope.currentPage == 'adverts') {
                    $rootScope.advertsChangeGroup(group.id);
                    $rootScope.selectGroupInDropdown_adverts(group.id);
                } else if ($rootScope.currentPage == 'neighbours') {
                    $rootScope.neighboursChangeGroup(group.id);
                } else if ($rootScope.currentPage == 'maps') {
                    $rootScope.mapsChangeGroup(group.id);
                } else if ($rootScope.currentPage == 'important') {
                    $rootScope.importantChangeGroup(group.id);
                }

                localStorage.setItem('groupId', group.id);
                //$rootScope.currentGroup = $rootScope.base.selectGroupInDropdown(group.id);
            }
        };

        $rootScope.showCreateTopic = function(event){
            event.preventDefault();

            $rootScope.base.createTopicIsHide ? $rootScope.base.createTopicIsHide = false : $rootScope.base.createTopicIsHide = true;

        };

        $('.ng-cloak').removeClass('ng-cloak');
    })