
forumControllers.controller('SetInfoController',function($state, $rootScope) {
        var setInfo = this;

        setInfo.isSaveResult = false;
        setInfo.isError = false;

        setInfo.save = function(){
            var staircase, floor,flat;

            (!setInfo.staircase) ? staircase = 0 : staircase = setInfo.staircase;
            (!setInfo.floor) ? floor = 0 : floor = setInfo.floor;
            (!setInfo.flat) ? flat = 0 : flat = setInfo.flat;

            setInfo.isSaveResult = true;
            //try {
                userClient.updateUserAddress(staircase, floor, flat);
                setInfo.info = "Сохранено";
                window.location.replace('/');
                //$rootScope.$apply();
            /*}catch(e){
                setInfo.info = "Произошла ошибка";
                setInfo.isError = true;
            }*/
        };

    })