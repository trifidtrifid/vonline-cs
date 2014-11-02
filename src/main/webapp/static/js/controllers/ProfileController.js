
forumControllers.controller('ProfileController',function($rootScope, $stateParams) {

        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;

        resetPages($rootScope.base);
        $rootScope.base.profileIsActive = true;
        $rootScope.base.isFooterBottom = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.profileLoadStatus = "isLoaded";

        var profile = this, userId;
        profile.isMayEdit = false;

        $("#dialog-message").addClass('hide');

        if ($stateParams.userId && $stateParams.userId != 0 && $stateParams.userId != shortUserInfo.id){
            userId = $stateParams.userId;
            //profile.userContacts = userClient.getUserContactsExt(userId);
        }else{
            userId = 0;
            profile.isMayEdit = true;

            try {
                var location = userClient.getGroupView($rootScope.groups[0].id);

                profile.map = {};
                profile.map.zoom = 17;
                profile.map.center = [location.longitude, location.latitude];

                profile.map.baloon = {
                    // Геометрия = тип объекта + географические координаты объекта
                    geometry: {
                        // Тип геометрии - точка
                        type: 'Point',
                        // Координаты точки.
                        coordinates: profile.map.center
                    },
                    // Свойства
                    properties: {
                        hintContent: "Я здесь"
                    }
                };
            }catch(err){
            }
            //profile.map = userClient.getGroupMap($rootScope.groups[0].id, MAP_COLOR);
            //profile.userContacts = userClient.getUserContacts();
        }

        profile.userProfile = userClient.getUserProfile(userId);

        var isEmptyContacts = false,
            isEmptyFamily = false,
            isEmptyInterests = false,
            isEmptyNotifications = false,
            isEmptyUserInfo = false;

        if(!profile.userProfile.userInfo || !profile.userProfile.userInfo.birthday) isEmptyUserInfo = true;

        if(!profile.userProfile.contacts || (!profile.userProfile.contacts.homeAddress && !profile.userProfile.contacts.mobilePhone &&
            !profile.userProfile.contacts.email)) isEmptyContacts = true;

        if(!profile.userProfile.family || (!profile.userProfile.family.relations
            && !profile.userProfile.family.childs && !profile.userProfile.family.pets)) isEmptyFamily = true;

        if(!profile.userProfile.interests || (!profile.userProfile.interests.userInterests && !profile.userProfile.interests.job)) isEmptyInterests = true;

        if(!profile.userProfile.notifications) isEmptyNotifications = true;

        //alert(isEmptyUserInfo+" "+isEmptyContacts+" "+isEmptyFamily+" "+isEmptyInterests+" "+isEmptyNotifications);
        if(isEmptyUserInfo && isEmptyContacts && isEmptyFamily && isEmptyInterests && isEmptyNotifications)
            profile.isEmptyProfile = true;

        if(profile.userProfile.userInfo){
            if (profile.userProfile.userInfo.gender == 1){
                profile.userProfile.userInfo.genderMeta = "Женский";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.userInfo.genderMeta = "Мужской";
            }else{
                profile.userProfile.userInfo.genderMeta = "";
            }
        }

        $rootScope.base.avatarBuffer = profile.userProfile.userInfo.avatar;

        if(profile.userProfile.family && profile.userProfile.family.relations == 0){

            if(profile.userProfile.userInfo.gender == 1){
                profile.userProfile.family.relationsMeta = "Замужем";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.family.relationsMeta = "Женат";
            }

        }else if(profile.userProfile.family && profile.userProfile.family.relations == 1){
            if(profile.userProfile.userInfo.gender == 1){
                profile.userProfile.family.relationsMeta = "Не замужем";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.family.relationsMeta = "Холост";
            }
        }

        if(profile.userProfile.family && profile.userProfile.family.pets && profile.userProfile.family.pets.length != 0){
           var petsLength = profile.userProfile.family.pets.length;
            var pets = profile.userProfile.family.pets;
            for(var i = 0; i < petsLength; i++){
                switch(profile.userProfile.family.pets[i].type){
                    case 0:
                        profile.userProfile.family.pets[i].typeMeta = "Кошка";
                        break;
                    case 1:
                        profile.userProfile.family.pets[i].typeMeta = "Собака";
                        break;
                    case 2:
                        profile.userProfile.family.pets[i].typeMeta = "Птичка";
                        break;
                }

            }
        }

        //$rootScope.chageIndex = 0;

        angular.element($('.profile')).css({'min-height': $(window).height()-135});

        $('.ng-cloak').removeClass('ng-cloak');

})