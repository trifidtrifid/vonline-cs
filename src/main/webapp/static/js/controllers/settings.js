
var settingsCtrl= function($rootScope,$scope,$c) {
        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;

        $c.resetPages($rootScope.base);
        $rootScope.base.settingsIsActive = true;
        $rootScope.base.isFooterBottom = true;

        $c.resetAceNavBtns($rootScope.navbar);
        $rootScope.base.mainContentTopIsHide = true;

        $rootScope.base.settingsLoadStatus = "isLoaded";

        var settings = this,
            userProfileMeta = $c.userClient.getUserProfile(),
            userContatcsMeta = userProfileMeta.contacts,
            userInfoMeta = userProfileMeta.userInfo,
            userPrivacyMeta = userProfileMeta.privacy,
            userNotificationsMeta = userProfileMeta.notifications,
            userFamilyMeta = userProfileMeta.family,
            userInterestsMeta = userProfileMeta.interests;

        if(userFamilyMeta === null){
            userFamilyMeta = new com.vmesteonline.be.thrift.UserFamily();
        }

        settings.userContacts = $c.clone(userContatcsMeta);
        settings.userInfo = $c.clone(userInfoMeta);
        settings.userPrivacy = $c.clone(userPrivacyMeta);
        settings.userNotifications = $c.clone(userNotificationsMeta);
        if(!settings.userNotifications){
            settings.userNotifications = new com.vmesteonline.be.thrift.Notifications();
            settings.userNotifications.freq = 4;
        }

        settings.family = $c.clone(userFamilyMeta);
        settings.interests = $c.clone(userInterestsMeta);

        if (settings.userInfo.gender == 1) {
            settings.married = "Замужем";
            settings.notMarried = "Не замужем";
        }else if(settings.userInfo.gender == 2){
            settings.married = "Женат";
            settings.notMarried = "Не женат";
        }else{
            settings.married = "В браке";
            settings.notMarried = "Не состою в браке";
        }

        settings.years= [];
        var ind = 0;
        for(var i = 2014; i > 1940; i--){
            settings.years[ind++] = i;
        }

        settings.userInfo.birthday ?
        settings.userInfo.birthdayMeta = new Date(settings.userInfo.birthday*1000) :
        settings.userInfo.birthdayMeta = "";

        if(settings.userInfo.birthdayMeta){
            var month = settings.userInfo.birthdayMeta.getMonth()+1+"";
            if(month.length == 1) month = "0"+month;

            var day = ""+settings.userInfo.birthdayMeta.getDate();
            if(day.length == 1) day = "0"+day;

            var year = settings.userInfo.birthdayMeta.getFullYear();

            settings.userInfo.birthdayMeta = day+"."+month+"."+year;
        }

        if(settings.family.childs === null || settings.family.childs.length == 0){
            settings.family.childs = [];
            settings.family.childs[0] = new com.vmesteonline.be.thrift.Children();
            settings.family.childs[0].name = "";
            var nowYear = new Date();
            nowYear = nowYear.getFullYear();
            //settings.family.childs[0].birthday = Date.parse('01.15.'+nowYear);
            settings.family.childs[0].birthday = null;
            settings.family.childs[0].isNotRemove = true;
        }
        var childsLength = settings.family.childs.length;
        for(var i = 0; i < childsLength; i++){
            if(settings.family.childs[i].birthday) {

                var birthDate = new Date(settings.family.childs[i].birthday*1000);
                    settings.family.childs[i].month = ""+birthDate.getMonth();

                if(settings.family.childs[i].month.length == 1)
                    settings.family.childs[i].month = "0"+settings.family.childs[i].month;

                    settings.family.childs[i].year = birthDate.getFullYear();
            }

        }

        if(settings.family.pets === null || settings.family.pets.length == 0){
            settings.family.pets = [];
            settings.family.pets[0] = new com.vmesteonline.be.thrift.Pet();
            settings.family.pets[0].name = "";
            settings.family.pets[0].type = "0";
            settings.family.pets[0].breed = "";
            settings.family.pets[0].isNotRemove = true;
        }

        settings.oldPassw = "";
        settings.newPassw = "";

        settings.canSave = function(num){
            switch(num){
                case 1:
                    return $scope.formUserInfo.$valid;
                    break;
                case 2:
                    return $scope.formPrivate.$valid;
                    break;
                case 3:
                    return $scope.formAlerts.$valid;
                    break;
                case 4:
                    return $scope.formContacts.$valid;
                    break;
                case 5:
                    return $scope.formFamily.$valid;
                    break;
                case 6:
                    return $scope.formInterests.$valid;
                    break;
            }

        };

        settings.profileInfo = "Сохранено";

        settings.isProfileError = false;
        settings.isProfileResult = false;
        settings.updateUserInfo = function(){
            var temp = new com.vmesteonline.be.thrift.UserInfo();

            settings.userInfo.birthdayMeta ?
                temp.birthday = Date.parse($c.getCorrectDate(settings.userInfo.birthdayMeta))/1000 :
                temp.birthday = 0;

            temp.gender = settings.userInfo.gender;
            temp.firstName = $rootScope.base.me.firstName = settings.userInfo.firstName;
            temp.lastName = $rootScope.base.me.lastName = settings.userInfo.lastName;

            $c.userClient.updateUserInfo(temp);
            settings.isProfileResult = true;
            settings.isProfileError = false;
            settings.profileInfo = "Сохранено";

        };

        settings.isPasswError = false;
        settings.isPasswResult = false;
        settings.updatePassword = function(){
            if (settings.newPassw.length < 3){
                settings.isPasswResult = true;
                settings.isPasswError = true;
                settings.passwInfo = "Вы указали слишком короткий пароль";
            }else{
                settings.isPasswResult = true;
                try {
                    $c.userClient.changePassword(settings.oldPassw, settings.newPassw);
                    settings.isPasswError = false;
                    settings.passwInfo = "Сохранено";
                }catch(e){
                    settings.isPasswError = true;
                    settings.passwInfo = "Вы указали не верный старый пароль";
                }
            }
        };


        settings.isPrivacyError = false;
        settings.isPrivacyResult = false;
        settings.updatePrivacy = function(){
            $c.userClient.updatePrivacy(settings.userPrivacy);

            settings.isPrivacyResult = true;
            settings.isPrivacyError = false;
        };


        settings.isContactsError = false;
        settings.isContactsResult = false;
        settings.updateContacts = function(){
            var temp = new com.vmesteonline.be.thrift.UserContacts();
            temp.email = settings.userContacts.email;
            temp.mobilePhone = settings.userContacts.mobilePhone;
            $c.userClient.updateContacts(temp);

            settings.isContactsError = false;
            settings.isContactsResult = true;
        };

        settings.isAlertsError = false;
        settings.isAlertsResult = false;
        settings.updateNotifications = function(){
            if(settings.userNotifications && (settings.userNotifications.email || settings.userNotifications.freq) ){
                var temp = new com.vmesteonline.be.thrift.Notifications();
                temp.email = settings.userNotifications.email;
                temp.freq = settings.userNotifications.freq;

                $c.userClient.updateNotifications(temp);

                settings.isAlertsError = false;
                settings.isAlertsResult = true;
            }
        };

        settings.isFamilyError = false;
        settings.isFamilyResult = false;
        settings.updateFamily = function(){
            var temp = new com.vmesteonline.be.thrift.UserFamily();
            temp.relations = settings.family.relations;
            temp.childs = settings.family.childs;
            //temp.childs = [];
            //temp.childs[0] = settings.firstChild;

            temp.pets = settings.family.pets;

            var childsLength = settings.family.childs.length;
            for(var i = 0; i < childsLength; i++){
                if(settings.family.childs[i].name && settings.family.childs[i].name != ""){ <!--  && settings.family.childs[i].month && settings.family.childs[i].year -->

                    var tempMonth = parseInt(settings.family.childs[i].month)+1+"";

                    if(tempMonth.length < 2) tempMonth = "0" + tempMonth;

                    if(settings.family.childs[i].year && settings.family.childs[i].year != '1911' && settings.family.childs[i].month) {
                        temp.childs[i].birthday = Date.parse($c.getCorrectDate("15."+tempMonth +"." + settings.family.childs[i].year)) / 1000;
                        //alert(tempMonth+" "+$c.getCorrectDate("15."+tempMonth +"." + settings.family.childs[i].year));
                    }else{
                        temp.childs[i].birthday = null;
                    }
                }
            }
            var petsLength = settings.family.pets.length;
            for(var i = 0; i < petsLength; i++){
                if(temp.pets[i] && !temp.pets[i].name){
                    //temp.pets.splice(i,1);
                }
            }

            $c.userClient.updateFamily(temp);

            settings.isFamilyError = false;
            settings.isFamilyResult = true;
        };

        settings.isInterestsError = false;
        settings.isInterestsResult = false;
        settings.updateInterests = function(){
            var temp = new com.vmesteonline.be.thrift.UserInterests();
            temp.job = settings.interests.job;
            temp.userInterests = settings.interests.userInterests;
            $c.userClient.updateInterests(temp);

            settings.isInterestsError = false;
            settings.isInterestsResult = true;
        };

        settings.childAdd = function(event){
            event.preventDefault();

            var newChild = new com.vmesteonline.be.thrift.Children();
            newChild.name = " ";
            var nowYear = new Date();
            nowYear = nowYear.getFullYear();
            newChild.birthday = Date.parse($c.getCorrectDate('15.01.'+nowYear));

            var birthDate = new Date(newChild.birthday);
            //newChild.month = ""+birthDate.getMonth();
            newChild.month = "";

            if(newChild.length == 1)
                newChild.month = "0"+newChild.month;

            //newChild.year = birthDate.getFullYear();
            newChild.year = "";


            if(settings.family == null){
                settings.family = new com.vmesteonline.be.thrift.UserFamily();
            }
            if(settings.family.childs == null){
                settings.family.childs= [];
            }

            settings.family.childs.length == 0 ?
            settings.family.childs[0] = newChild :
            settings.family.childs.push(newChild);

        };
        settings.removeChild = function(childName){
            var childsLength = settings.family.childs.length;
            for(var i = 0; i < childsLength; i++){
                if(settings.family.childs[i].name == childName) {
                    settings.family.childs.splice(i,1);
                }

            }
        };
        settings.petAdd = function(event){
            event.preventDefault();

            var newPet = new com.vmesteonline.be.thrift.Pet();
            newPet.name = " ";
            newPet.type = "0";

            if(settings.family == null){
                settings.family = new com.vmesteonline.be.thrift.UserFamily();
            }
            if(settings.family.pets == null){
                settings.family.pets= [];
            }

            settings.family.pets.length == 0 ?
                settings.family.pets[0] = newPet :
                settings.family.pets.push(newPet);
        };
        settings.removePet = function(petName){
            var petsLength = settings.family.pets.length;
            for(var i = 0; i < petsLength; i++){
                if(settings.family.pets[i].name == petName) {
                    settings.family.pets.splice(i,1);
                }

            }
        };

        settings.passwChange = false;
        settings.changePassw = function(){
            settings.passwChange = true;
        };

        /*(settings.userInfo.birthday != 0) ?
        settings.birthday = settings.userInfo.birthday :
        settings.birthday = "";*/

        $('#settings-input-3').datepicker({changeMonth:true, changeYear:true,dateFormat: "dd.mm.yy",yearRange:'c-100:+c'});
        $.datepicker.setDefaults($.datepicker.regional['ru']);

        angular.element($('.settings')).css({'min-height': $(window).height()-125});

        $('.ng-cloak').removeClass('ng-cloak');

        var href = document.location.href;
        var hrefInd = href.indexOf("/",9);
        $('input[name="redirect_uri"]').val(href.substring(0,hrefInd)+"/oauth");

    };

module.exports = [ '$rootScope','$scope','$c', settingsCtrl ];