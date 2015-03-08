
var rubricsCtrl = function($rootScope,$stateParams,$c) {
        /*
        * при работе с обсждениями нужно учесть следующее:
        * есть три типа сообщения :
        * 1) топик. На странице обсуждения может быть только один. Его дети
        * это сообщения первого уровня. Его дети всегда открыты, поэтому у него
        * нет контрола плюс-минус. Страница топика загружается в методе showFullTalk
        * через topicId который передается в функцию при вызове
        * Хранится в объекте talk.fullTalkTopic.
        *
        * 2) Сообщение первого уровня. Берутся через getFirstLevelMessages. Изначально
        * все потомки скрыты и не подгружены. При первом нажатии на контрол плюс-минус
        * подгружаются, потом просто переключается show-hide. ParentId у таких сообщений
        * равен 0. Внимание! : ParentId передается в getFirstLevelMessages через lastLoadedId.        *
        * У каждого сообщения первого уровня есть свой массив сообщений 3го типа.
        * Хранятся в массиве talk.fullTalkFirstMessages.
        *
        * 3) Просто сообщение. Береутся через getMessages(). Через параметр lastLoadedId передается
        * id последнего загруженного простого сообщения, для подгрузки. У каждого простого сообщения
        * есть offset, который задается на БЕ. offset'ы определяют вложенность сообщений и за счет них
        * создается древовидная структура форума.
        * Хранятся в двумерном массиве talk.fullTalkMessages[firstMessage.id][]
        *
        *
        * Есть следующие типы контролов, реализованные для разных типов сообщений:
        * 1) showAnswerInput : реализует клик на "Ответить", показвает поле для отправки
        * сообщения.
        * 2) addMessage: клик на "Отправить", создает и отображает новое сообщение
        * 3) toggleTree: контрол "плюс-минус", скрвает-показвает внутренние сообщения этого
        * сообщения.
        * */
            $rootScope.setTab(2);
            var talk = this;

            talk.attachId = "00";
            $c.initFancyBox($('.talks'));

            $rootScope.base.showAllGroups();
            $rootScope.base.isFooterBottom = false;

            $rootScope.base.createTopicIsHide = true;

            talk.isTalksLoaded = false;
            talk.groups = $c.userClientGroups;

            talk.message = {};
            talk.message.content = talk.message.default = $c.TEXT_DEFAULT_3;
            talk.subject = $c.TEXT_DEFAULT_4;

            $rootScope.base.bufferSelectedGroup = talk.selectedGroup =
            $rootScope.currentGroup = $c.userClientGroups[3];

            $rootScope.base.initStartParamsForCreateTopic(talk);

            talk.isTalk = true;

            talk.fullTalkTopic = {};
            talk.fullTalkTopic.answerInputIsShow = false;
            talk.fullTalkMessages = [];
            talk.fullTalkFirstMessages = [];

            talk.commentText = $c.TEXT_DEFAULT_2;
            var fullTalkFirstMessagesLength,
                talkId;

            /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = $c.messageClient.getImportantNews($rootScope.currentGroup.id);
            $rootScope.importantIsLoadedFromTop = false;*/

            talk.topics = $c.messageClient.getTopics(talk.selectedGroup.id, $stateParams.rubricId, 0, 0, 1000).topics;

            initTalks();

            if (!talk.topics) talk.topics = [];

            $rootScope.selectGroupInDropdown_talks = function(groupId){
                talk.selectedGroup = $rootScope.base.bufferSelectedGroup = $c.selectGroupInDropdown(groupId);
            };

        function initTalks(){
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                talk.topics[i].lastUpdateEdit = $c.getTiming(talk.topics[i].lastUpdate);
                talk.topics[i].label = $c.getLabel(talk.groups,talk.topics[i].groupType);
                talk.topics[i].tagColor = $c.getTagColor(talk.topics[i].label);

                if(talk.topics[i].message.important == 1){
                    talk.topics[i].message.importantText = 'Снять метку "Важное"';
                }else{
                    talk.topics[i].message.importantText = 'Пометить как "Важное"';
                }
            }
        }

        $rootScope.talksChangeGroup = function(groupId){

            talk.topics = $c.messageClient.getTopics(groupId,0,0,0,1000).topics;

            if(talk.topics) {
                initTalks();
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$stateParams','$c', rubricsCtrl ];