'use strict';

var main = angular.module('forum', [
  //'ngRoute',
  'ui.router',
 /* 'forum.filters',*/
  'forum.services',
  'forum.directives',
  'forum.controllers'
]);

main.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "static/partials/main.html",
            controller: 'LentaController as lenta'
        })
        .state('wall-single', {
            url: "/wall-single/:topicId",
            templateUrl: "static/partials/wall-single.html",
            controller: 'WallSingleController as wallSingle'
        })
        .state('talks', {
            url: "/talks",
            templateUrl: "static/partials/talks.html",
            controller: 'TalksController as talks'
        })
        .state('talks-single', {
            url: "/talks-single/:talkId",
            templateUrl: "static/partials/talks-single.html",
            controller: 'TalksSingleController as talks'
        })
        .state('profit', {
            url: "/profit",
            templateUrl: "static/partials/profit.html",
            controller: 'AdvertsController as adverts'
        })
        .state('profit-single', {
            url: "/profit-single/:advertId",
            templateUrl: "static/partials/profit-single.html",
            controller: 'AdvertsSingleController as adverts'
        })
        .state('dialogs', {
            url: "/dialogs",
            templateUrl: "static/partials/dialogs.html",
            controller: 'dialogsController as dialogs'
        })
        .state('dialog-single', {
            url: "/dialog-single/:dialogId",
            templateUrl: "static/partials/dialog-single.html",
            controller: 'dialogController as dialog'
        })
        .state('neighbours', {
            url: "/neighbours",
            templateUrl: "static/partials/neighbours.html",
            controller: 'neighboursController as neighbours'
        })
        .state('profile', {
            url: "/profile/:userId",
            templateUrl: "static/partials/profile.html",
            controller: 'ProfileController as profile'
        })
        .state('profile.change-avatar', {
            url: "/change-avatar",
            templateUrl: "static/partials/profile.changeAvatar.html",
            controller: 'changeAvatarController as changeAvatar'
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "static/partials/settings.html",
            controller: 'SettingsController as settings'
        })
        .state('maps', {
            url: "/maps",
            templateUrl: "static/partials/maps.html",
            controller: 'MapsController as maps'
        })
        .state('set-info', {
            url: "/set-info",
            templateUrl: "static/partials/set-info.html",
            controller: 'SetInfoController as setInfo'
        })
        .state('counters', {
            url: "/counters",
            templateUrl: "static/partials/counters.html",
            controller: 'CountersController as counters'
        })
        .state('counters-history', {
            url: "/counters-history/:counterId",
            templateUrl: "static/partials/counters-history.html",
            controller: 'CountersHistoryController as countersHistory'
        })
        .state('important', {
            url: "/important",
            templateUrl: "static/partials/important.html",
            controller: 'importantController as important'
        });
        /*.state('blog', {
            url: "/blog",
            templateUrl: "partials/blog.html",
            controller: 'BlogController as bl*/
});

main.config(function($locationProvider){
    $locationProvider.html5Mode(true);
});
