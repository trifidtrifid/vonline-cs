'use strict';

var config = function($stateProvider, $urlRouterProvider,$locationProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/static/partials/main.html",
            controller: 'wallCtrl as lenta'
        })
        .state('wall-single', {
            url: "/wall-single/:topicId",
            templateUrl: "/static/partials/wall-single.html",
            controller: 'wallSingleCtrl as wallSingle'
        })
        .state('talks', {
            url: "/talks",
            templateUrl: "/static/partials/talks.html",
            controller: 'talksCtrl as talks'
        })
        .state('talks-single', {
            url: "/talks-single/:talkId",
            templateUrl: "/static/partials/talks-single.html",
            controller: 'talksSingleCtrl as talks'
        })
        .state('profit', {
            url: "/profit",
            templateUrl: "/static/partials/profit.html",
            controller: 'advertsCtrl as adverts'
        })
        .state('profit-single', {
            url: "/profit-single/:advertId",
            templateUrl: "/static/partials/profit-single.html",
            controller: 'advertsSingleCtrl as adverts'
        })
        .state('dialogs', {
            url: "/dialogs",
            templateUrl: "/static/partials/dialogs.html",
            controller: 'dialogsCtrl as dialogs'
        })
        .state('dialog-single', {
            url: "/dialog-single/:dialogId",
            templateUrl: "/static/partials/dialog-single.html",
            controller: 'dialogCtrl as dialog'
        })
        .state('neighbours', {
            url: "/neighbours",
            templateUrl: "/static/partials/neighbours.html",
            controller: 'neighboursCtrl as neighbours'
        })
        .state('profile', {
            url: "/profile/:userId",
            templateUrl: "/static/partials/profile.html",
            controller: 'profileCtrl as profile'
        })
        .state('profile.change-avatar', {
            url: "/change-avatar",
            templateUrl: "/static/partials/profile.changeAvatar.html",
            controller: 'changeAvatarCtrl as changeAvatar'
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "/static/partials/settings.html",
            controller: 'settingsCtrl as settings'
        })
        .state('maps', {
            url: "/maps",
            templateUrl: "/static/partials/maps.html",
            controller: 'mapsCtrl as maps'
        })
        .state('set-info', {
            url: "/set-info",
            templateUrl: "/static/partials/set-info.html",
            controller: 'setInfoCtrl as setInfo'
        })
        .state('counters', {
            url: "/counters",
            templateUrl: "/static/partials/counters.html",
            controller: 'countersCtrl as counters'
        })
        .state('counters-history', {
            url: "/counters-history/:counterId",
            templateUrl: "/static/partials/counters-history.html",
            controller: 'countersHistoryCtrl as countersHistory'
        })
        .state('important', {
            url: "/important",
            templateUrl: "/static/partials/important.html",
            controller: 'importantCtrl as important'
        })
        .state('nearby', {
            url: "/nearby",
            templateUrl: "/static/partials/nearby.html",
            controller: 'nearbyCtrl as nearby'
        })
        .state('nearby-single', {
            url: "/nearby-single/:nearbyId",
            templateUrl: "/static/partials/nearby-single.html",
            controller: 'nearbySingleCtrl as nearby'
        })
        .state('rubrics', {
            url: "/rubrics/:rubricId",
            templateUrl: "/static/partials/rubrics.html",
            controller: 'rubricsCtrl as talks'
        })
        .state('rubrics-single', {
            url: "/rubric-single/:rubricId",
            templateUrl: "/static/partials/rubrics-single.html",
            controller: 'rubricsSingleCtrl as talks'
        })
        .state('blog', {
            url: "/blog"
        })
        .state('about', {
            url: "/about"
        })
        .state('contacts', {
            url: "/contacts"
        })
        .state('cabinet', {
            url: "/cabinet",
            templateUrl: "/static/partials/business/cabinet.html",
            controller: 'cabinetCtrl as nearby'
        })
        .state('edit', {
            url: "/edit",
            templateUrl: "/static/partials/business/edit.html",
            controller: 'editCtrl as edit'
        })
        .state('statistic', {
            url: "/statistic",
            templateUrl: "/static/partials/business/statistic.html",
            controller: 'statisticCtrl as maps'
        });

    $locationProvider.html5Mode(true);
};

module.exports = [ '$stateProvider','$urlRouterProvider','$locationProvider', config ];

/*main.config(function($locationProvider){
    $locationProvider.html5Mode(true);
});*/
