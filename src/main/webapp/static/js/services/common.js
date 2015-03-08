
module.exports = function() {
    var c = {};

    /* const */
    c.TEXT_DEFAULT_1 = "Написать сообщение";
    c.TEXT_DEFAULT_2 = "Ваш ответ";
    c.TEXT_DEFAULT_3 = "Сообщение";
    c.TEXT_DEFAULT_4 = "Заголовок";

    c.MAP_COLOR = "6FB3E040";

    c.TEXTAREA_DEFAULT_HEIGHT = 54;

    /* functions */

    var transport = new Thrift.Transport("/thrift/MessageService");
    var protocol = new Thrift.Protocol(transport);
    c.messageClient = new com.vmesteonline.be.thrift.messageservice.MessageServiceClient(protocol);

    transport = new Thrift.Transport("/thrift/AuthService");
    protocol = new Thrift.Protocol(transport);
    c.authClient = new com.vmesteonline.be.thrift.authservice.AuthServiceClient(protocol);

    var isLogin = c.authClient.checkIfAuthorized();
    var path = document.location.pathname;
    if (!isLogin && path != '/blog' && path != '/about' && path != '/contacts') document.location.replace('/login');

    transport = new Thrift.Transport("/thrift/DialogService");
    protocol = new Thrift.Protocol(transport);
    c.dialogClient = new com.vmesteonline.be.thrift.messageservice.DialogServiceClient(protocol);

    transport = new Thrift.Transport("/thrift/UserService");
    protocol = new Thrift.Protocol(transport);
    c.userClient = new com.vmesteonline.be.thrift.userservice.UserServiceClient(protocol);

    transport = new Thrift.Transport("/thrift/BusinessService");
    protocol = new Thrift.Protocol(transport);
    c.businessClient = new com.vmesteonline.be.thrift.businesservice.BusinessServiceClient(protocol);
    //BusinessServiceClient(protocol);

    if (isLogin) { //path != '/blog' && path != '/about' && path != '/contacts'
        c.userClientGroups = c.userClient.getUserGroups();
        c.userClientRubrics = c.userClient.getUserRubrics();

        //console.log('111',c.userClientRubrics,c.userClientGroups);
        if (c.userClientGroups.length == 0) document.location.replace('/login');

        c.shortUserInfo = c.userClient.getShortUserInfo();
        console.log('0', c.shortUserInfo);

        var servicesStr = c.shortUserInfo.services.join(';');

        console.log(c.shortUserInfo);
        if (servicesStr.indexOf('10') != -1) c.shortUserInfo.countersEnabled = true;
        if (servicesStr.indexOf('11') != -1) c.shortUserInfo.countersConfirmed = true;
        if (servicesStr.indexOf('12') != -1) c.shortUserInfo.countersNotification = true;
    }
//console.log('333',c.userClientGroups);

    transport = new Thrift.Transport("/thrift/UtilityService");
    protocol = new Thrift.Protocol(transport);
    c.utilityClient = new com.vmesteonline.be.thrift.utilityservice.UtilityServiceClient(protocol);

    transport = new Thrift.Transport("/thrift/fs");
    protocol = new Thrift.Protocol(transport);
    c.fileClient = new com.vmesteonline.be.thrift.fileservice.FileServiceClient(protocol);

    c.withTags = function(str){
        var result = str.replace(/&#10;/g, '<br>'); // пробел после <br> специально, чтобы не слипался с ссылками
        result = result.replace(/\n/g, '<br>');
        /*var strArr = result.split(" "),

         len = strArr.length,
         tempStr;

         result = "";
         for(var i = 0; i < len; i++){
         if(strArr[i].indexOf("http://") != -1 || strArr[i].indexOf("https://") != -1){
         //tempStr = "<a href='"+ strArr[i] +"' target='_blank'>"+strArr[i]+"</a>";
         tempStr = strArr[i].link(strArr[i]);

         strArr[i] = tempStr;
         }

         result += strArr[i]+" ";
         }*/


        return result;

    }

    c.withoutTags = function(str){
        var result = str.replace(/<br>/g, '\n');
        result = result.replace(/<[^>]+>/g, '');
        return result;
    }

/*    c.getStrFromHTMLCode = function(str){
        //alert(str);
        var strArr = str.split(';'),
            len = strArr.length,
            symb = [], counter = 0, result = "";


        for (var i = 0; i < len; i++) {
            var strArr2 = strArr[i].split(" "),
                len2 = strArr2.length;

            if (len2 == 1) {
                if (strArr2[0].indexOf('&') != -1) {
                    //alert(strArr2[0].substr(-4) == '&#10');
                    if (strArr2[0].substr(-4) != '&#10') {
                        symb[counter] = String.fromCharCode(strArr2[0].substring(2));
                        //alert("0 "+strArr2[0].substring(2)+" "+String.fromCharCode(strArr2[0].substring(2))+" "+symb[counter]);
                    } else {
                        symb[counter] = strArr2[0].substring(0, strArr2[0].length - 4) + '\n';
                        //alert("1 "+strArr2[0].substring(2)+" "+String.fromCharCode(strArr2[0].substring(2))+" "+symb[counter]);
                    }
                } else {
                    symb[counter] = strArr[i];
                }
                result += symb[counter++];
            } else {
                for (var j = 0; j < len2; j++) {
                    if (strArr2[j].indexOf('&') != -1) {
                        if (strArr2[0].substr(-4) != '&#10') {
                            symb[counter] = String.fromCharCode(strArr2[j].substring(2));
                        } else {
                            symb[counter] = strArr2[j].substring(0, strArr2[j].length - 4) + '\n';
                        }
                    } else {
                        symb[counter] = strArr2[j];
                    }
                    (j == len2 - 1) ? result += symb[counter++] : result += symb[counter++] + " ";
                }
            }
        }

        //return symb.join('');
        return result;
    }*/

    c.getDefaultGroup = function(groups){
        var len = groups.length;
        for (var i = 0; i < len; i++) {
            if (groups[i].type == 5) return groups[i];
        }

        return groups[0];
    }

    c.showGroupOverBuilding = function(groups, currentGroup){
        var len = groups.length;
        for (var i = 0; i < len; i++) {
            if (groups[i].type < 4) {
                groups[i].isShow = false;
            } //4 = BUILDING
        }
    }

    c.getBuildingGroup = function(currentGroup){
        var len = c.userClientGroups.length,
            group;
        if (currentGroup.type < 4) {
            for (var j = 0; j < len; j++) {
                if (c.userClientGroups[j].type == 4) {
                    group = c.userClientGroups[j];
                }
            }
            return group;
        } else {
            return currentGroup;
        }

    }

    c.getCorrectDate = function(str){
        var arrDate = str.split(/[./]/),
            month = arrDate[1],
            monthStr;

        switch (month) {
            case "01":
                monthStr = "Jan";
                break;
            case "02":
                monthStr = "Feb";
                break;
            case "03":
                monthStr = "Mar";
                break;
            case "04":
                monthStr = "Apr";
                break;
            case "05":
                monthStr = "May";
                break;
            case "06":
                monthStr = "June";
                break;
            case "07":
                monthStr = "July";
                break;
            case "08":
                monthStr = "Aug";
                break;
            case "09":
                monthStr = "Sep";
                break;
            case "10":
                monthStr = "Oct";
                break;
            case "11":
                monthStr = "Nov";
                break;
            case "12":
                monthStr = "Dec";
                break;
        }

        return arrDate[0] + " " + monthStr + " " + arrDate[2];

    }

    c.resetPages = function(base){
        base.neighboursIsActive = false;
        base.privateMessagesIsActive = false;
        base.mapsIsActive = false;
        base.profileIsActive = false;
        base.settingsIsActive = false;
        base.talksIsActive = false;
        base.lentaIsActive = false;
        base.advertsIsActive = false;
    }

    c.resetAceNavBtns = function(navbar){
        navbar.neighboursBtnStatus = "";
        navbar.privateMessagesBtnStatus = "";
        navbar.mapsBtnStatus = "";
    }

    var base64encode = function(str){
        // Символы для base64-преобразования
        var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg' +
            'hijklmnopqrstuvwxyz0123456789+/=';
        var b64encoded = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;

        for (var i = 0; i < str.length;) {
            chr1 = str.charCodeAt(i++);
            chr2 = str.charCodeAt(i++);
            chr3 = str.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

            enc3 = isNaN(chr2) ? 64 : (((chr2 & 15) << 2) | (chr3 >> 6));
            enc4 = isNaN(chr3) ? 64 : (chr3 & 63);

            b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) +
                b64chars.charAt(enc3) + b64chars.charAt(enc4);
        }
        return b64encoded;
    }

    var insertDoc = function(selector, attachAreaSelector, fileLabel){
        var docName = fileLabel.find('.file-name').attr('data-title');

        var reader = new FileReader();
        reader.readAsBinaryString(selector[0].files[0]);
        var dataType = selector[0].files[0].type;

        reader.onload = function (e) {
            docsBase64[attachAreaSelector][docsInd[attachAreaSelector]] = new com.vmesteonline.be.thrift.messageservice.Attach();
            docsBase64[attachAreaSelector][docsInd[attachAreaSelector]].fileName = docName;
            docsBase64[attachAreaSelector][docsInd[attachAreaSelector]].contentType = dataType;
            var url = docsBase64[attachAreaSelector][docsInd[attachAreaSelector]].URL = c.fileClient.saveFileContent(base64encode(reader.result));
            docsInd[attachAreaSelector]++;

            attachAreaSelector.append("<span class='attach-item new-attached' data-href='" + url + "' data-type='" + dataType + "'>" +
                "<a href='#' title='Не прикреплять' class='remove-attach-img'>&times;</a>" +
                '<span>' + docName + '</span>' +
                "</span>");

            $('.new-attached .remove-attach-img').click(function (e) {
                e.preventDefault();
                var attachItem = $(this).closest('.attach-item');
                var ind = attachItem.index();
                attachItem.hide().detach();
                docsBase64[attachAreaSelector].splice(ind, 1);
                c.fileClient.deleteFile(url);
            });

            $('.new-attached').removeClass('new-attached');
        };

    }

    var copyImage = function(attachAreaSelector, fileLabel, type){
        var copyImgSrc = fileLabel.find('.file-name img').css('background-image');

        if (copyImgSrc == 'none' || !copyImgSrc) {
            setTimeout(copyImage, 200, attachAreaSelector, fileLabel, type);
        } else {

            var url = c.fileClient.saveFileContent(copyImgSrc, true),
                fileName = fileLabel.find('.file-name').attr('data-title');

            attachAreaSelector.find('.loading').addClass('hidden');

            attachAreaSelector.find('.loading').before("<span class='attach-item new-attached'>" +
                "<a href='#' title='Не прикреплять' class='remove-attach-img'>&times;</a>" +
                "<img data-title='" + fileName + "' data-type='" + type + "' class='attached-img' style='background-image:url(" + url + ")'></span>");

            $('.new-attached .remove-attach-img').click(function (e) {
                e.preventDefault();
                $(this).closest('.attach-item').hide().detach();
                c.fileClient.deleteFile(url);
            });

            $('.new-attached').removeClass('new-attached');
        }
    }

    c.initAttachImage = function(selector, attachAreaSelector){
        var title;
        // на случай если будет прикрепляться не файл
        docsBase64[attachAreaSelector] = [];
        docsInd[attachAreaSelector] = 0;

        selector.ace_file_input({
            style: 'well',
            btn_choose: 'Изображение',
            btn_change: null,
            no_icon: '',
            droppable: true,
            thumbnail: 'large',
            icon_remove: null,
            before_change: function (files, dropped) {
                title = $(this).find('+.file-label').data('title');
                return true;
            }
        }).on('change', function () {
            var fileLabel = $(this).find('+.file-label');
            fileLabel.attr('data-title', title).removeClass('hide-placeholder');
            fileLabel.find('.file-name').hide();

            var type = selector[0].files[0].type;

            if (type.indexOf('image') != -1) {
                //если картинка
                attachAreaSelector.find('.loading').removeClass('hidden');


                var myArea = attachAreaSelector;
                if (attachAreaSelector.selector.indexOf('doc-area') != -1)
                    myArea = $(attachAreaSelector.selector.replace('doc-area', 'area'));

                setTimeout(copyImage, 200, myArea, fileLabel, type);
            } else {
                // если другой файл

                var myArea = attachAreaSelector;
                if (attachAreaSelector.selector.indexOf('doc-area') == -1)
                    myArea = $(attachAreaSelector.selector.replace('area', 'doc-area'));

                setTimeout(insertDoc, 200, selector, myArea, fileLabel);

            }

        });
    }

    var docsBase64 = [],
        docsInd = [];

    c.initAttachDoc = function(selector, attachAreaSelector){
        var title;
        docsBase64[attachAreaSelector] = [];
        docsInd[attachAreaSelector] = 0;

        selector.ace_file_input({
            style: 'well',
            btn_choose: 'Документ',
            btn_change: null,
            no_icon: '',
            droppable: true,
            thumbnail: 'large',
            icon_remove: null,
            before_change: function (files, dropped) {
                title = $(this).find('+.file-label').data('title');
                return true;
            }
        }).on('change', function () {
            var fileLabel = $(this).find('+.file-label');
            fileLabel.attr('data-title', title).removeClass('hide-placeholder');
            fileLabel.find('.file-name').hide();

            //setTimeout(insertDoc,200,selector,attachAreaSelector,fileLabel);

            var type = selector[0].files[0].type;

            if (type.indexOf('image') != -1) {
                //если картинка
                attachAreaSelector.find('.loading').removeClass('hidden');

                var myArea = attachAreaSelector;
                if (attachAreaSelector.selector.indexOf('doc-area') != -1)
                    myArea = $(attachAreaSelector.selector.replace('doc-area', 'area'));

                setTimeout(copyImage, 200, myArea, fileLabel, type);
            } else {
                // если другой файл

                var myArea = attachAreaSelector;
                if (attachAreaSelector.selector.indexOf('doc-area') == -1)
                    myArea = $(attachAreaSelector.selector.replace('area', 'doc-area'));

                setTimeout(insertDoc, 200, selector, myArea, fileLabel);
            }

        });
    }

    c.selectGroupInDropdown = function(groupId){
        var groupsLength = c.userClientGroups.length,
            selectedGroup;
        for (var i = 0; i < groupsLength; i++) {
            if (groupId == c.userClientGroups[i].id) {
                selectedGroup = c.userClientGroups[i];
            }
        }
        return selectedGroup;
    }

    c.getTiming = function(messageObjDate){
        var minute = 60 * 1000,
            hour = minute * 60,
            day = hour * 24,
            threeDays = day * 3,
            now = Date.parse(new Date()),
            timing = (now - messageObjDate * 1000),
            timeTemp;

        if (timing < minute) {
            timing = "только что";
        } else if (timing < hour) {
            timing = new Date(timing);
            //timing = timing.getMinutes()+" мин назад";
            timing = (timing / minute).toFixed(0) + " мин назад";
        } else if (timing < day) {
            timing = new Date(timing);
            //timeTemp = timing.getHours();
            timeTemp = (timing / hour).toFixed(0);

            if (timeTemp == 1 || timeTemp == 0) {
                timing = "1 час назад";
            } else if (timeTemp > 1 && timeTemp < 5) {
                timing = timeTemp + " часа назад";
            } else {
                timing = timeTemp + " часов назад";
            }
        } else if (timing < threeDays) {
            timing = new Date(timing);
            //timeTemp = timing.getDate();
            timeTemp = (timing / day).toFixed(0);
            if (timeTemp == 1) {
                timing = timeTemp + " день назад";
            } else {
                timing = timeTemp + " дня назад";
            }
        } else {
            timeTemp = new Date(messageObjDate * 1000).toLocaleDateString();

            var arr = timeTemp.split(/[./]/);
            if (arr[0].length == 1) arr[0] = "0" + arr[0];
            if (arr[1].length == 1) arr[1] = "0" + arr[1];
            timing = arr[0] + "." + arr[1] + "." + arr[2];
        }

        return timing;
    }

    c.getLabel = function(groupsArray, groupType){
        var groupsArrayLen = groupsArray.length;
        var label = "";
        for (var i = 0; i < groupsArrayLen; i++) {

            if (groupsArray[i].type == groupType) {
                label = groupsArray[i].visibleName;
            }
        }

        return label;
    }

    c.getAuthorName = function(userInfo){
        var userInf = userInfo;
        if (!userInfo) {
            userInf = c.shortUserInfo;
        }

        return userInf.firstName + " " + userInf.lastName;
    }

    c.getTagColor = function(labelName){
        var color,
            len = c.userClientGroups.length;

        for (var i = 0; i < len; i++) {
            if (labelName == c.userClientGroups[i].visibleName) {
                if (i == 0) {
                    color = 'label-pink';
                } else if (i == 1) {
                    color = 'label-success'; // green
                } else if (i == 2) {
                    color = 'label-yellow';
                } else if (i == 3) {
                    color = 'label-purple';
                }
            }
        }
        return color;
    }

    c.getTopicRubric = function(topic){
        var len = c.userClientRubrics.length,
            rubric;

        for (var i = 0; i < len; i++) {
            if (c.userClientRubrics[i].id == topic.rubricId) {
                rubric = c.userClientRubrics[i];
            }
        }

        return rubric
    };

    c.setPoll = function(poll, pollInputs){
        var counterForPoll = 0,
            pollInputsLength = pollInputs.length;

        for (var i = 0; i < pollInputsLength; i++) {
            if (pollInputs[i].name != "") {
                poll.names[counterForPoll] = pollInputs[i].name;
                poll.editNames[counterForPoll] = {
                    id: counterForPoll++,
                    name: pollInputs[i].name
                };
            }
        }

    }

    c.postTopic = function(obj, isWall, isAdverts, $filter){
        if (obj.id) {
            // значит редактирование
            if (obj.isPollShow) {
                // с опросом
                if (obj.poll && obj.poll.pollId) {
                    // редактирование опроса
                    obj.poll.subject = obj.pollSubject;
                    obj.poll.names = [];

                    c.setPoll(obj.poll, obj.pollInputs);

                } else {
                    // создание опроса
                    poll = new com.vmesteonline.be.thrift.messageservice.Poll();
                    poll.pollId = 0;
                    poll.editNames = [];
                    poll.names = [];
                    poll.subject = obj.pollSubject;
                    poll.alreadyPoll = false;

                    c.setPoll(poll, obj.pollInputs);

                    obj.poll = poll;
                    obj.metaType = "poll";
                }
            } else {
                obj.poll = null;
            }

            obj.message.images = obj.attachedImages;
            obj.message.documents = obj.attachedDocs;
            obj.message.groupId = obj.selectedGroup.id;
            //obj.message.content = c.withTags(obj.message.content);

            obj.message.content = $filter('linky')(obj.message.content, 'blank');
            obj.message.content = c.withTags(obj.message.content);

            obj.label = c.getLabel(c.userClientGroups, obj.selectedGroup.type);
            obj.tagColor = c.getTagColor(obj.label);
            obj.selectedRubric.id ? obj.rubricId = obj.selectedRubric.id : obj.rubricId = 0;

            console.log('postTopic-2', obj.rubricId);

            var newTopic = c.messageClient.postTopic(obj);
        } else {
            // значит создание

            var messageType,
                messageContent,
                subject;
            if (isWall) {
                messageType = 5; // wall
                messageContent = obj.message.content;
                obj.message.content = c.TEXT_DEFAULT_1;
                subject = "";
            } else {
                if (!isAdverts) {
                    messageType = 1; // talks
                } else {
                    messageType = 6; // adverts
                }
                messageContent = obj.message.content;
                obj.message.content = c.TEXT_DEFAULT_3;
                subject = obj.subject;

            }
            //console.log(messageContent + " " + messageType + " " + subject);

            newTopic = new com.vmesteonline.be.thrift.messageservice.Topic();
            newTopic.message = new com.vmesteonline.be.thrift.messageservice.Message();
            newTopic.message.groupId = obj.selectedGroup.id;
            newTopic.message.type = messageType;

            messageContent = $filter('linky')(messageContent, 'blank');
            newTopic.message.content = c.withTags(messageContent);

            newTopic.message.images = obj.attachedImages;
            newTopic.message.documents = obj.attachedDocs;
            newTopic.message.id = 0;
            newTopic.message.created = Date.parse(new Date()) / 1000;

            newTopic.subject = subject;
            newTopic.id = 0;
            newTopic.metaType = "message";
            newTopic.messageNum = 0;

            if (obj.id) {
                // значит редактирование
                newTopic.id = obj.id;
                newTopic.message.id = obj.message.id;
            }

            var poll;
            if (obj.isPollShow) {
                poll = new com.vmesteonline.be.thrift.messageservice.Poll();
                poll.pollId = 0;
                poll.editNames = [];
                poll.names = [];
                poll.subject = obj.pollSubject;
                poll.alreadyPoll = false;

                c.setPoll(poll, obj.pollInputs);

                newTopic.poll = poll;
                newTopic.metaType = "poll";
            }
            //newTopic.rubricId = obj.selectedRubric.id;
            obj.selectedRubric.id ? newTopic.rubricId = obj.selectedRubric.id : newTopic.rubricId = 0;

            //alert(newTopic.message.content);
            var tempTopic = c.messageClient.postTopic(newTopic);
            newTopic.id = tempTopic.id;
            newTopic.message.images = tempTopic.message.images;
            newTopic.message.documents = tempTopic.message.documents;
            newTopic.userInfo = tempTopic.userInfo;

            if (obj.isPollShow) {
                newTopic.poll.pollId = tempTopic.poll.pollId;
                obj.isPollShow = false;
                obj.pollSubject = "";
                obj.isPollAvailable = true;
            }
            if (isWall) {
                newTopic.message.createdEdit = c.getTiming(newTopic.message.created);
            } else {
                newTopic.lastUpdateEdit = c.getTiming(newTopic.message.created);
            }

        }

        return newTopic;

    }

    c.getAttachedImages = function(selector){
        var imgList = [], ind = 0;

        selector.find('.attach-item').each(function () {
            //значит картинка
            var bgImg = $(this).find('img').css('background-image'),
                name = $(this).find('img').attr('data-title'),
                type = $(this).find('img').attr('data-type'),
                result, content;

            var i = bgImg.indexOf('base64,');
            content = bgImg.slice(4, bgImg.length - 1);

            result = new com.vmesteonline.be.thrift.messageservice.Attach();
            result.fileName = name;
            result.contentType = type;

            var indexFile = content.indexOf('/file');
            content = content.substring(indexFile);

            result.URL = content;
            //console.log(content);
            //result = 'obj(name:'+ base64encode(name) +';data:'+ type +';content:'+content+")";

            imgList[ind++] = result;

        });

        return imgList;
    }

    c.getAttachedDocs = function(selector, isEdit){
        if (isEdit) {
            var docList = [], ind = 0;
            docsBase64[selector] = [];

            selector.find('.attach-item').each(function () {
                docsBase64[selector][ind] = new com.vmesteonline.be.thrift.messageservice.Attach();
                docsBase64[selector][ind].fileName = $(this).find('span').text();
                docsBase64[selector][ind].contentType = $(this).attr('data-type');
                docsBase64[selector][ind].URL = $(this).attr('data-href');

                ind++;
            });
        }

        return docsBase64[selector];


    }

    c.cleanAttached = function(selector){
        //selector.html('').append('<div class="loading hidden"><img src="i/loading2.gif"></div>');
        selector.find('.attach-item').detach();
        //docsBase64 = [];
        docsInd[selector] = 0;
        docsBase64[selector] = [];
    }

    c.postMessageMy = function(obj, isWall, isFirstLevel, $filter){

        if ((obj.id && obj.isEdit) || (obj.message && obj.message.isEdit)) {
            // значит редактирование
            var message;
            if (obj.message && obj.message.isEdit) {
                message = obj.message;
                message.content = obj.commentText;
            } else {
                obj.content = obj.commentText;
                message = obj;
            }

            var attachId;
            if (!obj.id || isFirstLevel) {
                attachId = obj.topicId + "-" + obj.messageId;
            } else {
                attachId = obj.id;
            }

            message.images = c.getAttachedImages($('#attach-area-edit-' + attachId));
            message.documents = c.getAttachedDocs($('#attach-doc-area-edit-' + attachId), true);

            if (message.content == "" && message.images.length == 0 && (message.documents === undefined || message.documents.length == 0)) {

                return 0;

            } else {
                try {
                    // try на случай если топик был удален создателем, а юзер пытается
                    // его комментировать

                    message.content = $filter('linky')(message.content, 'blank');
                    message.content = c.withTags(message.content);

                    var newMessage = c.messageClient.postMessage(message);
                } catch (e) {
                    document.location.replace('/');
                }

                c.cleanAttached($('#attach-area-edit-' + attachId));
                c.cleanAttached($('#attach-doc-area-edit-' + attachId));

                obj.isEdit = false;

                return newMessage;
            }

        } else {
            // значит создание
            var message = new com.vmesteonline.be.thrift.messageservice.Message(),
                attachId, isEmptyText = false;

            if (isWall) {
                message.type = com.vmesteonline.be.thrift.messageservice.MessageType.WALL;//5;
                attachId = message.topicId = obj.topic.id;
                message.groupId = obj.groupId;
                message.content = obj.commentText;
                message.parentId = 0;
                isEmptyText = (obj.commentText == c.TEXT_DEFAULT_2 || obj.commentText == "");
            } else {
                message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BASE;//1;
                attachId = message.topicId = obj.topicId;
                message.groupId = obj.selectedGroup.id;

                if (isFirstLevel) {
                    //message.content = obj.answerFirstMessage;
                    message.content = obj.commentText;
                    message.parentId = 0;
                } else {
                    message.content = obj.commentText;
                    message.parentId = obj.parentId;
                    attachId = attachId + "-" + obj.messageId;
                }

                isEmptyText = (message.content == c.TEXT_DEFAULT_2 || message.content == "" || message.content === undefined);
            }

            message.id = 0;
            message.images = c.getAttachedImages($('#attach-area-' + attachId));

            message.documents = c.getAttachedDocs($('#attach-doc-area-' + attachId));
            for (var p in message.documents[0]) {
                alert(p + " " + message.documents[0][p]);
            }
            c.cleanAttached($('#attach-area-' + attachId));
            c.cleanAttached($('#attach-doc-area-' + attachId));
            //message.images = obj.attachedImages;
            message.created = Date.parse(new Date) / 1000;

            if (isEmptyText && message.images.length == 0 && (message.documents === undefined || message.documents.length == 0)) {

                return 0;

            } else {
                if (message.content == c.TEXT_DEFAULT_2 && (message.images.length != 0 || message.documents.length != 0)) {
                    message.content = "";
                }

                message.content = $filter('linky')(message.content, 'blank');
                message.content = c.withTags(message.content);

                try {
                    newMessage = c.messageClient.postMessage(message);
                } catch (e) {
                    document.location.replace('/');
                }

                obj.commentText = c.TEXT_DEFAULT_2;
                message.createdEdit = c.getTiming(newMessage.created);
                console.log(newMessage.created);
                message.authorName = c.getAuthorName();
                message.userInfo = newMessage.userInfo;
                message.images = newMessage.images;
                message.documents = newMessage.documents;
                message.id = newMessage.id;

                return message;
            }
        }
    }

    c.setPollEditNames = function(poll){
        // obj.wallItems[i].topic
        poll.editNames = [];
        var namesLength,
            amount = 0,
            votersNum = 0,
            votersPercent = 0;
        poll.names ?
            namesLength = poll.names.length :
            namesLength = 0;
        //console.log(poll.alreadyPoll);

        // нужно знать полный amount для вычисления процентной длины
        for (var j = 0; j < namesLength; j++) {
            if (poll && poll.values && poll.values[j]) {
                amount += poll.values[j];
            }
        }

        for (var j = 0; j < namesLength; j++) {
            if (poll && poll.values && poll.values[j]) {
                votersNum = poll.values[j];
                votersPercent = votersNum * 100 / amount;
            } else {
                votersNum = votersPercent = 0;
            }

            poll.editNames[j] = {
                id: j,
                value: 0,
                name: poll.names[j],
                votersNum: votersNum,
                votersPercent: votersPercent.toFixed(1) + "%"
            };

        }
        poll.amount = amount;
    }

    c.initFancyBox = function(selector){
        selector.find(".fancybox").fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 600,
            'speedOut': 200,
            'overlayShow': false
        });
    }

    c.clone = function(obj){
        if (obj == null || typeof(obj) != 'object')
            return obj;
        var temp = new obj.constructor();
        for (var key in obj)
            temp[key] = c.clone(obj[key]);
        return temp;
    }

    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                that._renderItemData(ul, item);
            });
        }
    });

    bootbox.setDefaults({locale: "ru"});

    return c;

};