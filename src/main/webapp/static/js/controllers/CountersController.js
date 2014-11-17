
forumControllers.controller('CountersController',function($rootScope, $modal,$counters) {
        var counters = this;

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.pageTitle = "Счетчики";
        $rootScope.base.isFooterBottom = true;

        counters.counters = $counters.getCounters;
        counters.typesArray = [];
        var typesEnumLength = 6;

        var counterService = utilityClient.getCounterService();

        var currentDate = (new Date()).getDate();

        counters.endDateOfMonth = counterService.endDateOfMonth;

    console.log(counterService.startDateOfMonth+" " +
        counterService.endDateOfMonth+" "+
        counterService.infoProvided);

        if(currentDate >= counterService.startDateOfMonth &&
            currentDate <= counterService.endDateOfMonth ){

                if(counterService.infoProvided){
                // с 14 по 24, отправлено
                counters.state = 2;
            }else{
                // с 14 по 24, не отправлено
                counters.state = 1;
            }
        }else{
            // время с 24 по 14 число
            counters.state = 0;
        }

    console.log('state '+counters.state);

        for(var i = 0; i < typesEnumLength; i++){
            counters.typesArray[i] = {};
            counters.typesArray[i].type = i;
            counters.typesArray[i].typeString = $counters.getTypeString(i);
        }

        var countersLength = counters.counters.length;
        for(var i = 0; i < countersLength; i++){
            counters.counters[i].currentValue = "";
            counters.counters[i].isEdit = false;
            counters.counters[i].wasEdit = false;
            counters.counters[i].typeString = $counters.getTypeString(counters.counters[i].type);
        }

        counters.save = function(){

            var countersLen = counters.counters.length,
                currentValue,
                date, isCanSave = true;


            for(var i = 0; i < countersLen; i++){
                if(!counters.counters[i].currentValue) {
                    isCanSave= false;
                    break;
                }
            }

            if(isCanSave) {
                counters.errorText = "";
                for (i = 0; i < countersLen; i++) {
                    if (counters.counters[i].wasEdit) {
                        date = Date.parse(new Date()) / 1000;
                        currentValue = counters.counters[i].currentValue;

                        if (!currentValue) currentValue = 0;
                        utilityClient.setCurrentCounterValue(counters.counters[i].id, currentValue, date);
                        counters.counters[i].lastValue = currentValue;
                        counters.counters[i].currentValue = "";
                        counters.state = 2;
                    }
                }
            }else{
                counters.errorText = "Необходимо указать значения всех счтечиков";
            }

        };

        counters.addCounter = function(){
            var counter = new com.vmesteonline.be.thrift.utilityservice.Counter();
            counter.id = utilityClient.registerCounter(counter);
            counter.isEdit = true;
            counters.counters.push(counter);
        };
        counters.editCounter = function(counter){
            counter.isEdit = true;
        };
        counters.saveEditedCounter = function(counter){
            //alert(counter.id+" "+counter.number+" "+counter.type+" "+counter.location);
            /*for(var p in counter){
                alert(counter[p]+" "+p);
            }*/

            var correctCounter = new com.vmesteonline.be.thrift.utilityservice.Counter();
            correctCounter.id = counter.id;
            correctCounter.location = counter.location;
            correctCounter.type = counter.type;
            correctCounter.number = counter.number;
            correctCounter.lastValue = counter.lastValue;

            utilityClient.updateCounter(correctCounter);
            counter.isEdit = false;
            counter.typeString = $counters.getTypeString(counter.type);
        };
        counters.removeCounter = function(counter){

            var modal = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'modal-remove-counter',
                size: 'sm'
            });

            modal.result.then(function () {

                utilityClient.removeCounter(counter.id);
                var countersLength = counters.counters.length;
                for(var i = 0; i< countersLength; i++){

                    if(counter.id == counters.counters[i].id){
                        counters.counters.splice(i,1);
                    }

                }

            });

        };

        counters.countersConfirm = function(){

            var newServicesStatuses = [];
            newServicesStatuses['11'] = true;

            userClient.updateUserServices(newServicesStatuses);

            $rootScope.base.me.countersConfirmed = true;
        };

        counters.cancel = function(){
            counters.state = 1;
        };

        counters.toggleNotification = function(){
           var newServicesStatuses = [];

          if ($rootScope.base.me.countersNotification ){
              $rootScope.base.me.countersNotification = newServicesStatuses['12'] = false;
          }else{
              $rootScope.base.me.countersNotification = newServicesStatuses['12'] = true;
          }

            userClient.updateUserServices(newServicesStatuses);

        };

    counters.inputCounter = function(counter){
        counter.wasEdit = true;
        counter.currentValue = parseInt(counter.currentValue);
     };

        angular.element($('.counters')).css({'min-height': $(window).height()-105});

    })