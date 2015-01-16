
forumControllers.controller('leftBarController',function($rootScope) {

    $rootScope.setTab = function(newValue){

        $rootScope.leftbar.tab = newValue;
        $rootScope.isTopSearchShow = true;
        resetPages($rootScope.base);
        resetAceNavBtns($rootScope.navbar);

        switch(newValue){
            case 1:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.lentaIsActive = true;
                $rootScope.currentPage = 'lenta';
                $rootScope.base.pageTitle = "Новости";
                break;
            case 2:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.isTalkTitles = true;
                $rootScope.base.talksIsActive = true;
                $rootScope.currentPage = 'talks';
                $rootScope.base.pageTitle = "Обсуждения";
                break;
            case 3:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.isAdvertsTitles = true;
                $rootScope.base.advertsIsActive = true;
                $rootScope.currentPage = 'adverts';
                $rootScope.base.pageTitle = "Объявления";
                break;
            case 4:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.importantIsActive = true;
                $rootScope.currentPage = 'important';
                $rootScope.base.pageTitle = "Важные сообщения";
                break;
            case 5:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.importantIsActive = true;
                $rootScope.currentPage = 'nearby';
                $rootScope.base.pageTitle = "Рядом";
                break;
            default :
                break;
        }

    };

    $rootScope.isSet = function(number){
        return $rootScope.leftbar.tab === number;
    };

    $rootScope.setRubric = function(rubric){

            /*for (var i = 0; i < groupsLength; i++) {
                groups[i].selected = false;
            }

            group.selected = true;

            $rootScope.currentGroup = group;
            $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(group.id);*/
            $rootScope.currentRubric = rubric;
        if(!rubric) {
            $rootScope.currentRubric = {};
            $rootScope.currentRubric.id = 0;
        }

        $rootScope.wallChangeRubric($rootScope.currentRubric.id);

    }
  })