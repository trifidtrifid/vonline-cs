
forumControllers.controller('CountersHistoryController',function($scope,$stateParams,$rootScope,$counters) {

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.pageTitle = "История показаний счетчика";
        $rootScope.base.isFooterBottom = true;

        var counters = $counters.getCounters,
            countersLen = counters.length;
        for(var i = 0; i < countersLen; i++){
            if(counters[i].id == $stateParams.counterId){
                $scope.currentCounter = counters[i];
                $scope.currentCounter.typeString = $counters.getTypeString(counters[i].type);
            }
        }

        var now = Date.parse(new Date())/1000,
            history = utilityClient.getCounterHistory($stateParams.counterId,0,now),
            counter = 0;

        $scope.history = [];
        $scope.counterName = $stateParams.counterName;

        for(var p in history){
            $scope.history[counter] = {};
            $scope.history[counter].date = p;
            $scope.history[counter].val = history[p];
            counter++;
        }

        angular.element($('.counters')).css({'min-height': $(window).height()-105});

    })