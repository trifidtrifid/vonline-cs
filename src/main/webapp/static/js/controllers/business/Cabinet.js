
forumControllers.controller('Cabinet',function($rootScope,$stateParams) {
    var nearby = this,
        postId;

    var businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;
    businessDescription.shortName = "Мега Пицца";
    businessDescription.fulltName = "Мега Пицца круто-круто";
    businessDescription.shortInfo = "Мега Пицца круто-круто быстро-быстро";
    businessDescription.fullInfo = "Мега Пицца круто-круто быстро-быстро дешево";
    businessDescription.longitude = '30';
    businessDescription.latitude = '60';
    businessDescription.radius = 500;
    //businessClient.createBusinessDescription(businessDescription,'w','w');

    //console.log('business created');

    nearby.info = businessClient.getMyBusinessInfo();

    /*if ($stateParams.nearbyId && $stateParams.nearbyId != 0){
        postId = $stateParams.nearbyId;
    }*/

    nearby.carouselInterval = 5000;
    /*nearby.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i=0; i<4; i++) {
        nearby.addSlide();
    }*/

    $rootScope.base.isFooterBottom = true;

    nearby.toggleInput = function($event,post){
        $event.preventDefault();

        post.isInputShow ? post.isInputShow = false : post.isInputShow = true;

        console.log('input',post.isInputShow);

    };

    nearby.sendComm = function($event,post){
        $event.preventDefault();
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        console.log('post',post);

        message.id = 0;
        message.topicId = nearby.info.id; //post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BUSINESS_PAGE;//8;
        message.groupId = 0;
        message.content = post.commenting;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;

        if(!nearby.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        var returnComment = messageClient.postBusinessTopics(message);
        if(post.comments && post.comments.length) {
            post.comments.push(returnComment);
        }else{
            post.comments = [];
            post.comments[0] = returnComment;
        }

    };

    nearby.getTiming = function(messageObjDate){
        var minute = 60*1000,
            hour = minute*60,
            day = hour*24,
            threeDays = day* 3,
            now = Date.parse(new Date()),
            timing = (now - messageObjDate*1000),
            timeTemp;

        if(timing < minute){
            timing = "только что";
        }else if(timing < hour){
            timing = new Date(timing);
            timing = timing.getMinutes()+" мин назад";
        }else if(timing < day){
            timing = new Date(timing);
            timeTemp = timing.getHours();
            if(timeTemp == 1 || timeTemp == 0){
                timing = "1 час назад";
            }else if(timeTemp > 1 && timeTemp < 5){
                timing = timeTemp + " часа назад";
            }else{
                timing = timeTemp + " часов назад";
            }
        }else if(timing < threeDays){
            timing = new Date(timing);
            timeTemp = timing.getDate();
            if(timeTemp == 1){
                timing = timeTemp+" день назад";
            }else{
                timing = timeTemp+" дней назад";
            }
        }else{
            timeTemp = new Date(messageObjDate*1000).toLocaleDateString();
            var arr = timeTemp.split('.');
            if(arr[0].length == 1) arr[0] = "0"+arr[0];
            if(arr[1].length == 1) arr[1] = "0"+arr[1];
            timing = arr[0]+"."+arr[1]+"."+arr[2];
        }

        return timing;
    };


    $('.ng-cloak').removeClass('ng-cloak');

});